"use strict";

var _this = void 0;

$(document).ready(function () {
  $('#editButton').on('click', function () {
    $(_this).prop('disabled', true);
    $('#deleteButton').prop('disabled', true);
    $('#p_table').deleteRow(1);
    var row = $('#p_table').insertRow(1);
    row.insertCell().appendChild(createInput('text', 'p_name', 'Input name')).value = p.name;
    row.insertCell().appendChild(createInput('text', 'p_location', 'Input location')).value = p.location;
    row.insertCell().appendChild(createInput('text', 'p_in', 'Takes part?')).value = p.inAuc;
    row.insertCell().appendChild(createInput('number', 'p_x', 'x coord')).value = p.coords.x;
    row.insertCell().appendChild(createInput('number', 'p_y', 'y coord')).value = p.coords.y;
    var done = row.insertCell();
    done.innerText = '✓';
    done.style.cursor = 'pointer';
    done.style = "border-radius: 50px;cursor:pointer;font-weight:bold;";

    done.onclick = function () {
      p.name = $('#p_name').val();
      p.location = $('#p_location').val();
      p.inAuc = $('#p_in').val();

      if (p.name != "" && p.location != "" && (p.inAuc === "Yes" || p.inAuc === "No")) {
        p.coords.x = $('#p_x').val();
        p.coords.y = $('#p_coords.x').val();
        send(b);
        $(this).prop('disabled', true);
        $('#deleteButton').prop('disabled', true);
      } else {
        alert("Input correct data please!");
      }
    };
  });
  $("#deleteButton").on('click', function () {
    var id = p.id;
    alert("Книга была удалена");
    window.location.href = '/participants';
    $.ajax({
      type: 'delete',
      url: '/participants/' + id
    });
  });

  var send = function send(participant) {
    $.ajax({
      type: 'put',
      url: window.location.href,
      data: participant,
      success: function success(res) {
        var participant = res.participant;

        if (participant) {
          $('#p_table').deleteRow(1);
          var row = $('#p_table').insertRow(1);
          row.insertCell().innerText = participant.name;
          row.insertCell().innerText = participant.location;
          row.insertCell().innerText = participant.inAuc;
          row.insertCell().innerText = 'x: ' + participant.coords.x + ' ' + 'y: ' + participant.coords.y;
        } else {
          alert(res.message ? res.message : "Неизвестная ошибка на стороне сервера");
        }
      }
    });
  };

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
});