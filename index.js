var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Andrew0502',
  database: 'trackerDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init();
  });

//===========================================================================

  function init() {
    inquirer
      .prompt({
        name: 'whatDo',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['ADD','VIEW','UPDATE','EXIT']
      })
      .then(function (answer) {
        if (answer.whatDo === 'ADD') {
          add();
        } else if (answer.whatDo === 'VIEW') {
          view();
        } else if (answer.whatDo === 'UPDATE') {
          update();
        } else if (answer.whatDo === 'EXIT') {
          connection.end();
        }
    });
  }

//===========================================================================

  function add() {
    inquirer
      .prompt({
        name: 'whatAdd',
        type: 'list',
        message: 'What would you like to add?',
        choices: ['Department', 'Role','Employee', 'I changed my mind.']
      })
      .then(function (answer) {
        if (answer.whatAdd === 'Department') {
          addDepartment();
        } else if (answer.whatAdd === 'Role') {
          addRole();
        } else if (answer.whatAdd === 'Employee') {
          addEmployee();
        } else if (answer.whatAdd === 'I changed my mind.') {
          init();
        }
    });
  }

  function view() {
    inquirer.prompt({
      name: 'whatView',
      type: 'list',
      message: 'What would you like to view?',
      choices: ['Department', 'Role', 'Employee', 'I changed my mind.']
    }).then((viewAnswer) => {
        if(viewAnswer.whatView === 'Department') {
          viewDepartment();
        } else if (viewAnswer.whatView === 'Role') {
          viewRole();
        } else if (viewAnswer.whatView === 'Employee') {
          viewEmployee();
        } else if (viewAnswer.whatView === 'I changed my mind.') {
          init();
        }
    });
  }

  function update() {
    inquirer
    .prompt({
      name: 'whatUpdate',
      type: 'list',
      message: 'What would you like to update?',
      choices: ['Employee Role','Employee Manager', 'I changed my mind.']
    })
    .then(function (answer) {
      if (answer.whatUpdate === 'Employee Role') {
        updateEmployeeRole();
      } else if (answer.whatUpdate === 'Employee Manager') {
        updateEmployeeManager();
      } else if (answer.whatUpdate === 'I changed my mind.') {
        init();
      }
    });
  }

//===========================================================================

  function addDepartment() {
    inquirer
      .prompt({
        name: 'depName',
        type: 'input',
        message: 'What do you want to name the new department?',
      }).then(({depName}) =>{
        addNewDep(depName);
      })
  }

  function addRole() {
    inquirer
      .prompt([{
        name: 'roleName',
        type: 'input',
        message: 'What title do you want the new role to have?',
      },
      {
          name: 'roleSalary',
          type: 'input',
          message: 'What salary do you want the new role to have?',
      },
      {
            name: 'roleDepId',
            type: 'input',
            message: 'What department id do you want the new role to have?'
      }]).then(({roleName, roleSalary, roleDepId}) =>{
        console.log(roleName, roleSalary, roleDepId);
        addNewRole(roleName, roleSalary, roleDepId);
      })
  }

  function addEmployee() {
    inquirer
      .prompt([{
        name: 'employeeFirstName',
        type: 'input',
        message: "What is the new Employee's first name?",
      },
      {
        name: 'employeeLastName',
        type: 'input',
        message: "What is the new Employee's last name?",
      },
      {
          name: 'employeeRoleId',
          type: 'input',
          message: "What is the new employee's role id?",
      },
      {
            name: 'employeeManagerID',
            type: 'input',
            message: "What is the new employee's manager id?"

      }]).then(
          ({employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId}) =>{
        console.log(employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId);
        addNewEmployee(employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId);
      })
  }

//===========================================================================
  function viewDepartment() {
    connection.query("SELECT * FROM department;", (error, data) => {
      if (error) throw error;
        console.table(data);
        init();
    })
  }

  function viewRole() {
    connection.query("SELECT * FROM role;", (error, data) => {
      if (error) throw error;
        console.table(data);
        init();
    })
  }

  function viewEmployee() {
    connection.query("SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id;", 
    (error, data) => {
      if (error) throw error;
        console.table(data);
        init();
    })
  }

//===========================================================================

  function updateEmployeeRole() {
    inquirer
      .prompt([{
        name: 'chooseEmployee',
        type: 'input',
        message: "What is the ID of the employee you which to change the role of?",
        },
        {
        name: 'updateRole',
        type: 'input',
        message: "What do you want to change this employee's role to?",
      }]).then(({updateRole, chooseEmployee}) =>{
        
        connection.query(`UPDATE employee SET role_id = ${updateRole} WHERE id = ${chooseEmployee}; `,
         (error, data) => {
        if (error) throw error;
        init();
      });
    });
  };

  function updateEmployeeManager() {
    inquirer
      .prompt([{
        name: 'chooseEmpManager',
        type: 'input',
        message: "What is the ID of the employee you which to change the manager of?",
        },
        {
        name: 'updateManager',
        type: 'input',
        message: "What do you want to change this employee's manager to?",
      }]).then(({updateManager, chooseEmpManager}) =>{
        
        connection.query(`UPDATE employee SET manager_id = ${updateManager} WHERE id = ${chooseEmpManager}; `,
         (error, data) => {
        if (error) throw error;
        init();
      });
    });
  };


//===========================================================================

  function addNewDep(name){
    connection.query("INSERT INTO department SET ? ", 
    {name: name}, (error, data) => {
        if (error) throw error;
        init();
    });
  }

  function addNewRole(title, salary, department_id){
    connection.query("INSERT INTO role SET ? ", 
    {title: title, salary: salary, department_id: department_id}, 
    (error, data) => {
        if (error) throw error;
        init();
    });
  }

  function addNewEmployee(first_name, last_name, role_id, manager_id){
    connection.query("INSERT INTO employee SET ? ", 
    {first_name: first_name, last_name: last_name, role_id: role_id, manager_id: manager_id}, 
    (error, data) => {
        if (error) throw error;
        init();
    });
  }

//===========================================================================