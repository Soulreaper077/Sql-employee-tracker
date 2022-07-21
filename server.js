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
    db.query(`SELECT E.id AS ID, E.first_name AS First, E.last_name AS Last, E.role_id AS Role, R.salary AS Salary, M.last_name AS Manager, D.role AS Department FROM employee E LEFT JOIN employee M On E.manager_id = M.id LEFT JOIN role R ON E.role_id = R.title LEFT JOIN department D ON R. department_id = D.id`, function(err, results) {
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
                type: "list",
                name: "choice",
                choices: () => {
                    let choiceArr = [];
                    for(i=0; i< results.length; i++){
                        choiceArr.push(results[i].name);
                    }
                    return choiceArr;
                },
                message: "Select department"
            }
        ]).then(function(answers){
            db.query(
                `SELECT E.id AS ID, E.first_name AS First, E.last_name AS Last, E.role_id AS Role, R.salary AS Salary, M.last_name AS Mamager, D.role AS Department FROM emoloyee E LEFT JOIN employee M ON E.manager_id = M.id LEFT JOIN role R ON E. role_id = R.title LEFT JOIN department D ON R.department_id = D.id WHERE D.role =?`, [answer.choice], function(err, results)
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
                type: "list",
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
                `SELECT E.id AS ID, E.first_name AS First, E.last_name AS Last, E.role_id AS Role, R.salary AS Salary, M.last_name AS Mamager, D.role AS Department FROM emoloyee E LEFT JOIN employee M ON E.manager_id = M.id LEFT JOIN role R ON E. role_id = R.title LEFT JOIN department D ON R.department_id = D.id WHERE D.role =?`, [answer.choice], function(err, results)
                {
                    if(err) throw error;
                    console.table(results);
                    Generate()
                }
            )
        });
    })
}