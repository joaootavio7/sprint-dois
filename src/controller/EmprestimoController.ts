import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import Emprestimo from "../model/emprestimo.js";
import type { Request, Response } from "express";

class EmprestimoController extends Emprestimo {
    static async todos(req: Request, res: Response): Promise<Response> {
        try {

            const listaEmprestimo: Array<Emprestimo> | null = await Emprestimo.listarEmprestimo();


            return res.status(200).json(listaEmprestimo);
        } catch (error) {

            console.error(`Erro ao consultar modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de empréstimos." });
        }
    }

}
export default EmprestimoController;