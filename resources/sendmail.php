<?php
require_once 'PHPMailerAutoload.php';

if (isset($_POST['inputName']) && isset($_POST['inputEmail']) && isset($_POST['inputSubject']) && isset($_POST['inputMessage'])) {
	print_r($_POST);
    //check if any of the inputs are empty
    if (empty($_POST['inputName']) || empty($_POST['inputEmail']) || empty($_POST['inputSubject']) || empty($_POST['inputMessage'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer
    $mail = new PHPMailer();

    $mail->From = $_POST['inputEmail'];
    $mail->FromName = $_POST['inputName'];
    $mail->AddAddress('do_not_reply@aerorand.com'); //recipient
    $mail->Subject = $_POST['inputSubject'];
    $mail->Body = "Name: " . $_POST['inputName'] . "\r\n\r\nMessage: " . stripslashes($_POST['inputMessage']);

    $mail->isSMTP();
    $mail->Host = gethostbyname('a2plcpnl0843.prod.iad2.secureserver.net');
    $mail->Port = 465;
    $mail->SMTPSecure = "tls";
    $mail->SMTPAuth = true;
	$mail->Username = "do_not_reply@aerorand.com"; //Email that you setup
	$mail->Password = "a8f-eZ3-Zgo-Dn3"; // Password
	$mail->SMTPDebug = 0;
    $mail->setFrom('do_not_reply@aerorand.com', 'Website form reply');


    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);

}
?>
