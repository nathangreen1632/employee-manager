import {pool} from "../connections/connection";
import {QueryResult} from "pg";

const query = `SELECT employee.first_name,
                        employee.last_name,
                        role.title,
                        role.salary,
                        department.name,
                        CONCAT(manager.first_name,' ', manager.last_name) AS manager
                 FROM employee
                          LEFT JOIN role ON employee.role_id = role.id
                          LEFT JOIN employee manager ON employee.manager_id = manager.id
                          LEFT JOIN department ON role.department_id = department.id`;

pool.query(query).then((res: QueryResult) => {
  console.table(res.rows);
}).catch((err: Error) => {
  console.error(err);
});