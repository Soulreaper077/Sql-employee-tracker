const db = require('./db/connection')
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consTable = require('console.table'); 
//const Connection = require('mysql2/typings/mysql/lib/Connection');
//const connection = require('mysql2/typings/mysql/lib/Connection');

let managers = [];
let roles = [];
let employees = [];

db.connect(err => {
    if (err) throw err; 
    console.log('Database connected');
    Generate(); 
})

// function for getManager()
const Generate = () => {
    inquirer
    .prompt([
        {
            type: "list",
            name: "start",
            message:"Info on employees and departments here. What would you like to do?",
            choices: ["View", "Add", "Update", "Exit"]
        }
    ]).then (res => {
        switch(res.start){
            case "View":
                view();
                break;
            case "Add":
                add();
                break;
            case "Update":
                updateEmployee();
            break;
            case "Exit":
                console.log("All Done");
                break;
            default:
                console.log("Yo"); 
        }
    }); 

};

const view = () => {
    inquirer
    .prompt([
        {
            type: "list",
            name: "view",
            message:"Select one to view:",
            choices: ["All Employees", "By Department", "By Role"]
        }
    ]).then (res => {
        switch(res.view){
            case "All Employees":
                viewAllEmployees();
                break;
            case "By Department":
                    viewByDepartment();
                    break;
            case "By Role":
                    viewByRole();
                    break; 
            default:
            console.log("default"); 
        }
    });
}

function viewAllEmployees(){
    db.query(`SELECT E.id AS ID, E.first_name AS First, E.last_name AS Last, E.role_id AS Role, R.salary AS Salary, M.last_name AS Manager, D.name AS Department FROM employee E LEFT JOIN employee M On E.manager_id = M.id LEFT JOIN role R ON E.role_id = R.title LEFT JOIN department D ON R. department_id = d.id`, function(err, results) {
        if(err) throw err;
        console.table(results);
        Generate(); 
    }); 
}

const viewByDepartment = () => {
    db.query(`SELECT * FROM department`, function(err, results){
        if(err) throw err;
        inquirer
        .prompt([
            {
                name: "choice",
                type: "rawlist",
                choices: () => {
                    let choiceArr = [];
                    for(i=0; i< results.length; i++){
                        choiceArr.push(results[i].name);
                    }
                    return choiceArr;
                },
                message: "Select department"
            }
        ]).then(function(answer){
            console.log(answer);
            db.query(
                "SELECT e.id AS ID, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, m.last_name AS Mamager, d.name AS Department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id WHERE d.name =?", [answer.choice], function(err, results)
                {
                    if(err) throw error;
                    console.table(results);
                    Generate()
                }
            )
        });
    });
}

const viewByRole = () => {
    db.query(`SELECT title FROM role`, function(err, results) {
        if(err) throw error;
        inquirer
        .prompt([
            {
                name: "choice",
                type: "rawlist",
                choices: () => {
                    let choiceArr = [];
                    for(i=0; i< results.length; i++){
                        choiceArr.push(results[i].title);
                    }
                    return choiceArr;
                },
                message: "Select Role"
            }
        ]).then(function(answer) {
            console.log(answer.choice);
            db.query(
                `SELECT e.id AS ID, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, m.last_name AS Mamager, d.name AS Department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id WHERE e.role_id =?`, [answer.choice], function(err, results)
                {
                    if(err) throw error;
                    console.table(results);
                    Generate()
                }
            )
        });
    })
}

// functionality for add 
function add() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "add",
            message:"Select one to add:",
            choices: ["Employee", "Department", "Role"]
        }
    ]).then (res => {
        switch(res.add){
            case "Employee":
                addEmployee();
                break;
            case "Department":
                    addDepartment();
                    break;
            case "Role":
                    addRole();
                    break; 
            default: 
            console.log("default"); 

        }
    })
}

const addDepartment = () => {
    inquirer
    .prompt([
        {
            name: "department",
            type: "input",
            message: "What is the name of the department?",
        }
    ]).then(function(answer) {
        db.query(
            `INSERT INTO department VALUES (DEFAULT, ?)`,
            [answer.department],
            function(err){
                if(err) throw error;
                console.log("Departments updated with" + answer.department);
                Generate();
            }
        )
    })
}

const addRole = () => {
    inquirer
    .prompt([
        {
            name: "role",
            type: "input",
            messgae: "Enter role title:"
        },
        {
            name: "salary",
            type: "number",
            message: " Enter salary:"
        },
        {
            name: "department_id",
            type: "number",
            message: "Enter department id "
        }
    ]).then((answer) => {
        db.query(
            `INSERT INTO role SET ?`,
            {
                title: answer.role,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function(err) {
                if(err) throw err;
                console.log("Employee roles updated with" + answer.role);
                Generate(); 
            }
        )
    })
}

const addEmployee = () => {
    db.query(`SELECT * FROM role`, function(err, results){
        if(err) throw err;
        inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Enter employee first name"
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter employee last name"
            },
            {
                name: "role",
                type: "list",
                choices: () => {
                    var choiceArr = [];
                    for(i=0; i<results.length; i++) {
                        choiceArr.push(results[i].title)
                    }
                    return choiceArr
                },
                message: "Select title"
            },
            {
                name: "manager",
                type: "number",
                message: "Enter manager ID"
            }
        ]).then(function(answer) {
            db.query(
                `INSERT INTO employee SET ?`,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: 3,
                    manager_id: answer.manager
                }
            )
            console.log("employee added yo!"),
            Generate()
        });
    });
}

// update employee function set 
const updateEmployee = () => {
    db.query(`SELECT * FROM employee`, 
    function(err, results){
        if(err) throw err;
        inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                choices: () => {
                    let choiceArr = [];
                    for(i=0; i< results.length; i++){
                        choiceArr.push(results[i].last_name);
                    }
                    return choiceArr;
                },
                message: "Select Employee to update"
            }
        ]).then(function(answer) {
            const saveName = answer.choice;

            db.query(`SELECT * FROM employee`,
            function(err, results) {
                if(err) throw err;
                inquirer
                .prompt([
                    {
                        name: "role",
                        type: "list",
                        choices: () => {
                            var choiceArr = [];
                            for(i=0; i< results.length; i++) {
                                choiceArr.push(results[i].role_id)
                            }
                            return choiceArr;
                        },
                        message: "Select title"
                    },
                    {
                        type: "manager",
                        name: "number",
                        message: "Enter new manager ID",
                        default: "1"
                        }
                ]).then(function(answer) {
                    console.log(answer);
                    console.log(saveName);
                    db.query(`UPDATE employee SET ? WHERE last_name = ?`, 
                    [
                        {
                            role_id: answer.role,
                            manager_id: answer.manager
                        }, saveName
                    ]),
                    console.log("Employee updated"); 
                    Generate(); 
            })
        })
    })
})
}
