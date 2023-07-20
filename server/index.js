const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;

const db = new sqlite3.Database('currency-calculator.db'); //new

app.use(express.json());

const currency = require('./api/currency');

app.use('/currency', currency);

//ExchangeRates

app.post('/exchange', (req, res) => {
    // read incoming currency from request
    // create currency in DB
    //return success

    // req.body

    const curr = req.body;
    // name, symbol
    // curr.name

    db.serialize(() => {
        // Create a table "Currencies" in Database
        db.run(
            'CREATE TABLE IF NOT EXISTS exchanges (id INTEGER PRIMARY KEY, currencyid INTEGER, exchangerate REAL)'
        );

        // Insert data from post request into table
        db.run(
            'INSERT INTO exchanges (currencyid, exchangerate) VALUES (?, ?)',
            [curr.currencyid, curr.exchangerate],
            (result, err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json('error');
                } else {
                    console.log('Row inserted successfully!');
                    return res.status(200).json('success');
                }
            }
        );
    });
});

app.get('/exchange', (req, res) => {
    db.all('SELECT * FROM exchanges', (err, data) => {
        console.log({ err, data });
        if (err) {
            return res.status(500).json('error');
        }

        return res.status(200).json(data);
    });
    // fetch all currencies from db
    //return currencies

    // return res.status(200).json();
});

app.get('/exchange/:id', (req, res) => {
    var id = req.params.id;

    return db.get('SELECT * FROM exchanges WHERE id  = ?', id, (err, data) => {
        console.log({ err, data });
        if (err) {
            return res.status(500).json('error');
        }

        return res.status(200).json(data);
    });
});

app.put('/exchange/:id', (req, res) => {
    // req.body

    const curr = req.body;
    var id = req.params.id;
    // name, symbol
    // curr.name

    //new
    db.serialize(() => {
        db.run(
            'UPDATE exchanges SET currencyid = ?, exchangerate = ? WHERE id = ?',
            [curr.currencyid, curr.exchangerate, id],
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json('error');
                } else {
                    console.log('Updated successfully!');
                    console.log(curr.name);
                    return res.status(200).json('updated successfully');
                }
            }
        );
    });
});

app.delete('/exchange/:id', (req, res) => {
    const curr = req.body;
    var id = req.params.id;
    // name, symbol
    // curr.name

    db.serialize(() => {
        db.run('DELETE FROM exchanges WHERE id = ?', id, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json('error');
            } else {
                console.log('deleted successfully');
                return res.status(200).json('deleted successfully');
            }
        });
    });
});

//USER
app.post('/user', (req, res) => {
    // read incoming currency from request
    // create currency in DB
    //return success

    // req.body

    const curr = req.body;
    // name, symbol
    // curr.name

    db.serialize(() => {
        // Create a table "Currencies" in Database
        db.run(
            'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)'
        );

        // Insert data from post request into table
        db.run(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [curr.username, curr.password],
            (result, err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json('error');
                } else {
                    console.log('Row inserted successfully!');
                    return res.status(200).json('success');
                }
            }
        );
    });
});

app.get('/user', (req, res) => {
    db.all('SELECT * FROM users', (err, data) => {
        console.log({ err, data });
        if (err) {
            return res.status(500).json('error');
        }

        return res.status(200).json(data);
    });
    // fetch all currencies from db
    //return currencies

    // return res.status(200).json();
});

app.get('/user/:id', (req, res) => {
    var id = req.params.id;

    return db.get('SELECT * FROM users WHERE id  = ?', id, (err, data) => {
        console.log({ err, data });
        console.log(convertCurrency(2, 1, 1));
        if (err) {
            return res.status(500).json('error');
        }

        return res.status(200).json(data);
    });
});

app.put('/user/:id', (req, res) => {
    // req.body

    const curr = req.body;
    var id = req.params.id;
    // name, symbol
    // curr.name

    //new
    db.serialize(() => {
        db.run(
            'UPDATE users SET username = ?, password = ? WHERE id = ?',
            [curr.username, curr.password, id],
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json('error');
                } else {
                    console.log('Updated successfully!');
                    console.log(curr.name);
                    return res.status(200).json('updated successfully');
                }
            }
        );
    });
});

app.delete('/user/:id', (req, res) => {
    const curr = req.body;
    var id = req.params.id;
    // name, symbol
    // curr.name

    db.serialize(() => {
        db.run('DELETE FROM users WHERE id = ?', id, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json('error');
            } else {
                console.log('deleted successfully');
                return res.status(200).json('deleted successfully');
            }
        });
    });
});

app.get('/convert', async (req, res) => {
    const amount = req.query.amount;
    const from = req.query.from;
    const to = req.query.to;

    db.get(
        'SELECT exchangerate FROM exchanges WHERE currencyid  = ?',
        from,
        (err, fromEx) => {
            db.get(
                'SELECT exchangerate FROM exchanges WHERE currencyid  = ?',
                to,
                (err, toEx) => {
                    const result =
                        (amount * fromEx.exchangerate) / toEx.exchangerate;

                    return res.status(200).json({ result });
                }
            );
        }
    );
});

//convert currency

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
