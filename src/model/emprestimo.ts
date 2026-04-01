import { DatabaseModel } from "./DatabaseModel.js";
import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";

const database = new DatabaseModel().pool;

class Emprestimo {
    private idEmprestimo: number = 0;
    private idAluno: number;
    private idLivro: number;
    private dataEmprestimo: Date;
    private dataDevolucao: Date;
    private statusEmprestimo: string;

    constructor(
        _idAluno: number,
        _idLivro: number,
        _dataEmprestimo: Date,
        _dataDevolucao: Date,
        _statusEmprestimo: string
    ) {
        this.idAluno = _idAluno;
        this.idLivro = _idLivro;
        this.dataEmprestimo = _dataEmprestimo;
        this.dataDevolucao = _dataDevolucao;
        this.statusEmprestimo = _statusEmprestimo;
    }

    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    public setIdEmprestimo(_idEmprestimo: number): void {
        this.idEmprestimo = _idEmprestimo;
    }

    public getIdAluno(): number {
        return this.idAluno;
    }

    public setIdAluno(_idAluno: number): void {
        this.idAluno = _idAluno;
    }

    public getIdLivro(): number {
        return this.idLivro;
    }

    public setIdLivro(_idLivro: number): void {
        this.idLivro = _idLivro;
    }

    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    public setDataEmprestimo(_dataEmprestimo: Date): void {
        this.dataEmprestimo = _dataEmprestimo;
    }

    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    public setDataDevolucao(_dataDevolucao: Date): void {
        this.dataDevolucao = _dataDevolucao;
    }

    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }

    public setStatusEmprestimo(_statusEmprestimo: string): void {
        this.statusEmprestimo = _statusEmprestimo;
    }

    static async listarEmprestimo(): Promise<Array<Emprestimo> | null> {
        try {
            let listaDeEmprestimo: Array<Emprestimo> = [];
            const querySelectEmprestimo = `SELECT * FROM emprestimo;`;
            const respostaBD = await database.query(querySelectEmprestimo);

            respostaBD.rows.forEach((emprestimoBD) => {
                const novoEmprestimo: Emprestimo = new Emprestimo(
                    emprestimoBD.idAluno,
                    emprestimoBD.idLivro,
                    emprestimoBD.dataEmprestimo,
                    emprestimoBD.dataDevolucao,
                    emprestimoBD.statusEmprestimo
                );

                novoEmprestimo.setIdLivro(emprestimoBD.idEmprestimo);

                listaDeEmprestimo.push(novoEmprestimo);
            });

            return listaDeEmprestimo;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);


            return null;
        }
    }
}

export default Emprestimo;