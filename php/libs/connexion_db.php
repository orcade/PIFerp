<?php
    /*Informations de connexion*/
    $host         = 'localhost';
    $dbname  = 'db_medical';
    $charset    = 'utf8';
    $dbuser    = 'root';
    $dbpwd    = '';


    define("DEBUG", true);

    if(!DEBUG){
        /* Cacher les erreurs */
        error_reporting(0);
    }
    try {
        $bdd = new PDO("mysql:host=$host;dbname=$dbname;charset=$charset", $dbuser, $dbpwd);
    } catch (Exception $e) {
        if (DEBUG) {
            die('Erreur : ' . $e->getMessage());
        } else  {
            die('Erreur avec la BD contacter le support technique...');
        }
    }
?>