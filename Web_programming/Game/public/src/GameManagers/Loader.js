function getReq(url, onsuccess, resType = 'text') {
	let xhr = new XMLHttpRequest();
	xhr.onerror = () => { console.log(this.statusText);}
	xhr.open("GET", "http://localhost:80/"+url);
	if (resType)
		xhr.responseType = resType;
	xhr.onreadystatechange = function() {
		if ((xhr.readyState == 4) && (xhr.status == 200))
  			onsuccess(xhr);
	}
	xhr.send();
}
