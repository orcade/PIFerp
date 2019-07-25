<?php

    /* ------------------------     Liste des médicaments avec SELECT sur la table MEDICAMENTS
   ============================================================================= */

            // URL à communiquer aux FRONTEND pour le placer dans le fichier JS
            //  http://192.168.1.117/testphp/PIF_02/php/medicament.php

            // URL pour le domicile
            //  http://localhost/projects/PIF_02/php/medicament.php

    // ============================================================================

    /* Etape  01 : PARAMETRAGE DU SCRIPT   -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
        //  Inclusion du fichier comprenant la fonction cors()
        require "../libs/cors.php";

        //  Appel de la fonction cors
        cors();

        // Entête pour format JSON
        header ("Content-Type: application/json");

        //  Connexion à la DB
        require "../libs/connexion_db.php";
   

/*  Etape  02 : TEST  (Communication FE/BE)  ----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
        // BASE DE REPONSE POUR LES FRONTEND
        $response = [
            "error"                     => true,
            "error_message"   => "Unknown error", 
            "data"                      => "" 
        ];  


 /* Etape  03 : REQUETE PREPAREE  -----------------------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
        // Requête  :
        $sql = "SELECT * FROM medicaments;";

        // Requête préparée en PDO
        $stmnt = $bdd->prepare($sql);
        
        // Exécution de la requête
        $stmnt->execute();


    /* Etape 04 : TRAITEMENT DU RESULTAT  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
  
    if(!$stmnt){
        //$row = $stmnt->fetch();

        // Pas d'erreur donc pas de message
        $response["error_message"] = "Requête SQL erronée";
        echo json_encode($response);
        die();         //  Fin du script

    } else {         
        // Il n'y a pas d'erreur
        $response["error"] = false;
        $response["error_message"] = "";
        $response["data"] = $stmnt->fetchAll(PDO::FETCH_ASSOC);

        //  Encodage tableau PHP $response en JSON
        echo json_encode($response);
  
        die();         //  Fin du script
    }
    /*------------------------------------------------------------------------------------------------------------------------*/





