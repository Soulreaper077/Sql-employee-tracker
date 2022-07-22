INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jesse", "Ponce", 1, null), ("Charlie", "Main", 2, 1), ("Kyoin", "Lopez", 3, 2), ("Robert", "Zexx", 4, null), ("Gilbert", "Price", 5, 1), ("Abby", "Jefferson", 6, 2), ("Arthur", "Penn", 7, 1);

INSERT INTO department(role)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role(title, salary, department_id)
VALUES("Lead Engineer", 150000, 1), ("Software Engineer", 150000, 2), ("Sales Lead", 150000, 3), ("Lawyer", 150000, 4);

SELECT * FROM employee;
