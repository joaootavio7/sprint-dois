CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);


CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();


CREATE TABLE Livro (
    id_livro INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);


CREATE TABLE Emprestimo (
    id_emprestimo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);


INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Moepa', 'Hecor','2000-04-09', 'Rua BJJ, 4587', 'moepahc@gmail.com', '16993475425'),
('Geowaior','Doer','1999-01-07', 'Rua BJJ, 422', 'doe7geowaior@gmail.com', '1699349687'),
('Houpa','Gumuy','1994-11-02', 'Rua Abilton Junior, 374', 'houpa.gumuy35@gmail.com', '16999831724'),
('Houhe','Bedui','1998-02-06', 'Rua Joares Joao, 222', 'houhegm4@gmail.com', '16993945218'),
('Noeco','Bedui','1994-11-02', 'Rua Joares Joao, 223', 'noecobdd75@gmail.com', '16993945218'),
('Bioli','Riulu','1994-11-02', 'Rua Lomba Silva, 366', 'riulu2345@gmail.com', '16993945218'),
('Mise','Riulu','1994-11-02', 'Rua Lomba Silva, 367', 'miseriul44@gmail.com', '16993358643'),
('Hubeno','Pahou','1994-11-02', 'Rua Aval Wiz, 843', 'hubeno.pahou@gmail.com', '16999426468'),
('Xoral','Pahou','1994-11-02', 'Avenida Joao Fiusa, 4976', 'xoral.pahou@gmail.com', '16998473853'),
('Muaso','Isas','1994-11-02', 'Rua Wellington Aparecido, 2467', 'muaso.iss36@gmail.com', '16990537464');

INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('Cem Anos de Solidão', 'Gabriel García Márquez', 'Record', '1967', '978-8501044457', 6, 6, 95.00, 'Disponível'),
('A Metamorfose', 'Franz Kafka', 'Companhia das Letras', '1915', '978-8535914843', 8, 8, 70.00, 'Disponível'),
('Crime e Castigo', 'Fiódor Dostoiévski', 'Penguin Classics', '1866', '978-0143058144', 5, 5, 120.00, 'Disponível'),
('O Nome do Vento', 'Patrick Rothfuss', 'Arqueiro', '2007', '978-8599296493', 9, 9, 160.00, 'Disponível'),
('O Código Da Vinci', 'Dan Brown', 'Arqueiro', '2003', '978-8580412939', 10, 10, 100.00, 'Disponível'),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Rocco', '1997', '978-8532530787', 15, 15, 85.00, 'Disponível'),
('O Morro dos Ventos Uivantes', 'Emily Brontë', 'Penguin Classics', '1847', '978-0141439556', 7, 7, 90.00, 'Disponível'),
('As Crônicas de Nárnia', 'C.S. Lewis', 'HarperCollins', '1950', '978-0066238500', 8, 8, 130.00, 'Disponível'),
('A Menina que Roubava Livros', 'Markus Zusak', 'Intrínseca', '2005', '978-8535909559', 10, 10, 75.00, 'Disponível'),
('It: A Coisa', 'Stephen King', 'Suma de Letras', '1986', '978-8556510786', 6, 6, 150.00, 'Disponível');


INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');

INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES
(3, 1, '2024-09-12', '2024-09-26', 'Em andamento'),
(4, 2, '2024-09-13', '2024-09-27', 'Em andamento'),
(5, 6, '2024-09-14', '2024-09-28', 'Em andamento'),
(6, 8, '2024-09-15', '2024-09-29', 'Em andamento'),
(7, 4, '2024-09-16', '2024-09-30', 'Em andamento'),
(8, 5, '2024-09-17', '2024-10-01', 'Em andamento'),
(9, 1, '2024-09-18', '2024-10-02', 'Em andamento'),
(10, 7, '2024-09-19', '2024-10-03', 'Em andamento'),
(2, 9, '2024-09-20', '2024-10-04', 'Em andamento'),
(1, 8, '2024-09-21', '2024-10-05', 'Em andamento');


SELECT 
    a.ra, 
    a.nome, 
    a.sobrenome, 
    a.celular, 
    l.titulo, 
    l.autor, 
    l.editora, 
    e.data_emprestimo, 
    e.data_devolucao, 
    e.status_emprestimo
FROM 
    Emprestimo e
JOIN 
    Aluno a ON e.id_aluno = a.id_aluno
JOIN 
    Livro l ON e.id_livro = l.id_livro;
