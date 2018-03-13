var fs = require('fs');
var path = require('path')


// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }

// fs.writeFile(dir+"test.md", "Hey there!", function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// }); 

var js_reg = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
var html_reg = /<template\b[^>]*>([\s\S]*?)<\/template>/gm;
var css_reg = /<style\b[^>]*>([\s\S]*?)<\/style>/gm;
var reg = /(<([^>]+)>)/i;

var dir = "./dist/"

function convert(filepath) {
    fs.readFile(filepath, function (err, data) {
        if (err) {
            throw err;
        }
        var content = data.toString()
        var html = content.match(html_reg)
        var css = content.match(css_reg)
        var js = content.match(js_reg)
    
        if(html[0]){
            var innerContent = removeOutermostTag(html[0])
            fs.writeFile(dir + "index.wxml", innerContent, function (err) {
                if (err) {
                    return console.log(err);
                }
        
                console.log("index.wxml");
            });
        }
    
        if(css[0]){
            var innerContent = removeOutermostTag(css[0])
            fs.writeFile(dir + "index.wxss", innerContent, function (err) {
                if (err) {
                    return console.log(err);
                }
        
                console.log("index.wxss");
            });
        }
    
        if(js[0]){
            var innerContent = removeOutermostTag(js[0])
            fs.writeFile(dir + "index.js", innerContent, function (err) {
                if (err) {
                    return console.log(err);
                }
        
                console.log("index.js");
            });
        }
    });
}

// let s = `<template>
//     <view class="container">{{title}}</view>
// </template>`;
// let s1 = `<custom>
//     anything...
// </custom>`;

// console.log(removeOutermostTag(s))

function removeOutermostTag(str) {
    var reg = /(<([^>]+)>)/i;
    var newStr = str.replace(reg, '')
    var reversedString = newStr.split('').reverse().join('')
    // console.log(reversedString)
    newStr = reversedString.replace(/(>([^<]+)<)/i, '').split('').reverse().join('')
    return newStr
}

var chokidar = require('chokidar');

// One-liner for current directory, ignores .dotfiles
chokidar.watch('./src', {ignored: /(^|[\/\\])\../}).on('all', (event, filepath) => {
  console.log(event, filepath);
  if(path.extname(filepath)=='.vue') {
    convert(filepath)
  }
});