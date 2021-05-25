DROP TABLE usuario,pedido,items;
CREATE TABLE usuario
(
  id_usuario SERIAL ,
  password VARCHAR(100) NOT NULL,
  Email TEXT NOT NULL,
  phone_number TEXT NOT NULL,/*/*
  user_name TEXT NOT NULL,
  activo BOOLEAN DEFAULT FALSE,
  credit_card VARCHAR(40),
  token VARCHAR(40),
  PRIMARY KEY (id_usuario),
  UNIQUE (Email),
  UNIQUE (phone_number),
  UNIQUE (user_name)
);

CREATE TABLE pedido
(
  id_pedido SERIAL,
  estado VARCHAR(10) NOT NULL,
  medio_de_pago VARCHAR(10) NOT NULL,
  ubicación TEXT NOT NULL,
  fecha_y_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  comentario TEXT,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_pedido),
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE items
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