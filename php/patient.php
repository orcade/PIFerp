<?php
    //  URL à placer dans le fichier JS des frontend
    //  http://localhost/projects/PIF_02/php/patient.php
    //  http://127.0.0.1/projects/PIF_02/


    //  'http://localhost/testphp/php/PIF_02/patient.php'

    //  Inclusion du fichier comprenant la fonction cors()
    require "../libs/cors.php";

    //  Appel de la fonction cors
    cors();

    // Entête pour format JSON
    header ("Content-Type: application/json");

    //  Connexion à la DB
    require "../libs/connexion_db.php";
   
    

    //  Cas 01 : TEST  ------------------------------------------------------------------------------------------------------

    // BASE DE REPONSE POUR LES FRONTEND
    $reponse = [
        "error"            => true,
        "error_message"   => "Unknown error", 
        "data"            => "" 
    ];  


    // Cas 02 : REQUETE A ADAPTER   -----------------------------------------------------------------------------------

   // Requête  :
    $sql = "SELECT * FROM patients;";

    // Requête préparée en PDO
    $stmnt = $bdd->prepare($sql);
    
    // Exécution de la requête
    $stmnt->execute();

    if(!$stmnt){
        $row = $stmnt->fetch();

        // Pas d'erreur donc pas de message
        $reponse["error_message"] = "Erreur Requête SQL";
        echo json_encode($reponse);
        die();         //  Fin du script

    } else {         
        // Il n'y a pas d'erreur
        $reponse["error"] = false;
        $reponse["error_message"] = "";
        $reponse["data"] = $stmnt->fetchAll(PDO::FETCH_ASSOC);

        //  Encodage tableau PHP $reponse en JSON
        echo json_encode($reponse);
  
        die();         //  Fin du script
    }
    /*------------------------------------------------------------------------------------------------------------------------*/





