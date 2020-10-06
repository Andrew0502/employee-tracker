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
  });

  function init(){

  }

  function init() {
    inquirer
      .prompt({
        name: 'whatDo',
        type: 'list',
        message: 'Would you like to do?',
        choices: ['ADD', 'VIEW','UPDATE', 'EXIT']
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



  function view() {

  }

  function update() {

  }