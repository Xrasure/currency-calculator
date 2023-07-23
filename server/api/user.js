const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('currency-calculator.db'); //new

router.post('/', async (req, res) => {
    // read incoming currency from request
    // create currency in DB
    //return success

    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, 10);

    db.serialize(() => {
        // Create a table "Currencies" in Database
        db.run(
            'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)'
        );

        // Insert data from post request into table
        db.run(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [user.username, hashedPassword],
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

router.get('/:id', (req, res) => {
    var id = req.params.id;

    return db.get('SELECT * FROM users WHERE id  = ?', id, (err, data) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;