var express = require('express');
const fs = require("fs");
var multer = require('multer');
const path = require('path');
var router = express.Router();

let fileName = ["./public/database/participants.json","./public/database/paintings.json","./public/database/settings.json","./public/database/map.json"];
let fileContent = fs.readFileSync(fileName[0], "utf8");
let participants = JSON.parse(fileContent);
fileContent = fs.readFileSync(fileName[1], "utf8");
let paintings = JSON.parse(fileContent);
fileContent = fs.readFileSync(fileName[2], "utf8");
let settings = JSON.parse(fileContent);
fileContent = fs.readFileSync(fileName[3], "utf8");
let ymap = JSON.parse(fileContent);



let name = "";
const storage = multer.diskStorage({
    destination:(req, file, cd)=>{
       cd(null, './public/paintings')
    },
    filename:(req,  file, cb)=>{
       cb(null, (name)+path.extname(file.originalname))
    }
 });
 
 const upload = multer({
    storage,
    limits:{fileSize: 10*1024*1024},
    fileFilter:(req, file, cb)=>{
       const ext = path.extname(file.originalname);
       if(ext!=='.jpg'){
          const er = new Error('Extencion');
          er.code = 'extencion';
          return cb(er);
       }
       cb(null, true);
    }
 }).single('file');

router.get('/', function(req, res, next) {
    res.render('authorization', {participants:participants});
});

router.get('/main', (req, res) => {
    res.render('main');
});

router.get('/paintings',(req, res) => {
    res.render('paintings',{paintings:paintings});
});

router.get('/auction', (req,res)=>{
    res.render('auction');
})

router.get('/participants',(req, res) => {
    res.render('participants',{participants:participants, ymap:ymap});
});

router.get('/settings',(req, res) => {
    res.render('settings',{settings:settings});
});

router.put('/settings',(req,res)=>{
    settings = req.body;
    let json = JSON.stringify(settings, null, '\t');
    fs.writeFileSync(fileName[2], json);
    res.send({settings:settings});
})

router.get('/participants/data.json',(req, res) => {
    res.send({type:"FeatureCollection", features:ymap.features});
});

router.get('/data.json',(req, res) => {
    res.send({type:"FeatureCollection", features:ymap.features});
});

router.get('/paintings/:id', (req, res, next) =>{
    let id = req.params.id;
    const index = paintings.map((p) => {
        return parseInt(p.id);
    }).indexOf(parseInt(id));
    res.render('painting', {painting: paintings[index]});
});

router.put('/paintings/:id', function(req, res, next) {
    const painting = req.body;
    const id = req.params.id;
    const index = paintings.map((b) => {
        return parseInt(b.id);
    }).indexOf(parseInt(id));
    paintings[index] = painting;


    let json = JSON.stringify(participants, null, '\t');
    fs.writeFileSync(fileName[0], json)
    res.send({painting : paintings[index]});
});

router.get('/participants/:id', (req, res, next) =>{
    let id = req.params.id;
    const index = participants.map((p) => {
        return parseInt(p.id);
    }).indexOf(parseInt(id));
    res.render('participant', {participant: participants[index]});
});


router.post('/participants', (req, res) => {
    const body = req.body;
    const ids = participants.map((p) => {
        if (p.id)
            return parseInt(p.id);
        else
            return 0;
    });
    let participant = {id: 0, name: body.name, location:body.location, inAuc: "No", coord: {x:0,y:0}};
    participant.id = ids[ids.length - 1] + 1;
    participants[participants.length] = participant;
    let mapItem = {
        type:"Feature",
        id:ids[ids.length - 1] + 1, 
        geometry:
        {
            coordinates:[undefined, undefined],
            type:"Point"
        },
        properties:
        {
            description:`Location of ${participant.name}`,
            iconCaption: participant.name,
            "iconContent": "5",
            "marker-color":"#1e98ff"
        }
    }
    ymap.features[ymap.features.length] = mapItem;
    let jsonP = JSON.stringify(participants, null, '\t');
    fs.writeFileSync(fileName[0], jsonP);
    let jsonM = JSON.stringify(ymap, null, '\t');
    fs.writeFileSync(fileName[3], jsonM);
    res.send({participant:participant});
});

router.post('/paintings', (req, res) => {
    const painting = req.body;
    painting.id = paintings[paintings.length - 1].id + 1;
    name = painting.id;
    painting.inAuction = "No";
    paintings[paintings.length] = painting;
    let jsonP = JSON.stringify(paintings, null, '\t');
    fs.writeFileSync(fileName[1], jsonP);
    res.send({painting:painting});
});

router.post('/paint', (req, res)=>{
    const id = paintings[paintings.length-1].id;
    upload(req, res, err=>{
        res.json()
    });
    res.status(200);
    res.send({painting:paintings[paintings.length-1]});
 });

 router.post('/paint/:id', (req, res)=>{
    const id = req.params.id;
    name = id;
    const painting = paintings.filter((e)=>{
        return e.id == id;
     });
    upload(req, res, err=>{
        res.json()
    });
    res.status(200);
    console.log(painting);
    res.send({painting:painting});
 });

 router.get('/:id'+'.jpg', (req, res)=>{
    let id = req.params.id;
    console.log(__dirname);
    res.sendFile(path.resolve(__dirname+'/../public/paintings/'+id+'.jpg'));
 });

router.post('/main', (req, res) => {
    const body = req.body;
    let user = body.name;
    if(sanityCheck(user)) {
        res.send({book:body.book});
    } else {
        res.send( 'Книга не добавлена: данные некорректны');
    }
});

router.put('/participants/:id', function(req, res, next) {
    const participant = req.body;
    const id = req.params.id;

    const index = participants.map((b) => {
        return parseInt(b.id);
    }).indexOf(parseInt(id));
    participants[index] = participant;
    ymap.features[index].geometry.coordinates[0] = participant.coord.x;
    ymap.features[index].geometry.coordinates[1] = participant.coord.y;
    let json = JSON.stringify(participants, null, '\t');
    fs.writeFileSync(fileName[0], json)
    let jsonM = JSON.stringify(ymap, null, '\t');
    fs.writeFileSync(fileName[3], jsonM);
    res.send({participant : participants[index]});
});

router.delete('/participants/:id', (req, res) => {
    const removeIndex = participants.map((с) => {
        return parseInt(с.id);
    }).indexOf(parseInt(req.params.id));
    participants.splice(removeIndex, 1);
    ymap.features.splice(removeIndex, 1);
    let json = JSON.stringify(participants, null, '\t');
    fs.writeFileSync(fileName[0], json)
    let jsonM = JSON.stringify(ymap, null, '\t');
    fs.writeFileSync(fileName[3], jsonM);
});

router.delete('/paintings/:id', (req, res) => {
    let id = req.params.id;
    const removeIndex = paintings.map((book) => {
        return parseInt(book.id);
    }).indexOf(parseInt(id));
    paintings.splice(removeIndex, 1);
    let json = JSON.stringify(paintings, null, '\t');
    fs.writeFileSync(fileName[1], json)
});
module.exports = router;