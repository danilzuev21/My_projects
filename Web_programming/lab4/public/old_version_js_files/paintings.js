"use strict";

$('document').ready(function () {
  $('body').on('click', 'li[data-href]', function (e) {
    window.location = $(this).attr('data-href');
  });
  var socket = io.connect('http://localhost:3000');
  var username1 = localStorage.getItem('lab3.username');

  if (username1 === "") {
    $("#username").text("Guest");
    $("#auth").html("Log in");
    $("#auth").on("click", function () {
      window.location.href = '/';
    });
    notAdmin();
  } else {
    socket.emit('username', username1);
    socket.on('identification', function (res) {
      if (res === 'error') {
        window.location.href = '/';
      } else {
        if (res === "admin") {
          admin();
        } else {
          notAdmin();
        }

        $("#username").text(username1);
        $("#auth").html("Log out");
        $("#auth").on("click", function () {
          localStorage.setItem('lab3.username', "");
          window.location.href = '/';
        });
      }
    });
  }
});

function admin() {
  $("#buttons").append("<td><button id='addButton'>Add painting</button></td>");
  $("#buttons").append("<td><button id='backMain'>Back to menu</button></td>");
  $('#addButton').on('click', function () {
    showPopup();
  });
  $('#close_popup').on('click', function () {
    hidePopup();
  });
  $('#submit').on('click', function () {
    add();
    hidePopup();
  });
  $('#backMain').on('click', function () {
    window.location = "http://localhost:3000/main";
  });
}

function notAdmin() {
  $("#buttons").append("<td><button id='backMain'>Back to menu</button></td>");
  $('#backMain').on('click', function () {
    window.location = "http://localhost:3000/main";
  });
}

function add() {
  var painting = {
    name: 0,
    author: 0,
    date: ""
  };
  painting.name = $('#paint_name').val();
  painting.author = $('#paint_author').val();

  if (painting.name != "" && painting.author != "") {
    $.ajax({
      type: 'post',
      url: document.location.href,
      data: painting,
      success: function success(res) {
        var painting = res.painting;
        $('<li>', {
          "data-href": 'http://localhost:3000/paintings/' + painting.id,
          "data-id": painting.id,
          text: '«' + painting.name + '»' + ' ' + painting.author
        }).appendTo('ul');
      }
    });
    var fd = new FormData();
    var files = $('#file')[0].files[0];
    fd.append('file', files);
    file = $("#file").val();
    $.ajax({
      type: 'post',
      url: 'http://localhost:3000/paint',
      data: fd,
      processData: false,
      contentType: false,
      success: function success(res) {
        var painting = res.painting;
        console.log(res); //et objectURL = URL.createObjectURL(e);

        d = new Date();
        $("#image").removeAttr("src").attr("src", "http://localhost:3000/" + painting.id + '.jpg' + '?' + d.getTime());
      }
    });
  } else {
    alert("Input name and author of painting");
  }
}

function hidePopup() {
  $("#addPainting").css('display', 'none');
}

function showPopup() {
  $("#addPainting").css('display', 'block');
}