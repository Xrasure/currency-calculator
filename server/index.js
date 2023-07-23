const express = require('express');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

const db = new sqlite3.Database('currency-calculator.db'); //new

app.use(express.json());

const currency = require('./api/currency');
const exchange = require('./api/exchange');
const user = require('./api/user');

app.use('/currency', currency);
app.use('/exchange', exchange);
app.use('/user', user);

//ExchangeRates

//USER


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

//login

app.get('/login/', async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.serialize(async () => {
        var passwordInDB = await db.get(
            'SELECT password FROM users WHERE username  = ?',
            username,
            (err, data) => {
                console.log({ err, data });
                if (err) {
                    return res.status(500).json('error');
                }
                if (bcrypt.compare(passwordInDB.password, hashedPassword)) {
                    return res.status(200).json({ result: true });
                } else {
                    return res.status(200).json({ result: false });
                }
            }
        );
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
