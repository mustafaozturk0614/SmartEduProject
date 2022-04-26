const express = require('express');

const app = express();

const port = 3000;
app.listen(port, () => {
    console.log(`App Started on port ${port}`);
});

app.get('/', (req, res) => {
    res.status(200).send('index Sayfası');
});
