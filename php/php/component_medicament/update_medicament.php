<?php

    /* ------------------------      Opération UPDATE sur la table MEDICAMENTS (MAJ)
   ============================================================================= */

            // URL à communiquer aux FRONTEND pour le placer dans le fichier JS
            //  http://192.168.1.117/testphp/PIF_02/php/component_medicament/update_medicament.php

            // URL pour le domicile
            //  http://localhost/projects/PIF_02/php/component_medicament/update_medicament.php

    // ============================================================================

    // Inclusion du fichier comprenant la fonction cors()
    require "../../libs/cors.php";

    //  Appel de la fonction cors
    cors();

    // Entête pour format JSON
    header ("Content-Type: application/json");

    //  Connexion à la DB
    require "../../libs/connexion_db.php";


    /*  Etape 01 : TEST (Communication FE/BE)  ------------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */    

    // BASE DE REPONSE POUR LES FRONTEND
    $response = [
        "error"                     => true,
        "error_message"   => "Unknown error", 
        "data"                      => "" 
    ];  


    /* Etape  02 : RECUPERATION DE PARAMETRE   -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */    

    // Test de l'existence ou pas du paramètre à récupérer
    if(isset($_REQUEST["id"], $_REQUEST["nom_medicament"]) 
            && !empty($_REQUEST["id"]) &&!empty($_REQUEST["nom_medicament"])){
        //  Assignation d'une variable au paramètre récupéré
        $id_patient            = $_REQUEST["id"];
        $nom_patient       = $_REQUEST["nom_medicament"];

    } else {
        // S'il n'y a pas de paramètre
        $response["error_message"] = "Paramètres manquants: id et nom_medicament";

        // On souhaite l'interruption du script en l'absence du paramètre
        echo json_encode($response);
        die();
    }

    
    /* Etape 04 : REQUETE PREPAREE  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
        // Requête  :
        $sql = "UPDATE medicaments 
                            SET  nom_medicament = :nom_medicament
                            WHERE id_patient = :id;";

        // Requête préparée en PDO
        $stmnt = $bdd->prepare($sql);
        $stmnt->bindValue(":id_medicament", $id_medicament, PDO::PARAM_INT);
        $stmnt->bindValue(":nom_medicament", $nom_medicament, PDO::PARAM_STR);
        
        // Exécution de la requête
        $stmnt->execute(array(':id' => $id_patient, ':nom_medicament' => $nom_medicament));


    /* Etape 05 : TRAITEMENT DU RESULTAT  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */

        if(!$stmnt){
            // Il y a une erreur donc un message
            $response["error_message"] = "Requête SQL erronée";
            echo json_encode($response);
            die();         //  Fin du script

        } else {         
            // Il n'y a pas d'erreur
            $data = "ok";
            $response["error"] = false;
            $response["error_message"] = "";
      
            //  Encodage tableau PHP $response en JSON
            echo json_encode($response);
        
            die();         //  Fin du script
        }
     