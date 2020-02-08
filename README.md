# theGreatGoal
Financial Retirement Planning

Create a git repository
git clone
cd theGreatGoal (backend folder)
npm init
npx create-react-app client (frontend folder)

# in backend folder
install dependencies by running the following commands: 
    npm install express mongoose if-env concurrently dotenv twilio --save

open package.json file and in the scripts section after the test script add the following:
    "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
    "start:prod": "node server.js",
    "start:dev": "concurrently \"nodemon --ignore 'client/*'\" \"npm run client\"",
    "client": "cd client && npm run start",
    "install": "cd client && npm install",
    "build": "cd client && npm run build",
    "heroku-postbuild": "npm run build"

create a .env file and add the following:
    NODE_ENV = "development"

create a server.js and add the following:
    const express = require("express");
    const mongoose = require("mongoose");
    const routes = require("./routes");
    const app = express();
    const PORT = process.env.PORT || 3001;

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    if (process.env.NODE_ENV === "production") {
        app.use(express.static("client/build"));
    }

    app.use(routes);

    if (process.env.NODE_ENV === "development"){
        mongoose.connect("mongodb://localhost/theGreatGoal");
    }
    else {
        mongoose.connect(process.env.MONGODB_URI);    
    }

    app.listen(PORT, function () {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });

# in the frontend folder
open the package.json file after the dependencies section add the following:
    "proxy": "http://localhost:3001/",

install dependencies by running the following commands: 
    npm install react-bootstrap bootstrap --save
    npm install react-router-dom --save
    npm install material-ui --save
    npm install axios --save