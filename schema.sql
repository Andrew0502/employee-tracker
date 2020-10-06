DROP DATABASE IF EXISTS trackerDB;

CREATE DATABASE trackerDB;

USE trackerDB;

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER, 
  manager_id INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary decimal, 
    department_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Jane', 'Austen', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Mark', 'Twain', 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Lewis', 'Carroll', 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Andre', 'Asselin', 3, 4);

INSERT INTO role (title, salary, department_id) values ('Managment', 100000, 1);
INSERT INTO role (title, salary, department_id) values ('Information Technology', 80000, 2);
INSERT INTO role (title, salary, department_id) values ('intern', 20000, 3);

INSERT INTO department (name) values ('Management');
INSERT INTO department (name) values ('Information Technology');
INSERT INTO department (name) values ('Sales');
INSERT INTO department (name) values ('Facilities');
INSERT INTO department (name) values ('Underwriting');

-- SELECT title, firstName, lastName
-- FROM books
-- INNER JOIN authors ON books.authorId = authors.id;