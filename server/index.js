require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const PORT = 4000
const {CONNECTION_STRING, SESSION_SECRET} = process.env
const authCtrl = require('./controllers/authController')

app.use(express.json())
app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log("DB running")
    app.listen(PORT, () => console.log(`Scaping some runes on port ${PORT}`))
})

