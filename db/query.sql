\c employees_db;

SELECT
    e.id AS employee_id,
    e.first_name AS employee_first_name,
    e.last_name AS employee_last_name,
    r.title AS job_title,
    r.salary AS job_salary,
    d.name AS department_name,
    m.first_name AS manager_first_name,
    m.last_name AS manager_last_name
FROM employee e
         LEFT JOIN role r ON e.role_id = r.id
         LEFT JOIN employee m ON e.manager_id = m.id
         LEFT JOIN department d ON r.department_id = d.id;
