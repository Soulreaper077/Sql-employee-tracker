const mysql = require("mysql2");
const inquirer = require("inquirer");

let managers = [];
let roles = [];
let employees = [];

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
            defalut:
            console.log("default"); 
        }
    });
}