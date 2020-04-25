const fs = require("fs");
const path = require("path");

const code = fs.readFileSync(path.join(__dirname, "../public/index.html"))
const p = path.join(__dirname, "../public/");


const htmlBuilder = (name, filetype, pathp, code)=>{
    name = name+filetype
    fs.writeFileSync(pathp+name, code.toString())
}
// htmlBuilder("about", ".html",p, code);
// htmlBuilder("help", ".html", p, code);
// htmlBuilder("styles",".css",p, "")
