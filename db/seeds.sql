-- Clear existing data
TRUNCATE employee, role, department RESTART IDENTITY CASCADE;

INSERT INTO department (name) VALUES
    ('Human Resources'),
    ('Engineering'),
    ('Finance'),
    ('Marketing'),
    ('Sales'),
    ('Legal'),
    ('Customer Service');

INSERT INTO role (title, salary, department_id) VALUES
    ('HR Manager', 225000, 1),
    ('Software Engineering Manager', 215000, 2),
    ('Accounting Manager', 150000, 3),
    ('Marketing Manager', 150000, 4),
    ('Sales Manager', 160000, 5),
    ('Legal Manager', 200000, 6),
    ('Customer Service Manager', 145000, 7),
    ('Software Engineer', 95000, 2),
    ('Accountant', 60000, 3),
    ('Marketing Specialist', 50000, 4),
    ('Sales Representative', 45000, 5),
    ('Legal Assistant', 60000, 6),
    ('Customer Service Representative', 45000, 7);

INSERT INTO employee (first_name, last_name, role_id) VALUES
    ('John', 'Butcher', 1); -- HR Manager

DO $$
    DECLARE
        john_id INT;
    BEGIN
        SELECT id INTO john_id FROM employee WHERE first_name = 'John' AND last_name = 'Butcher';

        INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
            ('Jane', 'Fonda', 2, john_id), -- Software Engineering Manager
            ('Mark', 'Brown', 3, john_id), -- Accounting Manager
            ('Emily', 'Davis', 4, john_id), -- Marketing Manager
            ('Chris', 'Wilson', 5, john_id), -- Sales Manager
            ('Jessica', 'Lee', 6, john_id), -- Legal Manager
            ('Ashley', 'Johnson', 7, john_id); -- Customer Service Manager

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        SELECT 'Mike', 'Jones', 8, e.id FROM employee e WHERE e.first_name = 'Jane' AND e.last_name = 'Fonda';

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        SELECT 'Sarah', 'Miller', 8, e.id FROM employee e WHERE e.first_name = 'Jane' AND e.last_name = 'Fonda';

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        SELECT 'Kevin', 'Davis', 9, e.id FROM employee e WHERE e.first_name = 'Mark' AND e.last_name = 'Brown';

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        SELECT 'Rachel', 'Martinez', 9, e.id FROM employee e WHERE e.first_name = 'Mark' AND e.last_name = 'Brown';

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        SELECT 'Eric', 'Brown', 10, e.id FROM employee e WHERE e.first_name = 'Emily' AND e.last_name = 'Davis';

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        SELECT 'Kim', 'Taylor', 10, e.id FROM employee e WHERE e.first_name = 'Emily' AND e.last_name = 'Davis';

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        SELECT 'Tom', 'Anderson', 11, e.id FROM employee e WHERE e.first_name = 'Chris' AND e.last_name = 'Wilson';

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        SELECT 'Olivia', 'Thomas', 11, e.id FROM employee e WHERE e.first_name = 'Chris' AND e.last_name = 'Wilson';

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        SELECT 'Alex', 'Hernandez', 12, e.id FROM employee e WHERE e.first_name = 'Jessica' AND e.last_name = 'Lee';

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        SELECT 'Lauren', 'Young', 12, e.id FROM employee e WHERE e.first_name = 'Jessica' AND e.last_name = 'Lee';

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        SELECT 'Ryan', 'King', 13, e.id FROM employee e WHERE e.first_name = 'Ashley' AND e.last_name = 'Johnson';

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        SELECT 'Megan', 'Scott', 13, e.id FROM employee e WHERE e.first_name = 'Ashley' AND e.last_name = 'Johnson';

        UPDATE department
        SET manager_id = (SELECT id FROM employee WHERE first_name = 'John' AND last_name = 'Butcher')
        WHERE name = 'Human Resources';

        UPDATE department
        SET manager_id = (SELECT id FROM employee WHERE first_name = 'Jane' AND last_name = 'Fonda')
        WHERE name = 'Engineering';

        UPDATE department
        SET manager_id = (SELECT id FROM employee WHERE first_name = 'Mark' AND last_name = 'Brown')
        WHERE name = 'Finance';

        UPDATE department
        SET manager_id = (SELECT id FROM employee WHERE first_name = 'Emily' AND last_name = 'Davis')
        WHERE name = 'Marketing';

        UPDATE department
        SET manager_id = (SELECT id FROM employee WHERE first_name = 'Chris' AND last_name = 'Wilson')
        WHERE name = 'Sales';

        UPDATE department
        SET manager_id = (SELECT id FROM employee WHERE first_name = 'Jessica' AND last_name = 'Lee')
        WHERE name = 'Legal';

        UPDATE department
        SET manager_id = (SELECT id FROM employee WHERE first_name = 'Ashley' AND last_name = 'Johnson')
        WHERE name = 'Customer Service';
    END $$;
