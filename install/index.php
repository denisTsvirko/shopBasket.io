<?php
require_once 'mysqlconnect.php';
header('Content-Type: text/html; charset=utf-8');

$dbh = new PDO($dsn, $user, $password);

function pdoSet($allowed, &$values, $source) {
    $set = '';
    $values = array();
    foreach ($allowed as $field) {
        if (isset($source[$field])) {
            $set.="`".str_replace("`","``",$field)."`". "=:$field, ";
            $values[$field] = $source[$field];
        }
    }
    return substr($set, 0, -2);
}

if(isset($_POST['all'])){

    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = $dbh->query('SELECT * FROM Products');

    echo json_encode($data->fetchAll());
}

if(isset($_POST['basket'])){
    $obj = json_decode($_POST['basket']);

    for ($i=0; $i < count($obj); $i++) {

        $allowed = array("id_Product","quantity"); // allowed fields
        $source = array('id_Product' => $obj[$i]->id, 'quantity' => $obj[$i]->quantity);

        $sql = "INSERT INTO Buy SET ".pdoSet($allowed,$values,$source);
        $stm = $dbh->prepare($sql);
        $stm->execute($values);
    }

    echo json_encode('ok!');
}



