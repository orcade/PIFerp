<?php

        /* ------------------------      Opération INSERT sur la table MEDECINS (ADD)
   ============================================================================= */

            // URL à communiquer aux FRONTEND pour le placer dans le fichier JS
            //  http://192.168.1.117/testphp/PIF_02/php/component_medecin/insert_medecin.php

            // URL pour le domicile
            //  http://localhost/projects/PIF_02/php/component_medecin/insert_medecin.php

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
        "data"                      => "" 
    ];  


/* Etape 03 : RECUPERATION DE PARAMETRE   -----------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------- */

        // Test de l'existence ou pas du paramètre à récupérer
        if(isset($_REQUEST["prenom_medecin"], $_REQUEST["nom_medecin"]) && !empty($_REQUEST["prenom_medecin"]) && !empty($_REQUEST["nom_medecin"])){
            //  Assignation d'une variable au paramètre récupéré
            $prenom_medecin = $_REQUEST["prenom_medecin"];
            $nom_medecin       = $_REQUEST["nom_medecin"];
        } else {
            // S'il n'y a pas de paramètre
            $response["error_message"] = "Paramètres manquants : Prénom et Nom";

            // On souhaite l'interruption du script en l'absence du paramètre
            echo json_encode($response);
            die();
        }


    /* Etape 04 : REQUETE PREPAREE  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
    // Requête :
        $sql = "INSERT INTO medecins (prenom_medecin, nom_medecin) VALUES (?, ?);";  

        // Requête préparée en PDO
        $stmnt = $bdd->prepare($sql);
        $stmnt->bindValue(1, $prenom_medecin, PDO::PARAM_STR);  
        $stmnt->bindValue(2, $nom_medecin, PDO::PARAM_STR);  
        
        // Exécution de la requête
        $stmnt->execute();


   /* Etape 05 : TRAITEMENT DU RESULTAT  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
  
    if(!$stmnt){
        // Il y a une erreur donc message
        $response["error_message"] = "Requête SQL erronée";

        //  Encodage tableau PHP $response en JSON
        echo json_encode($response);

        //  Fin du script
        die();

    } else {      
        // Il n'y a pas d'erreur
        $response["error"] = false;

        //  Résultat de la requête
        $data = "ok";
        $response["data"] = $data;
        $response["error_message"] = "";
        $response["msg"]="Ajout OK";  

        //  $response["data"] = $stmnt->fetchAll(PDO::FETCH_ASSOC);

        //  Conversion du tableau en JSON et affichage
        //  Encodage tableau PHP $response en JSON
        echo json_encode($response);

        //  Fin du script
        die();
    }