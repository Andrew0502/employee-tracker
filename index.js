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
      choices: ['Department', 'Role','Employee', 'I changed my mind.']
    })
    .then(function (answer) {
      if (answer.whatUpdate === 'Department') {
        updateDepartment();
      } else if (answer.whatUpdate === 'Role') {
        updateRole();
      } else if (answer.whatUpdate === 'Employee') {
        updateEmployee();
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
        // console.log(depName)
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

//===========================================================================

  function addNewDep(name){
    connection.query("INSERT INTO department SET ? ", 
    {name: name}, (error, data) => {
        if (error) throw error;
        console.table(data);
        init();
    });
  }

  function addNewRole(title, salary, department_id){
    connection.query("INSERT INTO role SET ? ", 
    {title: title, salary: salary, department_id: department_id}, 
    (error, data) => {
        if (error) throw error;
        console.table(data);
        init();
    });
  }