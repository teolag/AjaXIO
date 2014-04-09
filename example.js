


Ajax.get2JSON("example_callback.php", "action=getPersonAsJSON&userId=4", callback1);

function callback1(json) {
	console.log("Callback 1", json);
}





var saveForm = document.getElementById("saveForm");
var formData = new FormData(saveForm);

Ajax.post2JSON("example_callback.php?action=savePersonReturnJSON", formData, callback2);

function callback2(json) {
	console.log("Callback 2", json);
}




Ajax.get("example_callback.php", "action=getHTML", callback3);

function callback3(response) {
	console.log("Callback 3", response);
}