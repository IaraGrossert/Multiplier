CREATE DATABASE multiplierdb;
USE multiplierdb;

CREATE TABLE Categorias(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,										#Chave primária da tabela
    codigo VARCHAR(50) UNIQUE NOT NULL,											#Código da Categoria (slug)
    titulo VARCHAR(100) NOT NULL,												#Título da Categoria
    status INTEGER NOT NULL														#0 - Inativo, 1 - Ativo
);
  
INSERT INTO Categorias (codigo, titulo, status) VALUES ('camisas', 'Camisas', 1);
INSERT INTO Categorias (codigo, titulo, status) VALUES ('calcas', 'Calcas', 1);
INSERT INTO Categorias (codigo, titulo, status) VALUES ('sapatos', 'Sapatos', 1);

# [GET] 	 /categorias 		- Lista todas as Categorias
SELECT * FROM Categorias;

#[GET] 	 /categorias/:id 	- Busca uma Categoria por id
SELECT * FROM Categorias WHERE id = 2;

#[POST] 	 /categorias 		- Cria uma Categoria
INSERT INTO Categorias VALUES (0, 'categoria-camisas', 'Camisas', 1);

#[PATCH]  /categorias/:id 	- Edita uma Categoria
UPDATE Categorias SET codigo = "A12B3C" WHERE id = 1;

#[DELETE] /categorias/:id	- Deleta uma Categoria (deve atualizar o produto setando idCategoria como NULL para produtos que utilizam essa categoria)
DELETE FROM Categorias WHERE id = 1;

#----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE Produtos(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,										#Chave primária da tabela
    idCategoria INTEGER,														#id da Categoria (fk)
    codigo VARCHAR(100) UNIQUE NOT NULL,										#SKU do Produto
    nome VARCHAR(100) NOT NULL,													#Nome do Produto	
    descricao TEXT NOT NULL,													#Descrição do Produto
    valor DECIMAL(6,2),															#Valor do Produto
    status INTEGER,																#0 - Inativo, 1 - Ativo
    FOREIGN KEY (idCategoria) REFERENCES Categorias(id)	ON DELETE SET NULL		#Referencia tabela categoria
);

DELIMITER $$
CREATE TRIGGER after_product_insert												#Adiciona um estoque após a criação de um novo produto
AFTER INSERT
ON produtos FOR EACH ROW
BEGIN
        INSERT INTO estoque(idProduto, quantidade, reserva, status)
        VALUES(new.id, 0, 0, 0);
END$$
DELIMITER ;

INSERT INTO Produtos (idCategoria, codigo, nome, descricao, valor, status) VALUES (1, 'CAM-MED-BRA-ALG', 'Camisa M', 'Camisa branca manga curta tamanho M algodao', 29.99, 0);
INSERT INTO Produtos (idCategoria, codigo, nome, descricao, valor, status) VALUES (1, 'CAM-GRA-PRE-ALG', 'Camisa G', 'Camisa preta manga curta tamanho G algodao', 29.99, 1);
INSERT INTO Produtos (idCategoria, codigo, nome, descricao, valor, status) VALUES (1, 'CAM-PEQ-AZU-ALG', 'Camisa P', 'Camisa azul manga curta tamanho P algodao', 29.99, 0);

INSERT INTO Produtos (idCategoria, codigo, nome, descricao, valor, status)  VALUES (2, 'LEG-PRE-PEQ', 'Calca Legging', 'Calca legging preta tamanho P', 59.99, 1);
INSERT INTO Produtos (idCategoria, codigo, nome, descricao, valor, status) VALUES (2, 'CAL-AZU-38', 'Calca Jeans', 'Calca jeans azul tamanho 38', 89.99, 0);
INSERT INTO Produtos (idCategoria, codigo, nome, descricao, valor, status) VALUES (2,'CAL-PRE-38', 'Calca Jeans', 'Calca jeans preta tamanho 38', 89.99, 1);

INSERT INTO Produtos (idCategoria, codigo, nome, descricao, valor, status)  VALUES (3, 'TEN-40-PRE', 'Tenis Nike', 'Tenis preto Nike tamanho 40', 299.99, 1);
INSERT INTO Produtos (idCategoria, codigo, nome, descricao, valor, status) VALUES (3, 'TEN-37-PRE', 'Tenis Adidas', 'Tenis preto Adidas tamanho 37', 179.99, 1);
INSERT INTO Produtos (idCategoria, codigo, nome, descricao, valor, status) VALUES (3, 'TEN-35-PRE', 'Tenis Olympikus', 'Tenis preto Olympikus tamanho 35', 159.99, 1);

#[GET] 	 /produtos 		- Lista todos os Produtos
SELECT * FROM produtos;

#[GET] 	 /produtos/:id 		- Busca um Produto por id
SELECT * FROM Produtos WHERE id = 1;

#[POST] 	 /produtos 		- Cria um Produto
INSERT INTO Produtos VALUES (4, 1, 'CAL-AZU-38', 'Calca Jeans', 'Calca jeans azul tamanho 38', 89.99, 0);

#[PATCH]  /produtos/:id 		- Edita um Produto
UPDATE Produtos SET codigo = "A12B3C" WHERE id = 1;

#[DELETE] /produtos/:id		- Deleta um Produto (e seu estoque)
DELETE FROM produtos WHERE id = 9;

/*
	* Quando um produto é criado, deve ser criado um estoque com quantidade 0 para o Produto
	* Só pode haver 1 estoque para um mesmo Produto
*/
#----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE Estoque(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,										#Chave primária da tabela
	idProduto INTEGER NOT NULL,													#id do Produto (fk)
    quantidade INTEGER NOT NULL,												#Quantidade em estoque
    reserva INTEGER NOT NULL,													#Quantidade reservada
    status INTEGER NOT NULL,													#0 - Inativo, 1 - Ativo
    FOREIGN KEY (idProduto) REFERENCES Produtos(id)	ON DELETE CASCADE			#Referencia tabela Produtos
);

/*
	*Inserções manuais de estoque
	
    *INSERT INTO Estoque (idProduto, quantidade, reserva, status) VALUES (1, 50, 2, 1);
	*INSERT INTO Estoque (idProduto, quantidade, reserva, status) VALUES (4, 100, 3, 1);
	*INSERT INTO Estoque (idProduto, quantidade, reserva, status) VALUES (7, 10, 1, 1);
*/

/*
	* Quando um produto é criado, deve ser criado um estoque com quantidade 0 para o Produto
	* Só pode haver 1 estoque para um mesmo Produto
*/

#[GET] 	 /produtos/:id/estoque 	- Lista o estoque para o Produto pelo id
SELECT * FROM estoque;

#[PATCH]  /produtos/:id/estoque 	- Edita o Estoque para o Produto pelo id
#[DELETE] /produtos/:id/estoque	- Deve retornar o status [501] - Not Implemented. (não se pode deletar um estoque)