import Livro from "../model/livro.js";
import type { Request, Response } from "express";

class LivroController extends Livro {

    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaLivro: Array<Livro> | null = await Livro.listarLivro();
            return res.status(200).json(listaLivro);
        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de livros." });
        }

    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosLivro = req.body;
            const respostaModelo = await Livro.cadastrarLivro(dadosRecebidosLivro);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Livro cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar livro." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível inserir o livro." });
        }
    }
}

export default LivroController;