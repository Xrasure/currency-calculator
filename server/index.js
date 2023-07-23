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

app.post('/login/', async (req, res) => {
    const loginInfo = req.body;
    const username = loginInfo.username;
    const password = loginInfo.password;

    db.get('SELECT password FROM users WHERE username = ?', username, async (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json('error');
        }

        if (!data) {
            // Wenn der Benutzer nicht in der Datenbank gefunden wurde
            return res.status(200).json({ result: false });
        }

        const passwordInDB = data.password;
        const isPasswordMatch = await bcrypt.compare(password, passwordInDB);

        if (isPasswordMatch) {
            return res.status(200).json({ result: true });
        } else {
            return res.status(200).json({ result: false });
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
