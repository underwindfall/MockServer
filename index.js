const express = require('express');
const path = require('path')
const fs = require('fs')

const app = express();
const port = 3000;


app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home', {key: 'key', value: 'value'})
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));