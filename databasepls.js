var express = require('express');//loads express
var mysql = require('mysql');//loads mysql


var app = express();//initialises express
app.use(express.static('public')) //sets express to draw files from the 'public' folder


app.get('/', (req,res) => res.sendFile('index.html')); //sends the index.html file from public by default
app.get('/login/', (req,res) => {
  let sql = "select username from users"; // the database query to use to return info
  con.query(sql,temporary)
  console.log(req.query.user, req.query.password)
  res.send('index.html');

});

var con = mysql.createConnection({ //creates a connection object with config
    host: "35.230.144.119", // add the url of the Database Server
    user: "root", // the username for the Database Server
    password: "hi", // the password for the Database Server
    database: "user" // the Database to use
  }); // this needs to be updated, obviously


con.connect(function(err) { //calls connect, a method of the connection object, with a callback
    if (err) throw err; // specifies what to do in the case of an error
    console.log("Connected to DB!"); // tells me I'm connected
  });

function temporary(err, result) { // executes above query using a callback specifying...
    if (err) throw err; // what to do with an error
    if (result) {processData(result)}};

function validateUsername(username) {
    	//check username doesn't include any special characters and made of numbers and letters only.
    	var lettersnumbers = /^[0-9a-zA-Z]+$/; //regex expression for all numbers and letters
    	if (username.match(lettersnumbers)) {
    		alert("all good");
    		return true;
    	}
    	else {
    		alert("Invalid username. Please enter numbers and letters only.");
    		return false;
    	}
    }

function loginSuccess(username, password) {
    	let usrlogin = false;
    	//query database
        let sql = "SELECT Username, Password from users WHERE username = " + username + " and `password` =" + password + ";";
        con.query(sql, function (err, result) { // executes above query using a callback specifying...
    		if (err) throw err; // what to do with an error
    		if (result) {
    			usrlogin = true;
    		}; // what to do with a result, i.e. calls function below
        });
        


function processData(data) { // called by above
    var dataToSend =[]; //creates an empty array with data to be sent to frontend
    for (row of data) { //loops through the data to get the database rows
      for (key of Object.keys(row)) {// make sure all columns are represented
        dataToSend.push(row[key]) // pushes all fields to data to send
      } // you could do this a more effective way, with an array of arrays, this is just an example
    }
    console.log(dataToSend)
    app.get('/api/', (req,res) => res.send({data:dataToSend})); //this actually sends the data
  }

app.listen(3000,()=>console.log("http://localhost:3000")); //starts listening with a friendly link
