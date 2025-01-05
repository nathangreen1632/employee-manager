import inquirer from 'inquirer';
import figlet from 'figlet';
import 'dotenv/config';
import chalk from 'chalk';
import {pool, connectToDb} from "./connections/connection.js";
import {QueryResult} from "pg";

connectToDb();

console.log(chalk.bold.white(figlet.textSync('EMPLOYEE\n MANAGER', { horizontalLayout: 'full' })));

const menuOptions: string[] = [
  'View All Employees',
  'Add Employee',
  'Remove Employee',
  'Update Employee Role',
  'View All Roles',
  'Add Role',
  'Delete Role',
  'View All Departments',
  'Add Department',
  'Delete Department',
  'Quit'
];

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
        case 'Remove Employee':
          removeEmployee();
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
        case 'Delete Role':
          deleteRole();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Delete Department':
          deleteDepartment();
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

const viewAllEmployees = () => {
  console.log('Viewing all employees');

const query = `SELECT
      e.id AS employee_id,
      e.first_name AS employee_first_name,
      e.last_name AS employee_last_name,
      r.title AS job_title,
      r.salary AS job_salary,
      d.name AS department_name,
      CONCAT(m.first_name, ' ', m.last_name) AS manager_name
  FROM employee e
           LEFT JOIN role r ON e.role_id = r.id
           LEFT JOIN employee m ON e.manager_id = m.id
           LEFT JOIN department d ON r.department_id = d.id`;
pool.query(query).then((res: QueryResult) => {
  console.table(res.rows);
  mainMenu();
}).catch((err: Error) => {
  console.error('', err);
});
}

const addEmployee = async (): Promise<void> => {
  try {
    const [rolesData, managersData] = await Promise.all([
      pool.query('SELECT id, title FROM role'),
      pool.query('SELECT id, first_name, last_name FROM employee'),
    ]);

    const rolesArray = rolesData.rows.map(({ id, title }: any) => ({ name: title, value: id }));
    const managerArray = managersData.rows.map(({ id, first_name, last_name }: any) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    managerArray.push({ name: 'None', value: null });

    const answers = await inquirer.prompt([
      { type: 'input', name: 'firstName', message: 'Enter employee first name' },
      { type: 'input', name: 'lastName', message: 'Enter employee last name' },
      { type: 'list', name: 'roleId', message: 'Select employee role', choices: rolesArray },
      { type: 'list', name: 'managerId', message: 'Select manager (if any)', choices: managerArray },
    ]);

    const { firstName, lastName, roleId, managerId } = answers;
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [
      firstName,
      lastName,
      roleId,
      managerId,
    ]);

    console.log('Employee added successfully.');
  } catch (err: any) {
    console.error('Error adding employee:', err.message);
  } finally {
    mainMenu();
  }
};

const removeEmployee = async () => {
  console.log('Removing employee');
  let employeeData: QueryResult<any> = await pool.query('SELECT * FROM employee');
  let employeeArray: any[] = employeeData.rows.map(({id, first_name, last_name}: any) => ({name: `${first_name} ${last_name}`, value: id}));
  inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select employee to remove',
      choices: employeeArray
    }
  ]).then((answers) => {
    const {employeeId} = answers;
    const query = 'DELETE FROM employee WHERE id = $1';
    pool.query(query, [employeeId]).then(() => {
      console.log('Employee removed successfully');
      mainMenu();
    }).catch((err: Error) => {
      console.error(err);
    });
  });
}

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

const viewAllRoles = () => {
  console.log('Viewing all roles with manager names');

  const query = `
      SELECT
          r.id AS role_id,
          r.title AS role_title,
          r.salary AS salary,
          d.name AS department_name,
          CONCAT(m.first_name, ' ', m.last_name) AS manager_name
      FROM role r
               LEFT JOIN department d ON r.department_id = d.id
               LEFT JOIN employee m ON m.role_id = (
          SELECT id FROM role WHERE department_id = d.id LIMIT 1
      )
      ORDER BY r.id;
  `;

  pool.query(query)
    .then((res: QueryResult) => {
      console.table(res.rows);
      mainMenu();
    })
    .catch((err: Error) => {
      console.error('Error viewing roles:', err);
    });
};


const addRole = async () => {
  const departments = await pool.query('SELECT * FROM department');
  const departmentChoices = departments.rows.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { title, salary, departmentId } = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Enter the role title:' },
    { type: 'input', name: 'salary', message: 'Enter the salary:' },
    { type: 'list', name: 'departmentId', message: 'Select a department:', choices: departmentChoices },
  ]);

  try {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
    await pool.query(query, [title, salary, departmentId]);
    console.log('Role added successfully.');
    mainMenu();
  } catch (err) {
    console.error('Error adding role:', err);
  }
};

const deleteRole = async () => {
  const roles = await pool.query('SELECT * FROM role');
  const roleChoices = roles.rows.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await inquirer.prompt([
    { type: 'list', name: 'roleId', message: 'Select a role to delete:', choices: roleChoices },
  ]);

  try {
    const query = 'DELETE FROM role WHERE id = $1';
    await pool.query(query, [roleId]);
    console.log('Role deleted successfully.');
    mainMenu();
  } catch (err) {
    console.error('Error deleting role:', err);
  }
}

const viewAllDepartments = () => {
  console.log('Viewing all departments with manager names');

  const query = `
    SELECT 
      d.id AS department_id,
      d.name AS department_name,
      COALESCE(CONCAT(m.first_name, ' ', m.last_name), 'No Manager') AS manager_name
    FROM department d
    LEFT JOIN role r ON d.id = r.department_id
    LEFT JOIN employee m ON m.role_id = r.id
    WHERE r.title ILIKE '%Manager%' -- Ensure we only get managers
    ORDER BY d.id;
  `;

  pool.query(query)
    .then((res: QueryResult) => {
      console.table(res.rows);
      mainMenu();
    })
    .catch((err: Error) => {
      console.error('Error viewing departments:', err);
    });
};


const addDepartment = async () => {
  const { departmentName } = await inquirer.prompt({
    type: 'input',
    name: 'departmentName',
    message: 'Enter the new department name:',
  });

  try {
    const query = 'INSERT INTO department (name) VALUES ($1)';
    await pool.query(query, [departmentName]);
    console.log('Department added successfully.');
    mainMenu();
  } catch (err) {
    console.error('Error adding department:', err);
  }
};

const deleteDepartment = async () => {
  const departments = await pool.query('SELECT * FROM department');
  const departmentChoices = departments.rows.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { departmentId } = await inquirer.prompt([
    { type: 'list', name: 'departmentId', message: 'Select a department to delete:', choices: departmentChoices },
  ]);

  try {
    const query = 'DELETE FROM department WHERE id = $1';
    await pool.query(query, [departmentId]);
    console.log('Department deleted successfully.');
    mainMenu();
  } catch (err) {
    console.error('Error deleting department:', err);
  }
}

mainMenu();
