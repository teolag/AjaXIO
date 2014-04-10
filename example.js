
var saveForm = document.getElementById("saveForm");
var formData = new FormData(saveForm);



var ex1 = 'Ajax.get2JSON("example_callback.php", "action=getPersonAsJSON&userId=4", showResult)';
eval(ex1);


var ex2 = 'Ajax.post2JSON("example_callback.php?action=savePersonReturnJSON", formData, showResult)';
eval(ex2);

var ex3 = 'Ajax.get("example_callback.php", "action=getHTML", showResult)';
eval(ex3);

var ex3 = 'Ajax.post("example_callback.php?action=saveSettings", {value:33, type:"bug"}, showResult)';
eval(ex3);

function showResult(response) {
	console.log("Callback", response);
}





