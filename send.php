<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mail="qwertz157@wp.pl";



    $email = $_POST["email"];
    $message = $_POST["message"];
    $checkbox= $_POST["checkbox"];
   
    $errors=[];
    $return=[];

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        array_push($errors,"email");
    }
    if(empty($message)){
        array_push($errors,"message");
    }
    if($checkbox!="checked"){
        array_push($errors,"checkbox");
    }

    if(count($errors)>0){
        $return["errors"]=$errors;
    }else{
        
        $headers .= "Od: ".$email."\r\nTresc wiadomosci: ".$message;
                
            

        if(mail($mail,$body, $headers)){
            $return["status"]="ok";
        }else{
            $return["status"]="error";
        }

    }

    header("Content-Type: application/json");
    echo json_encode($return);
    
}