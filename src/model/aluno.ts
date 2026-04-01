import { DatabaseModel } from "./DatabaseModel.js";
import type { AlunoDTO } from "../interface/AlunoDTO.js";

const database = new DatabaseModel().pool;

class Aluno {
  private idAluno: number = 0;
  private ra: number;
  private nome: string;
  private sobrenome: string;
  private dataNascimento: Date;
  private endereco: string;
  private email: string;
  private celular: number;

  constructor(
    _ra: number,
    _nome: string,
    _sobrenome: string,
    _dataNascimento: Date,
    _endereco: string,
    _email: string,
    _celular: number
  ) {
    this.ra = _ra;
    this.nome = _nome;
    this.sobrenome = _sobrenome;
    this.dataNascimento = _dataNascimento;
    this.endereco = _endereco;
    this.email = _email;
    this.celular = _celular;
  }

  public getIdAluno(): number {
    return this.idAluno;
  }

  public setIdAluno(_idAluno: number): void {
    this.idAluno = _idAluno;
  }

  public getRa(): number {
    return this.ra;
  }

  public setRa(_ra: number): void {
    this.ra = _ra;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(_nome: string): void {
    this.nome = _nome;
  }

  public getSobrenome(): string {
    return this.sobrenome;
  }

  public setSobrenome(_sobrenome: string): void {
    this.sobrenome = _sobrenome;
  }

  public getDataNascimento(): Date {
    return this.dataNascimento;
  }

  public setDataNascimento(_dataNascimento: Date): void {
    this.dataNascimento = _dataNascimento;
  }

  public getEndereco(): string {
    return this.endereco;
  }

  public setEndereco(_endereco: string): void {
    this.endereco = _endereco;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(_email: string): void {
    this.email = _email;
  }

  public getCelular(): number {
    return this.celular
  }

  public setCelular(_celular: number): void {
    this.celular = _celular;
  }

  static async cadastrarAluno(aluno: AlunoDTO): Promise<boolean> {
    try {
      const queryInsertAluno = `INSERT INTO aluno (ra, nome, sobrenome, data_nascimento, endereco, email, celular)
                                VALUES
                                ($1, $2, $3, $4, $5, $6, $7)
                                RETURNING id_aluno;`;

      const respostaBD = await database.query(queryInsertAluno, [
        aluno.ra,
        aluno.nome.toUpperCase(),
        aluno.sobrenome.toUpperCase(),
        aluno.dataNascimento,
        aluno.endereco,
        aluno.email,
        aluno.celular
      ]);
      if (respostaBD.rows.length > 0) {
        console.info(`Aluno cadastrado com sucesso. ID: ${respostaBD.rows[0].idAluno}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);
      return false;
    }
  }

  static async listarAluno(): Promise<Array<Aluno> | null> {
    try {
      let listaDeAluno: Array<Aluno> = [];
      const querySelectAluno = `SELECT * FROM aluno;`;
      const respostaBD = await database.query(querySelectAluno);

      respostaBD.rows.forEach((alunoBD) => {
        const novoAluno: Aluno = new Aluno(
          alunoBD.ra,
          alunoBD.nome.toUpperCase(),
          alunoBD.sobrenome.toUpperCase(),
          alunoBD.dataNascimento,
          alunoBD.endereco.toUpperCase(),
          alunoBD.email.toUpperCase(),
          alunoBD.celular,
        );

        novoAluno.setIdAluno(alunoBD.idAluno);

        listaDeAluno.push(novoAluno);
      });

      return listaDeAluno;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);


      return null;
    }
  }
}

export default Aluno;