$('document').ready(()=>{
    $('body').on('click','li[data-href]', function (e){
        window.location = $(this).attr('data-href');
    });
    let socket = io.connect('http://localhost:3030');
    let username1 = localStorage.getItem('lab3.username');
    if(username1 === ""){
        $("#username").text("Guest");
        $("#auth").html("Log in");
        $("#auth").on("click", ()=>{
            window.location.href = '/';
        });
        notAdmin();
    } else {
        socket.emit('username', username1);
        
        socket.on('identification',(res)=>{
            if(res === 'error'){
                window.location.href = '/';
            } else{
                if(res === "admin"){
                    admin();
                } else {
                    notAdmin();
                }
                $("#username").text(username1);
                $("#auth").html("Log out");
                $("#auth").on("click", ()=>{
                    localStorage.setItem('lab3.username', "");
                    window.location.href = '/';
                });
            }
        });
    }
    
});
function admin(){
    $("#buttons").append("<td><button id='addButton'>Add participant</button></td>")
    $("#buttons").append("<td><button id='backMain'>Back to menu</button></td>")
    $('#addButton').on('click', ()=>{
        showPopup();
    });
    $('#close_popup').on('click', ()=>{
        hidePopup();
    });
    $('#submit').on('click',()=>{
        add();
        hidePopup();
    });
    $('#backMain').on('click', ()=>{
        window.location = "http://localhost:3000/main";
    });
}
function notAdmin(){
    $("#buttons").append("<td><button id='backMain'>Back to menu</button></td>")
    $('#backMain').on('click', ()=>{
        window.location = "http://localhost:3000/main";
    });
}
ymaps.ready()
            .done(function (ym) {
                var myMap = new ym.Map('YMapsID', {
                    center: [55.751574, 37.573856],
                    zoom: 10
                }, {
                    searchControlProvider: 'yandex#search'
                });
                $.getJSON('data.json', function (json) {
                    /** Сохраним ссылку на геообъекты на случай, если понадобится какая-либо постобработка.
                    * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult.xml
                    */
                    var geoObjects = ym.geoQuery(json)
                            .addToMap(myMap)
                            .applyBoundsToMap(myMap, {
                                checkZoomRange: true
                            });
                });
            });
function add(){
    let participant = {name : 0, location : 0};
    participant.name = $('#p_name').val();
    participant.location = $('#p_location').val();
    if(participant.name != "" && participant.location != ""){
        $.ajax({
            type:'post',
            url:'/participants',
            data: participant,
            success: (res) => {
                $('<li>', { "data-href":'https://localhost:3000/participants/'+res.participant.id, "data-id":res.participant.id, text:res.participant.name}).appendTo('ul');
            }
        });
    } else {
        alert("Input name and location of participant")
    }
}

function hidePopup() {
    $("#YMapsID").css('display', 'block');
    $("#addPainting").css('display','none');
}

function showPopup() {
    $("#YMapsID").css('display', 'none');
    $("#addPainting").css('display','block');
}