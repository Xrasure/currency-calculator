const express = require('express')

const app = express()
const port = 3000


app.use(express.json());

// /**
//  * Return all available currencies
//  */
// app.get('/currency', (req, res) => {
  
//   // fetch all currencies from db
//   //return currencies

//   return res.status(200).json();
// })


/**
 * Returns the currency with the provided id
 */
app.get('/currency/:id', (req, res) => {
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
  

  // dbNAme= currency-calculator
  // tableName = currencies

  return res.status(200).json('POST');
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})