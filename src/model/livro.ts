import { DatabaseModel } from "./DatabaseModel.js";
import type { LivroDTO } from "../interface/LivroDTO.js";

const database = new DatabaseModel().pool;

class Livro {
  private idLivro: number = 0;
  private titulo: string;
  private autor: string;
  private editora: string;
  private anoPublicacao: Date;
  private isbn: number;
  private quantTotal: number;
  private quantDisponivel: number;
  private valorAquisicao: number;
  private statusLivroEmprestado: string;

  constructor(
    _titulo: string,
    _autor: string,
    _editora: string,
    _anoPublicacao: Date,
    _isbn: number,
    _quantTotal: number,
    _quantDisponivel: number,
    _valorAquisicao: number,
    _statusLivroEmprestado: string,
  ) {
    this.titulo = _titulo;
    this.autor = _autor;
    this.editora = _editora;
    this.anoPublicacao = _anoPublicacao;
    this.isbn = _isbn;
    this.quantTotal = _quantTotal;
    this.quantDisponivel = _quantDisponivel;
    this.valorAquisicao = _valorAquisicao;
    this.statusLivroEmprestado = _statusLivroEmprestado;
  }

  public getIdLivro(): number {
    return this.idLivro;
  }

  public setIdLivro(_idLivro: number): void {
    this.idLivro = _idLivro;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public setTitulo(_titulo: string): void {
    this.titulo = _titulo;
  }

  public getAutor(): string {
    return this.autor;
  }

  public setAutor(_autor: string): void {
    this.autor = _autor;
  }

  public getEditora(): string {
    return this.editora;
  }

  public setEditora(_editora: string): void {
    this.editora = _editora;
  }

  public getAnoPublicacao(): Date {
    return this.anoPublicacao;
  }

  public setAnoPublicacao(_anoPublicacao: Date): void {
    this.anoPublicacao = _anoPublicacao;
  }

  public getIsbn(): number {
    return this.isbn;
  }

  public setIsbn(_isbn: number): void {
    this.isbn = _isbn;
  }

  public getQuantidadeTotal(): number {
    return this.quantTotal;
  }

  public setQuantidadeTotal(_quantTotal: number): void {
    this.quantTotal = _quantTotal;
  }

  public getQuantidadeDisponivel(): number {
    return this.quantDisponivel
  }

  public setQuantidadeDisponivel(_quantDisponivel: number): void {
    this.quantDisponivel = _quantDisponivel;
  }

  public getValorAquisicao(): number {
    return this.valorAquisicao;
  }

  public setValorAquisicao(_valorAquisicao: number): void {
    this.valorAquisicao = _valorAquisicao;
  }

  public getStatus(): string {
    return this.statusLivroEmprestado
  }

  public setStatus(_statusLivroEmprestado: string): void {
    this.statusLivroEmprestado = _statusLivroEmprestado;
  }

  static async cadastrarLivro(livro: LivroDTO): Promise<boolean> {
    try {
      const queryInsertLivro = `INSERT INTO livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado)
                                VALUES
                                ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                                RETURNING id_livro;`;

      const respostaBD = await database.query(queryInsertLivro, [
        livro.titulo.toUpperCase(),
        livro.autor.toUpperCase(),
        livro.editora.toUpperCase(),
        livro.anoPublicacao,
        livro.isbn,
        livro.quantTotal,
        livro.quantDisponivel,
        livro.valorAquisicao,
        livro.statusLivroEmprestado
      ]);
      if (respostaBD.rows.length > 0) {
        console.info(`Livro cadastrado com sucesso. ID: ${respostaBD.rows[0].idLivro}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);
      return false;
    }
  }

  static async listarLivro(): Promise<Array<Livro> | null> {
    try {
      let listaDeLivro: Array<Livro> = [];
      const querySelectLivro = `SELECT * FROM livro;`;
      const respostaBD = await database.query(querySelectLivro);

      respostaBD.rows.forEach((livroBD) => {
        const novoLivro: Livro = new Livro(
          livroBD.titulo.toUpperCase(),
          livroBD.autor.toUpperCase(),
          livroBD.editora.toUpperCase(),
          livroBD.anoPublicacao,
          livroBD.isbn,
          livroBD.quantTotal,
          livroBD.quantDisponivel,
          livroBD.valorAquisicao,
          livroBD.statusLivroEmprestado
        );

        novoLivro.setIdLivro(livroBD.idLivro);

        listaDeLivro.push(novoLivro);
      });

      return listaDeLivro;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);


      return null;
    }
  }
}

export default Livro;