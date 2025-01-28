# Resume Creator
**This project provides a simple Web application in which user can fill their information to create resume based on the
  provided informations, It stores the provided information in the mysql database and fetch the data while required. It
  provides four functionalities that are**
 - Add new data of the user
 - Update The existing data of the user
 - View the data in that is present in the  database
 - Delete the data of the user

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
- the /routes/routes.js is the main file that contains all the routes for performing all the four functionalities
- It uses mysql database for storing the data for the resume

## Overview of files
- routes.js => It is the main file that handles all the routes
- resumeCreator.js => It contains the function that creates resume.

## prerequisites before cloning the repo
- Before running the program you must have created a database using mysql.
- run the following code once entered mysql cmd using **_ mysql -u root -p _** then enter your password for entering root.
- once entered mysql cmd run **_ create database json; _** then run **_ use json _**
- once it shows database changed run following lines of code
- **_create table resume(data json, email varchar(50));_**
- Now you are set to run the main program.

## Installation
- git clone https://github.com/itsspyner/Db_insert_update_delete_display.git
- cd Db_insert_update_delete_display
- npm install

## Implementation
- node index.js its should say "Listening on port 3000" and "connected successfully".
- Then head to postman->file hit new and click in http.
- Then change the get request to post request and write any of the given url described in the format.txt       
  file (https://github.com/itsspyner/Db_insert_update_delete_display/blob/main/Format.txt).
- Then click on send in the postman and any operation you have choosen should have been completed.
