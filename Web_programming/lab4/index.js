const express = require('express');
const app = express();
const fs = require("fs");
const path = require('path');
let socket = require('socket.io');
const http = require('http');
var logger = require('morgan');
var Rollbar = require("rollbar");
var multer = require('multer');
var router = express.Router();

var rollbar = new Rollbar({
    accessToken: 'f927008e453a4b3babd5c4a10f40508f',
    captureUncaught: true,
    captureUnhandledRejections: true
});
const port = 3000;
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.set('views', path.join(__dirname, 'pug_files'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

let server = http.createServer(app).listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

let fileName = ["./public/database/participants.json", "./public/database/paintings.json", "./public/database/settings.json", "./public/database/map.json"];
let fileContent = fs.readFileSync(fileName[0], "utf8");
let participants = JSON.parse(fileContent);
fileContent = fs.readFileSync(fileName[1], "utf8");
let paintings = JSON.parse(fileContent);
fileContent = fs.readFileSync(fileName[2], "utf8");
let settings = JSON.parse(fileContent);
fileContent = fs.readFileSync(fileName[3], "utf8");
let ymap = JSON.parse(fileContent);
let paintInAuc;
for (let i = 0; i < paintings.length; i++) {
    if (paintings[i].inAuction === "Yes") {
        paintInAuc = i;
        break;
    }
}
console.log(paintInAuc);
let lastUser;
let lastBet = 0;
let isStarted = false;
let interval;


let io = socket.listen(server);
io.sockets.on('connection', (socket) => {

    socket.on('chat message', function(msg){
        if(msg!=""){
            d = new Date();
            io.emit('msg', socket.username+'('+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'):'+msg);
        }
    });

    socket.on('username', function (username) {
        if (check(username)) {
            socket.username = username;
            socket.emit('identification', username);
            console.log(socket.username);
        } else {
            rollbar.log('ERROR with id');
            socket.emit('identification', "error");
        }
    });
    socket.on('usernameAuc', function (username) {
        if (check(username)) {
            socket.username = username;
            if (username === "admin") {
                socket.emit('identificationAuc', username);
            } else {
                participant = participants.filter((n) => {
                    return n.name === username
                });
                if (participant[0].inAuc === "Yes") {
                    socket.emit('identificationAuc', 'inAuc');
                } else {
                    socket.emit('identificationAuc', 'notInAuc');
                }
            }
        } else {
            rollbar.log('ERROR with id');
            socket.emit('identificationAuc', "error");
        }
    });

    socket.on('timer', function (data) {
        try {
            if (isStarted == false) {
                isStarted = true;
                socket.painting = paintInAuc;
                let str;
                if (Math.floor(settings.duration % 60 / 10) == 0) {
                    str = '0' + settings.duration % 60;
                } else {
                    str = settings.duration % 60;
                }
                let duration = Math.floor(settings.duration / 60) + ':' + str;
                let time = 0;
                interval = setInterval(function () {
                    let str_t;
                    if (Math.floor(time % 60 / 10) == 0) {
                        str_t = '0' + time % 60;
                    } else {
                        str_t = time % 60;
                    }
                    let timeStr = Math.floor(time / 60) + ':' + str_t
                    time++;
                    let res_str = timeStr + '/' + duration;
                    io.emit('time', res_str);
                    if (time > settings.duration) {
                        res_str = '0:00/' + duration;
                        io.emit('time', res_str);
                        isStarted = false;
                        participant = participants.filter((n) => {
                            return n.name === lastUser;
                        });

                        if (participant.length != 0) {
                            participant[0].paintings.push(paintings[paintInAuc]);
                            participant[0].money = Number(participant[0].money) - Number(lastBet);
                            paintings[paintInAuc].isSold = "Yes";
                            paintings[paintInAuc].inAuction = "No";
                            io.emit('betAns', "Painting " + paintings[paintInAuc].name +' '+ paintings[paintInAuc].author + " is sold to " + participant[0].name);
                            lastBet = undefined;
                            lastUser = undefined;
                            for (let i = 0; i < paintings.length; i++) {
                                if (paintings[i].inAuction === "Yes") {
                                    paintInAuc = i;
                                    break;
                                }
                            }
                            io.emit('end');
                            let jsonP = JSON.stringify(paintings, null, '\t');
                            fs.writeFileSync(fileName[1], jsonP);
                            let json = JSON.stringify(participants, null, '\t');
                            fs.writeFileSync(fileName[0], json);
                        } else{
                            io.emit('betAns', "No one win");
                        }
                        interval = clearInterval(interval);
                    }
                }, 1000);
            }
        }
        catch (e) {
            console.log(e);
            rollbar.log(e);
        }
    });
    socket.on('bet', (bet) => {
        let username = socket.username;
        if (isStarted == false) {
            io.emit('betAns', 'notStarted');
        } else {
            participant = participants.filter((n) => {
                return n.name === username
            });
            if (Number(bet) > participant[0].money || bet <= lastBet || bet < paintings[paintInAuc].price) {
                socket.emit('betAns', 'error');
            } else {
                let msg = socket.username + ': bet is $' + bet;
                lastBet = Number(bet);
                lastUser = socket.username;
                io.emit('betAns', msg);
            }
        }
    });
    socket.on('minMax', (e) => {
        io.emit('minMaxRes', { min: paintings[paintInAuc].min, max: paintings[paintInAuc].max });
    });
});




let name = "";
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './public/paintings')
    },
    filename: (req, file, cb) => {
        cb(null, (name) + path.extname(file.originalname))
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg') {
            const er = new Error('Extencion');
            er.code = 'extencion';
            return cb(er);
        }
        cb(null, true);
    }
}).single('file');

router.get('/', function (req, res, next) {
    res.render('authorization', { participants: participants });
});

router.get('/main', (req, res) => {
    res.render('main');
});

router.get('/paintings', (req, res) => {
    res.render('paintings', { paintings: paintings });
});

router.get('/auction', (req, res) => {
    res.render('auction');
})

router.get('/auc', (req, res) => {
    res.send({ participants: participants, painting: paintings[paintInAuc], settings: settings });
})

router.get('/participants', (req, res) => {
    res.render('participants', { participants: participants, ymap: ymap });
});

router.get('/settings', (req, res) => {
    res.render('settings', { settings: settings });
});

router.put('/settings', (req, res) => {
    settings = req.body;
    let json = JSON.stringify(settings, null, '\t');
    fs.writeFileSync(fileName[2], json);
    res.send({ settings: settings });
})

router.get('/participants/data.json', (req, res) => {
    res.send({ type: "FeatureCollection", features: ymap.features });
});

router.get('/data.json', (req, res) => {
    res.send({ type: "FeatureCollection", features: ymap.features });
});

router.get('/paintings/:id', (req, res, next) => {
    let id = req.params.id;
    const index = paintings.map((p) => {
        return parseInt(p.id);
    }).indexOf(parseInt(id));
    res.render('painting', { painting: paintings[index] });
});

router.put('/paintings/:id', function (req, res, next) {
    const painting = req.body;
    const id = req.params.id;
    const index = paintings.map((b) => {
        return parseInt(b.id);
    }).indexOf(parseInt(id));
    paintings[index] = painting;


    let json = JSON.stringify(participants, null, '\t');
    fs.writeFileSync(fileName[0], json)
    res.send({ painting: paintings[index] });
});

router.get('/participants/:id', (req, res, next) => {
    let id = req.params.id;
    const index = participants.map((p) => {
        return parseInt(p.id);
    }).indexOf(parseInt(id));
    res.render('participant', { participant: participants[index] });
});


router.post('/participants', (req, res) => {
    const body = req.body;
    const ids = participants.map((p) => {
        if (p.id)
            return parseInt(p.id);
        else
            return 0;
    });
    let participant = { id: 0, name: body.name, location: body.location, inAuc: "No", coord: { x: 0, y: 0 } };
    participant.id = ids[ids.length - 1] + 1;
    participants[participants.length] = participant;
    let mapItem = {
        type: "Feature",
        id: ids[ids.length - 1] + 1,
        geometry:
        {
            coordinates: [undefined, undefined],
            type: "Point"
        },
        properties:
        {
            description: `Location of ${participant.name}`,
            iconCaption: participant.name,
            "iconContent": "5",
            "marker-color": "#1e98ff"
        }
    }
    ymap.features[ymap.features.length] = mapItem;
    let jsonP = JSON.stringify(participants, null, '\t');
    fs.writeFileSync(fileName[0], jsonP);
    let jsonM = JSON.stringify(ymap, null, '\t');
    fs.writeFileSync(fileName[3], jsonM);
    res.send({ participant: participant });
});

router.post('/paintings', (req, res) => {
    const painting = req.body;
    painting.id = paintings[paintings.length - 1].id + 1;
    name = painting.id;
    painting.inAuction = "No";
    paintings[paintings.length] = painting;
    let jsonP = JSON.stringify(paintings, null, '\t');
    fs.writeFileSync(fileName[1], jsonP);
    res.send({ painting: painting });
});

router.post('/paint', (req, res) => {
    const id = paintings[paintings.length - 1].id;
    upload(req, res, err => {
        res.json()
    });
    res.status(200);
    res.send({ painting: paintings[paintings.length - 1] });
});

router.post('/paint/:id', (req, res) => {
    const id = req.params.id;
    name = id;
    const painting = paintings.filter((e) => {
        return e.id == id;
    });
    upload(req, res, err => {
        res.json()
    });
    res.status(200);
    res.send({ painting: painting });
});

router.get('/:id' + '.jpg', (req, res) => {
    let id = req.params.id;
    res.sendFile(path.resolve(__dirname + '/public/paintings/' + id + '.jpg'));
});

router.post('/main', (req, res) => {
    const body = req.body;
    let user = body.name;
    if (sanityCheck(user)) {
        res.send({ book: body.book });
    } else {
        res.send('Книга не добавлена: данные некорректны');
    }
});

router.put('/participants/:id', function (req, res, next) {
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
    for (let i = 0; i < paintings.length; i++) {
        if (paintings[i].inAuction === "Yes") {
            paintInAuc = i;
            break;
        }
    }
    res.send({ participant: participants[index] });
});

router.delete('/participants/:id', (req, res) => {
    const removeIndex = participants.map((book) => {
        return parseInt(book.id);
    }).indexOf(parseInt(req.params.id));
    participants.splice(removeIndex, 1);
    ymap.features.splice(removeIndex, 1);
    let json = JSON.stringify(participants, null, '\t');
    fs.writeFileSync(fileName[0], json);
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
    fs.writeFileSync(fileName[1], json);
    for (let i = 0; i < paintings.length; i++) {
        if (paintings[i].inAuction === "Yes") {
            paintInAuc = i;
            break;
        }
    }
});
function check(name) {
    if (name === "admin")
        return true;
    if (participants.filter((n) => {
        return n.name === name
    }).length == 0) {
        return false;
    }
    return true;
}