-- Criação do Banco de Dados
CREATE DATABASE brain_ag_test;

-- Conectar ao banco de dados criado
-- \c brain_ag_test;

-- Criação da Tabela Produtores
CREATE TABLE produtores (
    id SERIAL PRIMARY KEY,
    identificacao_fiscal VARCHAR(14) UNIQUE NOT NULL,
    tipo_identificacao VARCHAR(4) CHECK (tipo_identificacao IN ('CPF', 'CNPJ')),
    nome VARCHAR(255) NOT NULL
);

-- Criação da Tabela Fazendas
CREATE TABLE fazendas (
    id SERIAL PRIMARY KEY,
    produtor_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    area_total_hectares DECIMAL NOT NULL,
    area_agricultavel_hectares DECIMAL NOT NULL,
    area_vegetacao_hectares DECIMAL NOT NULL,
    FOREIGN KEY (produtor_id) REFERENCES produtores(id)
);

-- Criação da Tabela Culturas
CREATE TABLE culturas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) UNIQUE NOT NULL
);

-- Criação da Tabela Associativa FazendaCulturas
CREATE TABLE fazenda_culturas (
    fazenda_id INT NOT NULL,
    cultura_id INT NOT NULL,
    PRIMARY KEY (fazenda_id, cultura_id),
    FOREIGN KEY (fazenda_id) REFERENCES fazendas(id),
    FOREIGN KEY (cultura_id) REFERENCES culturas(id)
);
