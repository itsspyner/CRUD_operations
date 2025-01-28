# Resume Creator
**This project provides a simple Web application in which user can fill their information to create resume based on the
  provided informations, It stores the provided information in the mysql database and fetch the data while required. It
  provides five functionalities that are**
 - Add new data of the user
 - Update The existing data of the user
 - View the data in that is present in the  database
 - Delete the data of the user
 - Download resume of the data of a specified user

## Features
- Easy to use and supports file format PDF.
- Insert, update and delete json data.
- Uses postman for api requests.
- Uses mysql database to store json data.

## Technologies Used
- Node.js
- Vanilajs
- cors
- Express.js
- MYSQL2
- fs
- Streams
- pdfkit

## Overview
- the /routes/routes.js is the main file that contains all the routes for performing all the five functionalities
- It uses mysql database for storing the data for the resume

## Overview of files
- routes.js => It is the main file that handles all the routes.
- index.js => Fetch all the data from database to show in the table.
- edit.js => Edit the current data in database with new data provided by user
- resume.js => Download the resume for the specified user
- view.js => Fetch the data of a specified user.
- delete.js => Deletes the data of a specified user.
- addData.js => Add new data to the database.

## prerequisites before cloning the repo
- Before running the program you must have created a database using mysql.
- run the following code once entered mysql cmd using **_ mysql -u root -p _** then enter your password for entering root.
- once entered mysql cmd run **_ create database records; _** then run **_ use records _**
- once it shows database changed run following lines of code
- **_CREATE TABLE my_table (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    email VARCHAR(30),
    phone VARCHAR(30),
    brief_description VARCHAR(100),
    skills VARCHAR(20),
    education JSON,
    experience JSON,
    address VARCHAR(30),
    PRIMARY KEY (id)
);
_**
- Now you are set to run the main program.

## Installation
- git clone https://github.com/itsspyner/CRUD_operations.git
- cd CRUD_operations
- npm install

## Implementation
- Firstly open terminal and go to routes folder using cd routes, then enter node routes.js
- It should say __listening on port 3000__ and __Connected Successfully!__
- Now go to views folder and run index.html using live server (__Note: You must have live server vs code extension installed__).
- Now in the browser you can perform all the 5 functionality easily.
