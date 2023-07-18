const express = require('express')
const sqlite3 = require('sqlite3')//new
const app = express()
const port = 3000

const db = new sqlite3.Database('currency-calculator.db');//new



app.use(express.json());

/**
 * Return all available currencies
 */
app.get('/currency', (req, res) => {

  db.all('SELECT * FROM currencies', (err,data) => {
    console.log({err,data})
    if (err) {
      return res.status(500).json("error");
    }

    return res.status(200).json(data);
  });
  // fetch all currencies from db
  //return currencies

  // return res.status(200).json();
})


/**
 * Returns the currency with the provided id
 */
app.get('/currency/:id', (req, res) => {
  var id=req.params.id;

  return db.get('SELECT * FROM currencies WHERE id  = ?',id, (err,data) => {
    console.log({err,data})
    if (err) {
      return res.status(500).json("error");
    }

    return res.status(200).json(data);
  });
  // read id
  // fetch currency from db
  //return currency details

  // req.params.id

  return res.status(200).json('GET');
})

/**
 * Create a new currency
 */
app.post('/currency', (req, res) => {

  // read incoming currency from request
  // create currency in DB
  //return success

  // req.body

  const curr = req.body;
  // name, symbol
  // curr.name


  //new
  db.serialize(() => {
    // Create a table "Currencies" in Database
    db.run('CREATE TABLE IF NOT EXISTS currencies (id INTEGER PRIMARY KEY, name TEXT, symbol TEXT)');
  
    // Insert data from post request into table
    db.run('INSERT INTO currencies (name, symbol) VALUES (?, ?)', [curr.name, curr.symbol], (result, err) => {
      if (err) {
        console.error(err);
        return res.status(500).json("error")
      } else {
        console.log('Row inserted successfully!');
        return res.status(200).json("success");
      }
    });
  });

  


})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})