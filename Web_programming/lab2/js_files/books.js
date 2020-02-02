function setOnclicks() {
    const table = document.getElementById('books_table');
    let cellsCnt = table.rows[0].cells.length;
    let hcell = table.rows[0].cells[cellsCnt - 1];
    let addButton = document.getElementById('addButton');
    function showPopup() {
        document.getElementById('addBookId').style.display = 'block';
        let popup = document.getElementById('popup');
    }
    function hidePopup() {
        document.getElementById('addBookId').style.display = 'none';
        let popup = document.getElementById('popup');
    }
    const closePopup = document.getElementById('close_popup');
    closePopup.onclick = function () {
        hidePopup();
    }
    addButton.onclick = function () {
        showPopup();
        let submit = document.getElementById('submit');
        submit.onclick = function(){
            add();
            hidePopup();
        }
    };
    function add(){
        let book = {name : 0, author : 0, date: "", available : 0};
        book.name = document.getElementById("book_name").value;
        book.author = document.getElementById("book_author").value;
        book.available ='true';
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            let res = JSON.parse(this.response);
            if (res.book) {
                var row = table.insertRow();
                row.insertCell().innerText = res.book.name;
                row.insertCell().innerText = res.book.author;
                row.insertCell().innerText = res.book.available ? "Да" : "Нет";
                row.insertCell().innerText = res.book.date;
                const cross = row.insertCell();
                cross.innerText = 'Удалить книгу';
                cross.style= "background-color:lightpink; cursor:pointer; color:darkred; font-weight:bold;";
                cross.onclick = remove;
                for (let j = 0; j < 2; j++) {
                    row.cells[j].onclick = function () {
                        window.location.href='/' + res.book.id;
                    }
                    row.cells[j].style.cursor = 'pointer';
                }
            }
            else {
                alert(res.message ? res.message : "Неизвестная ошибка на стороне сервера")
            }

        };
        xhttp.open("POST", '/', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify({book : book}));
    }
    const remove = function () {
        let id = this.parentElement.getAttribute("data-id");
        var xhttp = new XMLHttpRequest();
        this.parentElement.parentElement.removeChild(this.parentElement);
        xhttp.open("DELETE", '/' + id, true);
        xhttp.send(null);
    }
    for (let i = 1; i < table.rows.length; i++) {
        let hrow = table.rows[i];
        let hcell = hrow.cells[hrow.cells.length - 1];
        hcell.style= "background-color:lightpink; cursor:pointer; color:darkred; font-weight:bold;";
        for (let j = 0; j < 2; j++) {
            hrow.cells[j].onclick = function () {
                window.location.href='/' + hrow.getAttribute("data-id");
            }
            hrow.cells[j].style.cursor = 'pointer';
        }
        hrow.cells[hrow.cells.length - 1].onclick = remove;
    }
    table.rows[1].cells[cellsCnt].style= "border-top-right-radius: 5px;background-color:lightpink; cursor:pointer; color:darkred;font-weight:bold;"
    const fst_date = document.getElementById('fst_date');
    const snd_date = document.getElementById('snd_date');
    const filter = document.getElementById('filter');
    const reset = document.getElementById('reset');
    filter.onclick = function(){
        if(!(fst_date.value) || !(snd_date.value)){
            alert('Выберите даты');
            return;
        }
        if((fst_date.value) > (snd_date.value)){
            alert('Первая дата должна быть меньше');
            return;
        }
        for(let i = 1; i<table.rows.length; i++){
            if(!(table.rows[i].cells[3].innerHTML)){
                table.deleteRow(i);
                i--;
                continue;
            }
            if(table.rows[i].cells[3].innerHTML<(fst_date.value) || table.rows[i].cells[3].innerHTML>(snd_date.value)){
                table.deleteRow(i);
                i--;
                continue;
            }
        }
        table.rows[1].cells[4].style= "border-top-right-radius: 5px;background-color:lightpink; cursor:pointer; color:darkred;font-weight:bold;"
    }
    reset.onclick = function(){
        window.location.reload();
    }
    const av = document.getElementById('av');
    const notAv = document.getElementById('not_av');
    const reset1 = document.getElementById('reset1');
    reset1.onclick = function(){
        window.location.reload();
    }
    av.onclick = function(){
        for(let i = 1; i<table.rows.length; i++){
            if(table.rows[i].cells[2].innerHTML === 'Нет'){
                table.deleteRow(i);
                i--;
                continue;
            }
        }
        table.rows[1].cells[4].style= "border-top-right-radius: 5px;background-color:lightpink; cursor:pointer; color:darkred;font-weight:bold;"
    }
    notAv.onclick = function(){
        for(let i = 1; i<table.rows.length; i++){
            if(table.rows[i].cells[2].innerHTML === 'Да'){
                table.deleteRow(i);
                i--;
                continue;
            }
        }
        table.rows[1].cells[4].style= "border-top-right-radius: 5px;background-color:lightpink; cursor:pointer; color:darkred;font-weight:bold;"
    }
}
function setSortIcons(tableId) {
    // Значки для сортировки :
    var sortAsc = document.createElement("SPAN"),
        sortDesc = document.createElement("SPAN");

    // Значки сортировки для заголовка таблицы:
    sortAsc.appendChild(document.createTextNode(String.fromCharCode(Number("9047"))));
    sortDesc.appendChild(document.createTextNode(String.fromCharCode(Number("9040"))));

    let elementTable = document.getElementById(tableId);
    let cellsCnt = elementTable.rows[0].cells.length
    for (let i = 0; i < cellsCnt; i += 1) {
        let hcell = elementTable.rows[0].cells[i];
        if (hcell.type === "td")
            continue;
        let asc = sortAsc.cloneNode(true);
        let dsc = sortDesc.cloneNode(true)
        asc.onclick = function() {sortTable(tableId, i, 'asc')};
        dsc.onclick = function() {sortTable(tableId, i, 'desc')};
        hcell.appendChild(document.createElement("p").appendChild(document.createTextNode(" ")));
        hcell.appendChild(asc);
        hcell.appendChild(document.createElement("p").appendChild(document.createTextNode(" ")));
        hcell.appendChild(dsc);
    }
}
function sortTable(tableId, n, dir) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(tableId);
    switching = true;
    // Set the sorting direction to ascending:
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
        } 
    }
    for (let i = 1; i < table.rows.length; i++) {
        let hrow = table.rows[i];
        let hcell = hrow.cells[hrow.cells.length - 1];
        hcell.style= "background-color:lightpink; cursor:pointer; color:darkred; font-weight:bold;";
    }
    let elementTable = document.getElementById(tableId);
    let cellsCnt = elementTable.rows[0].cells.length
    table.rows[1].cells[cellsCnt].style= "border-top-right-radius: 5px;background-color:lightpink; cursor:pointer; color:darkred;font-weight:bold;"
}