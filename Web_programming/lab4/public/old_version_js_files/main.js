"use strict";

//@flow
$('document').ready(function () {
  var socket = io.connect('http://localhost:3000');
  $("#part").on('click', function () {
    window.location.href = '/participants';
  });
  $("#img").on('click', function () {
    window.location.href = '/paintings';
  });
  $("#auc").on('click', function () {
    window.location.href = '/auction';
  });
  $("#set").on('click', function () {
    window.location.href = '/settings';
  });
  var username = localStorage.getItem('lab3.username');

  if (username === "") {
    $("#username").text("Guest");
    $("#auth").html("Log in");
    $("#auth").on("click", function () {
      window.location.href = '/';
    });
  } else {
    socket.emit('username', username);
    socket.on('identification', function (res) {
      if (res === 'error') {
        window.location.href = '/';
      }
    });
    $("#username").text(username);
    $("#auth").html("Log out");
    $("#auth").on("click", function () {
      localStorage.setItem('lab3.username', "");
      window.location.href = '/';
    });
  }
});