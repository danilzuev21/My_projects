function init() {
	name = localStorage["ducks.username"];
	if (name)
		document.getElementsByName("username")[0].value=localStorage["ducks.username"];

}
function storeName(newName) {
  localStorage["ducks.username"] = newName;
}
function getName() {
  return localStorage["ducks.username"];
}
