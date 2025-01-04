import inquirer from 'inquirer';
import figlet from 'figlet';
import 'dotenv/config';
import chalk from 'chalk';
import {pool, connectToDb} from "./connections/connection.js";
import {QueryResult} from "pg";

connectToDb();

console.log(chalk.white(figlet.textSync('EMPLOYEE MANAGER', { horizontalLayout: 'full' })));

// Menu options
const menuOptions : string[] = [
  'View All Employees',
  'Add Employee',
  'Update Employee Role',
  'View All Roles',
  'Add Role',
  'Update Employee Role',
  'View All Departments',
  'Add Department',
  'Quit'
];

// Prompt user for choice
const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: menuOptions
      }
    ])
    .then(answer => {
      console.log(`You selected: ${answer.action}`);
      switch (answer.action) {
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Quit':
          console.log('Goodbye!');
          process.exit(0);
          break;
        default:
          console.log('Invalid selection');
          break;
      }
    })
    .catch(error => console.error(error));
};

// View all employees
const viewAllEmployees = () => {
  console.log('Viewing all employees');


  // Query the employee database
const query = 'SELECT * FROM employee';
pool.query(query).then((res: QueryResult) => {
  console.table(res.rows);
  mainMenu();
}).catch((err: Error) => {
  console.error('', err);
});
}

// Add employee
const addEmployee = async () => {
  console.log('Adding employee');
  let rolesData: QueryResult<any> = await pool.query('SELECT * FROM role');
  let rolesArray: any[] = rolesData.rows.map(({id, title}: any) => ({name: title, value: id}));
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter employee first name'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter employee last name'
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select employee role',
      choices: rolesArray
    }
  ]).then((answers) => {
    const {firstName, lastName, roleId} = answers;
    const query = 'INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)';
    pool.query(query, [firstName, lastName, roleId]).then(() => {
      console.log('Employee added successfully');
      mainMenu();
    }).catch((err: Error) => {
      console.error(err);
    });
  });
};

// Update employee role
const updateEmployeeRole = async () => {
  console.log('Updating employee role');
let employeeData: QueryResult<any> = await pool.query('SELECT * FROM employee');
let employeeArray: any[] = employeeData.rows.map(({id, first_name, last_name}: any) => ({name: `${first_name} ${last_name}`, value: id}));
inquirer.prompt([
  {
    type: 'list',
    name: 'employeeId',
    message: 'Select employee to update',
    choices: employeeArray
  }
]).then(async (answers) => {
  let rolesData: QueryResult<any> = await pool.query('SELECT * FROM role');
  let rolesArray: any[] = rolesData.rows.map(({id, title}: any) => ({name: title, value: id}));
  inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'Select new role',
      choices: rolesArray
    }
  ]).then((roleAnswer) => {
    const {employeeId} = answers;
    const {roleId} = roleAnswer;
    const query = 'UPDATE employee SET role_id = $1 WHERE id = $2';
    pool.query(query, [roleId, employeeId]).then(() => {
      console.log('Employee role updated successfully');
      mainMenu();
    }).catch((err: Error) => {
      console.error(err);
    });
  });
});
};

// View all roles
const viewAllRoles = () => {
  console.log('Viewing all roles');

  const query = 'SELECT * FROM role';
  pool.query(query).then((res: QueryResult) => {
    console.table(res.rows);
    mainMenu();
  }).catch((err: Error) => {
    console.error(err);
  });
};

// Add role
const addRole = () => {
  console.log('Adding role');
};

// View all departments
const viewAllDepartments = () => {
  console.log('Viewing all departments');

  const query = 'SELECT * FROM department';

  pool.query(query).then((res: QueryResult) => {
    console.table(res.rows);
    mainMenu();
  }).catch((err: Error) => {
    console.error(err);
  });
}

// Add department
const addDepartment = () => {
  console.log('Adding department');

};

// Run main menu
mainMenu();
