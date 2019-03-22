const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const request = require('xmlhttprequest').XMLHttpRequest;

const app = express()

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

const history = [];
let id = 0;

app.get('/', (req, res) => {
    const a = history.map(t => ({
        id: t.id,
        en: t.en,
        minion: t.minion,
    }));
    res.send(a);
});

app.post('/', (req, res) => {
    const {en} = req.body;
    let url = 'https://api.funtranslations.com/translate/minion.json?text=' + encodeURI(en);
    let translate = new request;
    translate.open('GET', url, false);
    translate.send(null);
    const minion = JSON.parse(translate.responseText).contents.translated;
    id++;
    const newEntry = {
        id: id,
        en,
        minion,
    };
    history.push(newEntry);
    res.status(200).send();
});

app.post('/delete', (req, res) => {
    const delID = req.body.delid;
    var index = history.findIndex(obj => obj.id==delID);
    history.splice(index, 1);
})


app.listen(8003, () => {
    console.log("Listening on port 8003");
});
