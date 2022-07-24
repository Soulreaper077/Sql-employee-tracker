INSERT INTO department(name)
VALUES ("HR"), ("Tech"), ("Finance"), ("Management");

INSERT INTO role(title, salary, department_id)
VALUES("Lead Engineer", 150000, 1), ("Software Engineer", 120000, 2), ("Sales Lead", 50000, 3), ("Lawyer", 150000, 4), ("Web Dev", 90000, 5), ("Director", 120000, 6),("Support", 50000, 7);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jesse", "Ponce", "Lead Engineer", null), ("Charlie", "Main", "Software Engineer", 1), ("Kyoin", "Lopez", "Sales Lead", 2), ("Robert", "Zexx", "Lawyer", null), ("Gilbert", "Price", "Web Dev", 1), ("Abby", "Jefferson", "Director", 2), ("Arthur", "Penn", "Support", 3);


SELECT * FROM employee;
