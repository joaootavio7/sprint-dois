export interface EmprestimoDTO {
    id_emprestimo?: number,
    idAluno: number,
    idLivro: number,
    dataEmprestimo: Date,
    dataDevolucao: Date,
    statusEmprestimo: string,
    endereco: string,
    celular: number,
    situacao?: boolean
}