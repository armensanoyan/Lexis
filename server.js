const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const dbModules = require('./lib/database.js');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database');
const http = require('http');
const util = require('util');

db.serialize(() => {

	db.run("CREATE TABLE IF NOT EXISTS DICTIONARY (word VARCHAR, meaning VARCHAR, example VARCHAR, synonym VARCHAR)");
	
	// dbModules.loadData().forEach(function(element) {
	// 	db.run('INSERT INTO DICTIONARY (word, meaning, example, synonym) SELECT * FROM ( SELECT ?, ?, ?, ?) AS tmp	WHERE NOT EXISTS (SELECT word FROM DICTIONARY WHERE word = ?) LIMIT 1', element.word, element.meaning, element.example, element.synonyms, element.id);
	// });

})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/load', (req, res) => {
	res.send(dbModules.loadData());
});

app.use(express.static(path.join(__dirname + '/public')));

app.post('/', (req, res) => {
	console.log('post /1:',dbModules.find(req.body.word))
	// console.log('post /2:',req.body.id)
	dbModules.findById(req.body.id) == undefined ? dbModules.insert(req.body) : dbModules.update(req.body);
	// db.run('INSERT INTO DICTIONARY (word, meaning, example, synonym) SELECT * FROM ( SELECT ?, ?, ?, ?) AS tmp	WHERE NOT EXISTS (SELECT word FROM DICTIONARY WHERE word = ?) LIMIT 1', req.body.word, req.body.meaning, req.body.example, req.body.synonyms, req.body.word);
	db.each("SELECT * FROM DICTIONARY", (err, data) => {
		// console.log(data);
	})
	res.redirect('/');
})

app.put('/give',(req, res) => {
	console.log('yea that is me', req.body);
  
	// console.log(dbModules.find(req.body.word));
	// res.json(dbModules.find(req.body.word));
})

app.listen(3000, () => console.log('listening on port 3000.'))
// console.log(dbModules.loadData())