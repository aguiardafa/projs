const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const dbFolder = __dirname + '/db';
const contatosDbPath = dbFolder + '/contatos.json';

//antes do servidor iniciar, verifica se a pasta db existe
//se não existe, cria
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder);
}
//se o arquivo não existe, retorna JSON array vazio
//se o arquivo existe, retorna JSON array com os contatos
var tryRead = function (path, callback) {
    fs.readFile(path, 'utf8', function (err, contatos) {
        if (err)
            return callback([]);
        var contatosJSON = [];
        try {
            contatosJSON = JSON.parse(contatos);
        } catch (error) { }

        return callback(contatosJSON);
    });
}

var app = express();

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

//servidor implementando a api artigos
app.get('/api/artigos', function (req, res) {
    const artigosDbPath = dbFolder + '/artigos.json';
    tryRead(artigosDbPath, function (artigos) {
        res.status(200).json(artigos);
    });
});

//servidor implementando a api artigo
app.get('/api/artigo/*', function (req, res) {
    const artigosDbPath = dbFolder + '/artigos.json';
    tryRead(artigosDbPath, function (artigos) {
        var artigo = artigos.filter((artigo) => {
            return parseInt(artigo.id) == parseInt(req.params[0]);
        });
        res.status(200).json(artigo[0]);
    });
});

//servidor implementando a api contatos
app.post('/api/contato', function (req, res) {
    //le os contatos já gravados
    tryRead(contatosDbPath, function (contatos) {
        //inclui o novo contato
        contatos.push(req.body);
        //escreve arquivo com o contato novo
        fs.writeFile(contatosDbPath, JSON.stringify(contatos), function (err) {
            if (err) {
                res.status(500).json({ error: 'Opa, detectamos um probleminha! Tente novamente mais tarde!' });
                return;
            }
            //envia http code 200 e json com {sucess: true}
            res.status(200).json({ sucess: true });
        });
    });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
    res.status(404).send({ error: 'API Not found' });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('escutando na porta 3000');
});