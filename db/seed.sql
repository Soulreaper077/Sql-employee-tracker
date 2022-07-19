INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jesse", "Ponce", 1, null), ("Charlie", "Main", 2, 1), ("Kyoin", "Lopez", 3, 2), ("Robert", "Zexx", 4, null), ("Gilbert", "Price", 5, 1), ("Abby", "Jefferson", 6, 2), ("Arthur", "Penn", 7, 1);

INSERT INTO managers(manager)
VALUES("Jesse", "Ponce"), ("Charlie", "Main"), ("Abby", "Jefferson");

SELECT * FROM employee;
SELECT * FROM managers; 