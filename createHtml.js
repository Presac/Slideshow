const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let filelist = GetRandomFileList()
let htmlName = 'test.html'
let url = `${__dirname}\\${htmlName}`
// let command = `start msedge --new-window "${url}"`;
let command = `start chrome --new-window "${url}"`;

let beginning = `<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="public/css/slide.css">
</head>
<body>
    <div class="slideshow-container">`

let end = `</div>
<div id="context-menu">
    <div class="item" onclick="SetDelay(1)">Set Delay to 1</div>
    <div class="item" onclick="SetDelay(5)">Set Delay to 5</div>
    <div class="item" onclick="SetDelay(10)">Set Delay to 10</div>
    <div class="item" onclick="SetDelay(20)">Set Delay to 20</div>
    <div class="item" onclick="SetDelay(60)">Set Delay to 60</div>
</div>
<script src="public/js/slide.js"></script>
</body>
</html>`

let middle = ``
filelist.forEach((file, index)=> {
    middle += `
    <div class="mySlides fade">
        <div class="numbertext">
            ${index+1} / ${filelist.length}
        </div>
        <img src="public/img/${file}">
    </div>
    `
})

try {
    fs.writeFileSync(htmlName, beginning + middle + end)
} catch (error) {
    console.log(error)
}
exec(command);

function GetRandomFileList() {
    const EXTENSION = ['.png', '.jpg', '.jpeg']
    let imgFiles = fs.readdirSync('public/img/')
    imgFiles = imgFiles.filter((file) => EXTENSION.includes(path.extname(file).toLocaleLowerCase()))
    let shuffled = imgFiles.sort((a,b) => 0.5 - Math.random())
    return shuffled
}