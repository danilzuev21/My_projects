const express = require('express');
const app = express();
const fs = require("fs");
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const port = 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'src')));
app.use('/', router);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const corsOptions = {
  'credentials': true,
  'origin': true,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'allowedHeaders': 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept'
}
app.use(cors());
app.options('*', cors());
//app.use(cors(corsOptions));

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

let fileName = ["./public/Maps/Map1.json", "./public/Maps/Map2.json"];
let fileContent = fs.readFileSync(fileName[0], "utf8");
let Map1 = JSON.parse(fileContent);
//fileContent = fs.readFileSync(fileName[1], "utf8");
//let Map2 = JSON.parse(fileContent);

router.get('/', (req,res)=>{
    res.render("menu.pug");
})

router.get('/main', (req,res)=>{
    res.render("main.pug");
})

router.get('/records', (req,res)=>{
    res.render("records.pug");
})

router.get("/:name"+".json", (req,res)=>{
    let name = req.params.name;
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname+'/public/Maps/'+name+'.json'));
})
router.get("/:name"+".mp3", (req,res)=>{
    let name = req.params.name;
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname+'/public/Sounds/'+name+'.mp3'));
})
router.get("/:picture"+".png", (req,res)=>{
    let picture = req.params.picture;
    res.sendFile(path.resolve(__dirname+'/public/Maps/Textures/'+picture+'.png'));
})