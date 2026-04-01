import type { AlunoDTO } from "../interface/AlunoDTO.js";
import Aluno from "../model/aluno.js";
import type { Request, Response } from "express";

class AlunoController extends Aluno {
    static async todos(req: Request, res: Response): Promise<Response> {
        try {

            const listaAluno: Array<Aluno> | null = await Aluno.listarAluno();


            return res.status(200).json(listaAluno);
        } catch (error) {

            console.error(`Erro ao consultar modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de alunos." });
        }
    }
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosAluno = req.body;
            const respostaModelo = await Aluno.cadastrarAluno(dadosRecebidosAluno);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Aluno cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar aluno." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível inserir o aluno" });
        }
    }
}

export default AlunoController;