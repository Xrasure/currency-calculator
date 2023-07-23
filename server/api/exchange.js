const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('currency-calculator.db'); //new


router.post('/', (req, res) => {
    // read incoming currency from request
    // create currency in DB
    //return success

    // req.body

    const curr = req.body;
    // name, symbol
    // curr.name

    db.serialize(() => {
        // Create a table "Exchanges" in Database
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

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
    var id = req.params.id;

    return db.get('SELECT * FROM exchanges WHERE id  = ?', id, (err, data) => {
        console.log({ err, data });
        if (err) {
            return res.status(500).json('error');
        }

        return res.status(200).json(data);
    });
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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



module.exports = router;