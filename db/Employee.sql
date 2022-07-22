DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;
USE employeesDB;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(30) NOT NULL 
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
); 

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NULL, 
    manager_id INT NULL,  
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL, 
    FOREIGN KEY (manager_id) REFERENCES department(id) ON DELETE SET NULL
);

