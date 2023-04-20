const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

let files

let url = 'http://localhost:8000/'
let command = `start msedge --new-window "${url}"`;

app.get('/', (req, res) => {
    res.render('index.ejs', {filesList: files});
})

app.listen(8000, ()=>{
    files = GetRandomFileList();
    console.log("Application started and Listening on port 8000");
    exec(command);
})
.on('error', (err) => {
    console.log('Already in use. Opening ');
    exec(command);
});


function GetRandomFileList() {
    let imgFiles = fs.readdirSync('public/img/')
    let shuffled = imgFiles.sort((a,b) => 0.5 - Math.random())
    return shuffled
}
