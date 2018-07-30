// var parseString = require('xml2js').parseString;
// var xml = "<root>Hello xml2js!</root>"
// parseString(xml, function (err, result) {
//     console.dir(result);
// });

var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/src/test.vue', function (err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result.we.template);
        console.log('Done');
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(result.we.template);
        console.log(xml)
    });
});

var dir = "./dist/"

function convert(obj) {
    var html = obj.template
    var css = obj.style
    var js = obj.script

    if (html) {
        var innerContent = removeOutermostTag(html[0])
        fs.writeFile(dir + "index.wxml", innerContent, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("index.wxml");
        });
    }

    if (css) {
        fs.writeFile(dir + "index.wxss", style, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("index.wxss");
        });
    }

    if (js) {
        fs.writeFile(dir + "index.js", js, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("index.js");
        });
    }
}