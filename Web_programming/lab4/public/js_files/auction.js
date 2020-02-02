let socket = io.connect('http://localhost:3000');
$('document').ready(() => {
    let participant;
    let painting;
    let settings;
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/auc',
        success: function (res) {
            console.log(res);
            participant = res.participants.filter((n) => {
                return n.name === localStorage.getItem('lab3.username')
            });
            painting = res.painting;
            settings = res.settings;
            let str;
            if (Math.floor(settings.duration % 60 / 10) == 0) {
                str = '0' + settings.duration % 60;
            } else {
                str = settings.duration % 60;
            }
            $('#time').text('0:00/' + Math.floor(settings.duration / 60) + ':' + str);
            $('#p_name').text(painting.name);
            $('#p_author').text(painting.author);
            $('#p_price').text('Price: $'+painting.price);
            $('#money').text('Money: $'+participant[0].money);
        }
    });
    $('#mainchat').draggable();
    $('#mainchat').resizable({
        alsoResize: "#chat",
        minWidth: 300,
        maxWidth: 300,
        minHeight: 200,
        maxHeigth: 500
    });
    $("#backMain").on('click', () => {
        window.location.href = '/main';
    })
    $('#send').on('click', ()=>{
        socket.emit('chat message', $('#m').val());
        $('#m').val("");
    })
    let username1:?string = localStorage.getItem('lab3.username');
    if (username1 === "") {
        $("#username").text("Guest");
        $("#auth").html("Log in");
        $("#auth").on("click", () => {
            window.location.href = '/';
        });
    } else {
        socket.emit('usernameAuc', username1);
        socket.on('identificationAuc', (res) => {
            if (res === 'error') {
                window.location.href = '/';
            } else {
                $("#username").text(username1);
                $("#auth").html("Log out");
                $("#auth").on("click", () => {
                    localStorage.setItem('lab3.username', "");
                    window.location.href = '/';
                });
                if (res === "admin") {
                    admin();
                } else {
                    if (res === "inAuc") {
                        notAdmin();
                    } else {
                        $('body').append("<button id='backMain'>Back to menu</button>");
                        $("#backMain").on('click', () => {
                            window.location.href = '/main';
                        })
                    }
                }

            }
        });
    }
    socket.on('time', function (msg) {
        $("#time").text(msg);
    });
    socket.on('betAns', (res) => {
        if (res != "notStarted") {
            if (res === 'error') {
                alert('Bet is improper')
            } else {
                $('#cur').text(res);
                ($('<li>').text(res)).hide().appendTo('#messages').slideDown(200);
            }
        }
    })
    socket.on('msg', (msg)=>{
        ($('<li>').text(msg)).hide().appendTo('#messages').slideDown(200);
    })
    $("input").on('keypress', function(e){
        if(e.which == 13){
            socket.emit('chat message', $('#m').val());
            $('#m').val("");
        }
    })
})
function admin() {
    let start;
    let time = 0;
    let isStarted = false;
    let interval = 0;
    $('body').append("<button id='startButton'>Start auction</button>");
    $('body').append("<button id='backMain'>Back to menu</button>");
    $('#startButton').on('click', () => {
        socket.emit('timer', 'start');
        return false;
    });
    $("#backMain").on('click', () => {
        window.location.href = '/main';
    })
}
function notAdmin() {
    let div = document.createElement("div");
    div.id = "betID";
    $('body').append(div);
    $('#betID').append('<input type="number" id="bet" placeholder="Bet"></input>');
    $('#betID').append('<button id="makeBet">Make bet</button>');
    $('#makeBet').on('click', () => {
        let value = $('#bet').val();
        socket.emit('bet', value);

    });
    socket.emit('minMax', 'get');
    socket.on('minMaxRes', (res) => {
        $("#bet").change(function () {
            var max = res.max;
            var min = res.min;
            if ($(this).val() > max) {
                $(this).val(max);
            }
            else if ($(this).val() < min) {
                $(this).val(min);
            }
        });
    })
    $('body').append("<button id='backMain'>Back to menu</button>");
    $("#backMain").on('click', () => {
        window.location.href = '/main';
})
}
const createInput = function (type, id, value = 0) {
    var input = document.createElement("input");
    input.type = type;
    input.id = id;
    if (type === 'text') {
        input.placeholder = value;
    }
    if (type === "radio") {
        input.value = 'value';
    }
    return input;
};