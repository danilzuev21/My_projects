"use strict";

var socket = io.connect('http://localhost:3000');
$('document').ready(function () {
  var participants;
  var paintings;
  var settings;
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/auc',
    success: function success(res) {
      console.log(res);
      participants = res.participants;
      paintings = res.paintings;
      settings = res.settings;
      var str;

      if (Math.floor(settings.duration % 60 / 10) == 0) {
        str = '0' + settings.duration % 60;
      } else {
        str = settings.duration % 60;
      }

      $('#time').text('0:00/' + Math.floor(settings.duration / 60) + ':' + str);
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
  $("#backMain").on('click', function () {
    window.location.href = '/main';
  });
  $('#send').on('click', function () {
    socket.emit('chat message', $('#m').val());
    $('#m').val("");
  });
  var username1 = localStorage.getItem('lab3.username');

  if (username1 === "") {
    $("#username").text("Guest");
    $("#auth").html("Log in");
    $("#auth").on("click", function () {
      window.location.href = '/';
    });
  } else {
    socket.emit('usernameAuc', username1);
    socket.on('identificationAuc', function (res) {
      if (res === 'error') {
        window.location.href = '/';
      } else {
        $("#username").text(username1);
        $("#auth").html("Log out");
        $("#auth").on("click", function () {
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
            $("#backMain").on('click', function () {
              window.location.href = '/main';
            });
          }
        }
      }
    });
  }

  socket.on('time', function (msg) {
    $("#time").text(msg);
    console.log(msg);
  });
  socket.on('betAns', function (res) {
    if (res != "notStarted") {
      if (res === 'error') {
        alert('Bet is improper');
      } else {
        $('#cur').text(res);
        $('<li>').text(res).hide().appendTo('#messages').slideDown(200);
      }
    }
  });
  socket.on('msg', function (msg) {
    $('<li>').text(msg).hide().appendTo('#messages').slideDown(200);
  });
  $("input").on('keypress', function (e) {
    if (e.which == 13) {
      socket.emit('chat message', $('#m').val());
      $('#m').val("");
    }
  });
});

function admin() {
  var start;
  var time = 0;
  var isStarted = false;
  var interval = 0;
  $('body').append("<button id='startButton'>Start auction</button>");
  $('body').append("<button id='backMain'>Back to menu</button>");
  $('#startButton').on('click', function () {
    console.log('start');
    socket.emit('timer', 'start');
    isend = false;
    isStarted = true;
    start = new Date();
    var m = 0;
    time = 0;
    return false;
  });
  $("#backMain").on('click', function () {
    window.location.href = '/main';
  });
}

function notAdmin() {
  var div = document.createElement("div");
  div.id = "betID";
  $('body').append(div);
  $('#betID').append('<input type="number" id="bet" placeholder="Bet"></input>');
  $('#betID').append('<button id="makeBet">Make bet</button>');
  $('#makeBet').on('click', function () {
    var value = $('#bet').val();
    socket.emit('bet', value);
  });
  socket.emit('minMax', 'get');
  socket.on('minMaxRes', function (res) {
    $("#bet").change(function () {
      var max = res.max;
      var min = res.min;

      if ($(this).val() > max) {
        $(this).val(max);
      } else if ($(this).val() < min) {
        $(this).val(min);
      }
    });
  });
  $('body').append("<button id='backMain'>Back to menu</button>");
  $("#backMain").on('click', function () {
    window.location.href = '/main';
  });
}

var createInput = function createInput(type, id) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
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