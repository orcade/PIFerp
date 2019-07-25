<?php

        /* ------------------------      Opération INSERT sur la table PATIENTS (ADD)
   ============================================================================= */

            // URL à communiquer aux FRONTEND pour le placer dans le fichier JS
            //  http://192.168.1.117/testphp/PIF_02/php/component_patient/detail_patient.php

            // URL pour le domicile
            //  http://localhost/projects/PIF_02/php/component_patient/insert_patient.php

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
        "data"                      => "",
        "data_message"    => "Données indisponibles"
    ];  


/* Etape 03 : RECUPERATION DE PARAMETRE   -----------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------- */

        // Test de l'existence ou pas du paramètre à récupérer
        if(isset($_REQUEST["prenom_patient"], $_REQUEST["nom_patient"]) && !empty($_REQUEST["prenom_patient"]) && !empty($_REQUEST["nom_patient"])){
            //  Assignation d'une variable au paramètre récupéré
            $prenom_patient = $_REQUEST["prenom_patient"];
            $nom_patient       = strtoupper($_REQUEST["nom_patient"]);

        } else {
            // S'il n'y a pas de paramètre
            $response["error_message"] = "Paramètres manquants : Prenom et Nom";

            // On souhaite l'interruption du script en l'absence du paramètre
            echo json_encode($response);
            die();
        }


    /* Etape 04 : REQUETE PREPAREE  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
    // Requête :
        $sql = "INSERT INTO patients (prenom_patient, nom_patient) VALUES (?, ?);";  

        // Requête préparée en PDO
        $stmnt = $bdd->prepare($sql);
        $stmnt->bindValue(1, $prenom_patient, PDO::PARAM_STR);  
        $stmnt->bindValue(2, $nom_patient, PDO::PARAM_STR);  
        
        // Exécution de la requête
        $stmnt->execute();


   /* Etape 05 : TRAITEMENT DU RESULTAT  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
  
    if(!$stmnt){
        //  $row = $stmnt->fetchAll();

        // Il y a une erreur donc message
        $response["error_message"] = "Erreur Requête SQL";

        //  Encodage tableau PHP $response en JSON
        echo json_encode($response);

        //  Fin du script
        die();

    } else {      
        // Il n'y a pas d'erreur
        $response["error"] = false;

        //  Résultat de la requête
        // $data = "ok";
        $response["error_message"] = "";
        $response["data"] = "";
        $response["data_message"]="Ajout OK"; 

        //  $response["data"] = $stmnt->fetchAll(PDO::FETCH_ASSOC);

        //  Conversion du tableau en JSON et affichage
        //  Encodage tableau PHP $response en JSON
        echo json_encode($response);

        //  Fin du script
        die();
    }