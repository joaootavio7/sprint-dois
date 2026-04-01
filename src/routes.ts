import { Router } from "express";
import type { Request, Response } from "express";
import AlunoController from "./controller/AlunoController.js";
import EmprestimoController from "./controller/EmprestimoController.js";
import LivroController from "./controller/LivroController.js";

const router = Router();

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});

router.get("/api/aluno", AlunoController.todos);
router.post("/api/cadastrar/aluno", AlunoController.novo);

router.get("/api/emprestimo", EmprestimoController.todos);

router.get("/api/livro", LivroController.todos);
router.post("/api/cadastrar/livro", LivroController.novo);
export { router };