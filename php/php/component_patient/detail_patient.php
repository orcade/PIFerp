<?php

    /* ------------------------     Information d'un patient : DETAIL sur la table PATIENTS
   ============================================================================= */

            // URL à communiquer aux FRONTEND pour le placer dans le fichier JS
            //  http://192.168.1.117/testphp/PIF_02/php/component_patient/detail_patient.php

            // URL pour le domicile
            //  http://localhost/projects/PIF_02/php/component_patient/detail_patient.php

    // ============================================================================

    /* Etape  01 : PARAMETRAGE DU SCRIPT   -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
    // Inclusion du fichier comprenant la fonction cors()
    require "../../libs/cors.php";

    //  Appel de la fonction cors
    cors();

    // Entête pour format JSON
    header ("Content-Type: application/json");

    //  Connexion à la DB
    require "../../libs/connexion_db.php";

    
    /*  Etape 02 : TEST  (Communication FE/BE)  ------------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */

    // BASE DE REPONSE POUR LES FRONTEND
    $response = [
        "error"                     => true,
        "error_message"   => "Unknown error", 
        //"data_message" => "Données indisponibles",
        "data"                      => "" 
    ];  


    /* Etape  03 : RECUPERATION DE PARAMETRE   -----------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------- */

    // Test de l'existence ou pas du paramètre à récupérer
    if(isset($_REQUEST["id"]) && !empty($_REQUEST["id"])){
        //  Assignation d'une variable au paramètre récupéré
        $id_patient = $_REQUEST["id"];

    } else {
        // S'il n'y a pas de paramètre
        $response["error_message"] = "Paramètre manquant : ID";

        // On souhaite l'interruption du script en l'absence du paramètre
        echo json_encode($response);
        die();
    }


      /* Etape 04 : REQUETE PREPAREE   -----------------------------------------------------------------------------------
      --------------------------------------------------------------------------------------------------------------------------------------------- */

   // Requête  :
   $sql = "SELECT * FROM patients WHERE id_patient = :id;";

   // Requête préparée en PDO
   $stmnt = $bdd->prepare($sql);
   $stmnt->bindValue(":id", $id_patient, PDO::PARAM_INT);
   
   // Exécution de la requête
   $stmnt->execute();


 /* Etape 05 : TRAITEMENT DU RESULTAT  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
   if(!$stmnt){
       // Il y a une erreur donc un message
       $response["error_message"] = "Erreur Requête SQL";
       // $response["data_message"]  = "Données indisponibles";
       echo json_encode($response);
       die();         //  Fin du script

   } else {         
       // Il n'y a pas d'erreur
       $response["error"]                   = false;
       $response["error_message"] = "";
       //$response["data_message"]  = "Données disponibles";
       $response["data"]                    = $stmnt->fetch(PDO::FETCH_ASSOC);

       //  Encodage tableau PHP $response en JSON
       echo json_encode($response);
 
       die();         //  Fin du script
   }
     