generate_table();

function generate_table() {
	var body = document.getElementsByTagName("body")[0];
	var tbl = document.createElement("table");
	var tblBody = document.createElement("tbody");
	let records = undefined;
	if (localStorage["ducks.records"]) {
		records = JSON.parse(localStorage["ducks.records"]);
	}
	let row = document.createElement("tr");
	var cell = document.createElement("th");
	var cellText = document.createTextNode("Username");
	cell.appendChild(cellText);
	row.appendChild(cell);
	var cell = document.createElement("th");
	var cellText = document.createTextNode("Score");
	cell.appendChild(cellText);
	row.appendChild(cell);
	tblBody.appendChild(row);
	if (records) {
		for (var i = 0; i < records.length; i++) {
			let row1 = document.createElement("tr");
			var cell = document.createElement("td");
			cell.appendChild(document.createTextNode(records[i].name));
			row1.appendChild(cell);
			cell = document.createElement("td");
			if (records[i].score != "None") {
				cell.appendChild(document.createTextNode(Math.round(records[i].score)));
			} else {
				cell.appendChild(document.createTextNode("None"));
			}
			row1.appendChild(cell);
			tblBody.appendChild(row1);
		}
	} else {
		let row1 = document.createElement("tr");
		var cell = document.createElement("td");
		cell.appendChild(document.createTextNode("None"));
		row1.appendChild(cell);
		cell = document.createElement("td");
		cell.appendChild(document.createTextNode("None"));
		row1.appendChild(cell);
		tblBody.appendChild(row1);
	}
	tbl.appendChild(tblBody);
	body.appendChild(tbl);
	// creating buttons
	let tableButtons = document.createElement("table");
	row = document.createElement("tr");
	var cell = document.createElement("td");
	var button = document.createElement("button");
	button.innerHTML = "Replay";
	button.onclick = () => {
		window.location.href = "main.html";
	};
	cell.appendChild(button);
	row.appendChild(cell);
	var button = document.createElement("button");
	button.innerHTML = "Main menu";
	button.onclick = () => {
		window.location.href = "menu.html";
	};
	cell.appendChild(button);
	row.appendChild(cell);
	tableButtons.appendChild(row);
	body.appendChild(tableButtons);
	tbl.setAttribute("border", "2");
}
