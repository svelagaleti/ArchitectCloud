var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended : true
}));
var path = require('path');
var google = require("googleapis");
// var MongoClient = require('mongodb').MongoClient;
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/' + 'Home.html');
})
app.get('/customerprofile', function(req, res) {
	res.sendFile(__dirname + '/' + 'CRegister.html');

})
app.get('/amprofile', function(req, res) {
	res.sendFile(__dirname + '/' + 'AMRegister.html');

})
app.get('/customerpage', function(req, res) {
	res.sendFile(__dirname + '/' + 'customerpage.html');

})
//Defining isEmpty() function 
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

	// null and undefined are "empty"
	if (obj == null) {
		return true;
	}

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length > 0) {
		return false;
	}
	if (obj.length === 0) {
		return true;
	}

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for ( var key in obj) {
		if (hasOwnProperty.call(obj, key)) {
			return false;
		}
	}

	return true;
}

function getRandomCode() {
	var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789";
	var rand;
	var retrunString = "";
	for (var i = 0; i < 8; i++) {
		returnString += charSet.charAt(Math.floor(Math.random()
				* (charSet.length - 0 + 1)) + 0);
	}
	return returnString;
}
// for contact us page
app.post('/contactus', function(req, res) {
	var MongoClient = require("mongodb").MongoClient;
	response = {
		cuname : req.body.cName,
		cuemail : req.body.cMail,
		cuphone : req.body.cPhone,
		cumessage : req.body.message,

	};
	MongoClient.connect("mongodb://localhost:27017/Acloud", function(err, db) {
		if (!err) {
			console.log("Connected Successfully");
		} else {
			console.log("Not Connected Successfully")
		}

		db.collection("contactus").insert(response, function(err, records) {
			if (!err) {
				console.log("submited your request");
				res.send("request submitted");
			} else {
				console.log("Record not Inserted Successfully");
				res.end("sorry we are unable to send your request");
			}
			db.close();
		});
	});
});
// for Architect SignUp
app.post('/Areg', function(req, res) {
	var MongoClient = require("mongodb").MongoClient;
	response = {
		name : req.body.AName,
		ph : req.body.APhone,
		mail : req.body.AMail,
		pwd : req.body.Apwd,

	};
	MongoClient.connect("mongodb://localhost:27017/Acloud", function(err, db) {
		if (!err) {
			console.log("Connected Successfully");
		} else {
			console.log("Not Connected Successfully")
		}

		db.collection("Areg").insert(response, function(err, records) {
			if (!err) {
				console.log("submited your request11");
				res.send("success");
			} else {
				console.log("Record not Inserted Successfully");
				res.end("failure");
			}
			db.close();
		});
	});
});
// Customer registration
app.post('/creg', function(req, res) {
	var MongoClient = require("mongodb").MongoClient;
	response = {
		name : req.body.CName,
		ph : req.body.CPhone,
		mail : req.body.CMail,
		pwd : req.body.Cpwd,

	};
	MongoClient.connect("mongodb://localhost:27017/Acloud", function(err, db) {
		if (!err) {
			console.log("Connected Successfully");
		} else {
			console.log("Not Connected Successfully")
		}

		db.collection("Creg").insert(response, function(err, records) {
			if (!err) {
				console.log("submited your request");
				res.send("success");
			} else {
				console.log("Record not Inserted Successfully");
				res.end("failure");
			}
			db.close();
		});
	});
});
// Mediator registrations
app.post('/mreg', function(req, res) {
	var MongoClient = require("mongodb").MongoClient;
	response = {
		name : req.body.MName,
		ph : req.body.MPhone,
		mail : req.body.MMail,
		pwd : req.body.Mpwd,

	};
	MongoClient.connect("mongodb://localhost:27017/Acloud", function(err, db) {
		if (!err) {
			console.log("Connected Successfully");
		} else {
			console.log("Not Connected Successfully")
		}

		db.collection("Mreg").insert(response, function(err, records) {
			if (!err) {
				console.log("submited your request");
				res.send("success");
			} else {
				console.log("Record not Inserted Successfully");
				res.end("failure");
			}
			db.close();
		});
	});
});
// ==================================customer login
// validation=====================================
app.post('/clogin', function(req, res) {
	var MongoClient = require("mongodb").MongoClient;
	MongoClient.connect("mongodb://localhost:27017/Acloud", function(err, response) {
		if (err) {
			console.log("not Connected Successfully");
		} else {
			console.log(" Connected Successfully");
		}
		var loginPassword = req.body.Cpwd;
		var mobile = req.body.CPhone;
		console.log(loginPassword);
		console.log(mobile);
		var collection = response.collection('Creg');
		collection.find({
			ph : mobile
		}, {
			pwd : 1,
		}).toArray(function(err, queryResponse) {
			if (isEmpty(queryResponse)) {
				res.send("Enter valid username");
			} else {
				console.log(queryResponse);
				var queryResponseJSON = JSON.stringify(queryResponse);
				console.log(queryResponseJSON);
				var queryResponseParseJSON = JSON.parse(queryResponseJSON);
				console.log(queryResponseParseJSON);
				console.log(loginPassword);
				console.log(queryResponseParseJSON.pwd);
				if ((queryResponseParseJSON.pwd) == loginPassword) {
					res.send("success");
					res.end();
				} else {
					res.send("Enter valid credentials");
					res.end();
				}
			}
		
		});
	});
	
});

// Assigning Port numbers in local servers
var server = app.listen(8082, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://192.168.0.136:8082");
});
