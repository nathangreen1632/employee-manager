# Employee Manager
  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description
This project is a Command-Line Interface (CLI) application designed to streamline the management of employees, departments, roles, and salaries within a business organization. The program is backed by a PostgreSQL database and serves as a practical demonstration of SQL queries, CRUD (Create, Read, Update, Delete) operations, and relational database design.

The application's database, employees_db, is structured to include three primary tables: department, role, and employee. These tables form a relational schema, ensuring data integrity and seamless interactions between entities such as employees and their respective roles, managers, and departments. By leveraging PostgreSQL's robust query capabilities, the application provides a reliable solution for organizing and maintaining organizational data.

The CLI interface, powered by Node.js and the Inquirer library, offers an intuitive and interactive experience for users. It allows users to execute a variety of tasks, such as viewing all employees, roles, and departments; adding new employees, roles, or departments; and updating employee roles. Each operation is designed to dynamically interact with the database, ensuring real-time data updates and retrieval.

By integrating SQL queries into a Node.js-powered CLI program, this project not only simplifies the task of managing organizational data but also highlights key programming concepts, including:

SQL Querying: Utilization of raw SQL commands for CRUD operations within a relational database.
Database Design: Implementation of an Entity-Relationship Diagram (ERD) for structuring and linking the department, role, and employee tables.
Backend Programming: Building database connections and queries using the pg library in Node.js.
User Interaction: Implementing a user-friendly CLI interface through Inquirer to gather input and execute database queries dynamically.
This project is ideal for demonstrating how to build practical applications that combine database operations with a streamlined user interface, showcasing the power and versatility of modern development tools and practices.
  

## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [License](#license)
  - [Questions](#questions)
  - [Video Tutorial](#video-tutorial)


## Installation

To get started with this project, follow the steps below to install and run the application on your local machine. The application is built using **Node.js**, so ensure that you have it installed before proceeding.

### Prerequisites

- **Node.js**: Install the latest version of Node.js from [Node.js Official Website](https://nodejs.org/).
- **PostgreSQL**: Ensure you have PostgreSQL installed and running on your system. You will need to configure the database connection settings to match your local environment.
- **npm**: Comes bundled with Node.js. Verify installation with `npm -v`.

### Steps

1. **Clone the Repository**

   Begin by cloning the project repository from GitHub to your local machine. Use the following command in your terminal or command prompt:

   ```bash
   git clone https://github.com/nathangreen1632/employee-manager
    ```

2. **Navigate to Project Directory**

   Change into the project directory by running the following command:

   ```bash
   cd employee-manager
   ```
   
3. **Install Dependencies**

   Change into the project directory and install the required npm packages using the following command:

   ```bash
   npm install
   ```
4. **Set Up Database**

   Before running the application, ensure that you have a PostgreSQL database set up on your local machine. You can create a new database named `employees_db` using the following command:

   ```bash
   createdb employees_db
   ```

   Once the database is created, you can populate it with sample data by running the SQL script provided in the `db` directory. Use the following command to execute the script:

   ```bash
   psql employees_db < db/schema.sql
   ```

   This script will create the necessary tables (department, role, employee) and populate them with sample data to get you started.


5. **Build the Application**

   Once the dependencies are installed, build the application using the following command:

   ```bash
   npm run build
   ```
6. **Start the Application**

   After building the application, start the CLI program by running the following command:

   ```bash
   npm run start
   ```

   The application will launch in the terminal, presenting you with a series of prompts to interact with the database. Use the arrow keys to navigate the options and follow the on-screen instructions to manage employees, roles, and departments effectively.


7. **Interact with the CLI**

   Upon starting the application, you can perform various operations, such as viewing all employees, roles, and departments; adding new employees, roles, or departments; and updating employee roles. Follow the prompts and input the required information to execute the desired actions.

  ## Usage
If you’re in need of a robust Content Management System (CMS) to efficiently manage your employees, then this application is the perfect solution!

Designed with scalability and usability in mind, this CLI-based CMS simplifies the management of your workforce by providing a structured way to track employees, their roles, departments, and salaries. Whether you're a small business owner or managing a growing organization, this tool enables you to:

Centralize Employee Data: Store and manage employee information in a single, secure PostgreSQL database.
Streamline Operations: Quickly add, update, and retrieve data about employees, roles, and departments, all from an interactive command-line interface.
Improve Organization: Understand the structure of your organization by tracking roles, salaries, and hierarchical relationships, including employee-manager reporting.
This application is built to provide all the key functionalities you need for effective workforce management while demonstrating the use of modern development practices, including SQL database integration, CRUD operations, and an intuitive CLI interface.

Whether you're planning for growth, organizing team structures, or simply keeping your employee records up to date, this application offers a simple yet powerful solution.


  ## Contributing
As always, contributions are welcome and encouraged! This project thrives on collaboration and the diverse perspectives of the development community. If you have ideas to enhance functionality, improve performance, or fix bugs, feel free to contribute by following the steps below:

### Clone the Repository

Start by forking the repository and cloning it to your local machine:

```bash
git clone <your_forked_repository_url>
````
### Create a Branch

Create a new branch to make your changes:

```bash
git checkout -b feature/your-feature-name
````
### Make Changes
Alter the code as needed. Be sure to follow the existing code style and best practices.

### Test Your Changes
Test your updates locally to ensure they work as intended and do not introduce new bugs.

### Commit and Push
Commit your changes with a meaningful commit message:

```bash
git commit -m "Add: Description of your feature or fix"
```

Push the changes to your forked repository:

```bash
git push origin feature/your-feature-name
```
### Submit a Pull Request
Navigate to the original repository on GitHub and submit a pull request from your forked branch. Be sure to include a detailed description of your changes and why they are beneficial.

### Review Process
Your pull request will be reviewed by an admin. We may reach out to you for clarification or additional information if necessary. Once approved, your changes will be merged into the main branch.

### Guidelines for Contributions
* Ensure your code is clean, well-documented, and adheres to the project’s style guidelines.
* Include comments to explain complex logic or unusual approaches.
* Test thoroughly to maintain the integrity of the project.
* Be respectful and collaborative in all communicatThank you for contributing to the project and helping us build an even better application!

## Tests
  There are no tests for this application.

## License
This project is licensed under the MIT license. Click [here](https://opensource.org/licenses/MIT) for more information.

## Questions
If you have any questions about this project or need further assistance, please feel free to reach out. I’m happy to help! You can contact me directly at:

Email: [faux_lucks0v@icloud.com](mailto:faux_lucks0v@icloud.com)

Additionally, you can find me on GitHub to view more of my projects or collaborate on this one:

GitHub Profile: [nathangreen1632](https:www.github.com/nathangreen1632)

Thank you for your interest in this project, and I look forward to connecting with you!

## Video Tutorial
To view a video tutorial of the application in action, click the link below:

[Employee Manager Video Tutorial](https://youtu.be/VpXXuvKBtP4)

```