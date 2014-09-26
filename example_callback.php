<?php


switch($_GET['action']) {

	case "getPersonAsJSON":
	$persons = array(4=>array("userId"=>4, "firstName"=>"Pelle", "lastName"=>"Larsson", "age"=>44));
	$response = $persons[$_GET['userId']];
	header('Content-type: application/json');
	echo json_encode($response);
	break;

	case "savePersonReturnJSON":
	$response = array(
		"status" => "Saved",
		"person" => array("userId"=>5, "firstName"=>$_POST['firstName'], "lastName"=>$_POST['lastName'], "age"=>$_POST['age'])
	);
	header('Content-type: application/json');
	echo json_encode($response);
	break;

	case "getHTML":
	$response = "<div><b>Hello</b> World!!</div>";
	echo $response;
	break;
	
	case "saveSettings":
	$response = "Settings saved!<br>value:" . $_POST['value'] . "<br>type:" . $_POST['type'];
	echo $response;
	break;

}



?>