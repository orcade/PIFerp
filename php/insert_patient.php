<?php
    /* Opération INSERT sur la table PATIENTS
    ------------------------------------------------------------------------------------------------------------- */

    // URL à placer dans le fichier JS des frontend
    //  http://localhost/projects/PIF_02/php/insert_patient.php


    // Inclusion du fichier comprenant la fonction cors()
    require "../libs/cors.php";

    //  Appel de la fonction cors
    cors();

    // Entête pour format JSON
    header ("Content-Type: application/json");

    //  Connexion à la DB
    require "../libs/connexion_db.php";
     
    /*  Cas  01 : TEST  ------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------- */
    // BASE DE REPONSE POUR LES FRONTEND

    $reponse = [
        "error"            => true,
        "error_message"   => "Unknown error", 
        "data"            => "" 
    ];  


/* Cas  02 : RECUPERATION DE PARAMETRE   -----------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------- */

    // Test de l'existence ou pas du paramètre à récupérer
    if(isset($_REQUEST["id_patient"]) && !empty($_REQUEST["id_patient"])){
        //  Assignation d'une variable au paramètre récupéré
        $id_patient= $_REQUEST["id_patient"];

    } else {
        // S'il n'y a pas de paramètre
        $reponse["error_message"] = "Pas de paramètres";

        // On souhaite l'interruption du script en l'absence du paramètre
        echo json_encode($reponse);
        die();
    }


    /* Cas  03 : REQUETE A ADAPTER  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
   // Requête :
    $sql = "INSERT INTO patients WHERE id_patient = :id_patient;";    

    // Requête préparée en PDO
    $stmnt = $bdd->prepare($sql);

    //  Résultat de la requête
    
    // Exécution de la requête
    $stmnt->execute();

    if(!$stmnt){
        $row = $stmnt->fetch();

        // Il y a une erreur donc message
        $reponse["error_message"] = "Erreur Requête SQL";

        //  Encodage tableau PHP $reponse en JSON
        echo json_encode($reponse);

        //  Fin du script
        die();

    } else {      
        // Il n'y a pas d'erreur
        $reponse["error"] = false;

        //  Résultat de la requête
        $reponse["data"] = "";
        $reponse["error_message"] = "ok";

        //  Conversion du tableau en json et affichage
        //  Encodage tableau PHP $reponse en JSON
        echo json_encode($reponse);

        //  Fin du script
        die();

    }