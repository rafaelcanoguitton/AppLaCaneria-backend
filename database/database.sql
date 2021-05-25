CREATE DATABASE firstapi;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
)
CREATE TABLE Usuario
(
  id_usuario SERIAL ,
  password VARCHAR(20) NOT NULL,
  Email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  user_name TEXT NOT NULL,
  credit_card VARCHAR(40),
  PRIMARY KEY (id_usuario),
  UNIQUE (Email),
  UNIQUE (phone_number),
  UNIQUE (user_name),
  UNIQUE (credit_card)
);

CREATE TABLE Pedido
(
  id_pedido SERIAL,
  estado VARCHAR(10) NOT NULL,
  medio_de_pago VARCHAR(10) NOT NULL,
  ubicación TEXT NOT NULL,
  fecha_y_hora DATE NOT NULL,
  comentario TEXT,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_pedido),
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Items
(
  nombre VARCHAR(20) NOT NULL,
  precio INT NOT NULL,
  tamaño VARCHAR(10),
  adicional VARCHAR(10),
  opcion VARCHAR(10),
  ingredientes VARCHAR(20),
  id_pedido INT NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido)
);

INSERT INTO Usuario (password,Email,phone_number,user_name,credit_card) VALUES
    ('seccs','rafxar2@gmail.com','951384898','rafxar2','189')