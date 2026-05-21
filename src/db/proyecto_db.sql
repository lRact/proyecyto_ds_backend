CREATE DATABASE IF NOT EXISTS BienestarUPIIZ;
USE BienestarUPIIZ;


CREATE TABLE Rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);


INSERT INTO Rol (nombre_rol) VALUES ('Admin'), ('Maestro'), ('Alumno');


CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol) ON DELETE RESTRICT
);


CREATE TABLE Alumno (
    id_usuario INT PRIMARY KEY,
    carrera VARCHAR(100) NOT NULL,
    semestre INT NOT NULL,
    grupo VARCHAR(10) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);


CREATE TABLE Actividad (
    id_actividad INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre_actividad VARCHAR(150) NOT NULL,
    fecha_entrega DATE NOT NULL,
    nivel_estres INT NOT NULL CHECK (nivel_estres BETWEEN 1 AND 10),
    FOREIGN KEY (id_usuario) REFERENCES Alumno(id_usuario) ON DELETE CASCADE