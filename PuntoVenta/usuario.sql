use ventas;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE usuario(
    id int NOT NULL,
    id_usuario varchar(15) NOT NULL,
    rol int NOT NULL,
    passw varchar(255)CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
    ultimoAcceso datetime DEFAULT null,
    tkR varchar (255) NULL
) ENGINE= InnoDB DEFAULT CHARSET=utf8mb3 COLLATE= utf8mb3_spanish_ci;

ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);
  ADD UNIQUE KEY 'idx_Usuario' (id_usuario);

ALTER TABLE `usuario`
  MODIFY 'id' int (11) NOT NULL AUTO_INCREMENT;

