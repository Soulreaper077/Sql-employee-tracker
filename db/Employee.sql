DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employee; 
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS managers; 

CREATE TABLE department (
    department_id INTEGER AUTO_INCREMENT,
    role VARCHAR(30),
    PRIMARY KEY (department_id)
);

INSERT INTO department(role)
VALUES ("sales"), ("Engineering"), ("Finance"), ("Legal");

CREATE TABLE role (
    role_id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    PRIMARY KEY (role_id)
); 

INSERT INTO role(title, salary, department_id)
VALUES("Lead Engineer", 150000, 2), ("Software Engineer", 150000, 2), ("Sales Lead", 150000, 2), ("Lawyer", 150000, 2);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NULL, 
    manager_id INT NULL,  
    PRIMARY KEY (id)
);

CREATE TABLE managers(
    manager_id INT AUTO_INCREMENT,
    manager VARCHAR(30),  
    PRIMARY KEY (manager_id)
);