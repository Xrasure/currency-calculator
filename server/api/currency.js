const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('currency-calculator.db'); //new

/**
 * Return all available currencies
 */
router.get('/', (req, res) => {
    db.all('SELECT * FROM currencies', (err, data) => {
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

/**
 * Returns the currency with the provided id
 */
router.get('/:id', (req, res) => {
    var id = req.params.id;

    return db.get('SELECT * FROM currencies WHERE id  = ?', id, (err, data) => {
        console.log({ err, data });
        if (err) {
            return res.status(500).json('error');
        }

        return res.status(200).json(data);
    });
});

/**
 * Create a new currency
 */
router.post('/', (req, res) => {
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
        db.run(
            'CREATE TABLE IF NOT EXISTS currencies (id INTEGER PRIMARY KEY, name TEXT, symbol TEXT)'
        );

        // Insert data from post request into table
        db.run(
            'INSERT INTO currencies (name, symbol) VALUES (?, ?)',
            [curr.name, curr.symbol],
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

//UPDATE COMMANDS

router.put('/:id', (req, res) => {
    // req.body

    const curr = req.body;
    var id = req.params.id;
    // name, symbol
    // curr.name

    //new
    db.serialize(() => {
        db.run(
            'UPDATE currencies SET name = ?, symbol = ? WHERE id = ?',
            [curr.name, curr.symbol, id],
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

//DELETE Commands

router.delete('/:id', (req, res) => {
    // read incoming currency from request
    // create currency in DB
    //return success

    // req.body

    const curr = req.body;
    var id = req.params.id;
    // name, symbol
    // curr.name

    //new
    db.serialize(() => {
        db.run('DELETE FROM currencies WHERE id = ?', id, (err) => {
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

module.exports = router;
