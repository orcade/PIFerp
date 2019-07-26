<?php
    /* ------------------------      Opération DELETE sur la table PATIENTS
   ============================================================================= */

            // URL à communiquer aux FRONTEND pour le placer dans le fichier JS
            //  http://192.168.1.117/testphp/PIF_02/php/component_medecin/delete_medecin.php

            // URL pour le domicile
            //  http://localhost/projects/PIF_02/php/component_medecin/delete_medecin.php

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

     
    /*  Etape  02 : TEST  (Communication FE/BE)  ----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
        // BASE DE REPONSE POUR LES FRONTEND
        $response = [
            "error"                     => true,
            "error_message"   => "Unknown error", 
            "data"                      => "" 
        ];  


    /* Etape  03 : RECUPERATION DE PARAMETRE   -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */

            // Test de l'existence ou pas du paramètre à récupérer
            if(isset($_REQUEST["id"]) && !empty($_REQUEST["id"])){
                //  Assignation d'une variable au paramètre récupéré
                $id_patient= $_REQUEST["id"];

            } else {
                // S'il n'y a pas de paramètre
                $response["error_message"] = "Paramètre manquant : ID";

                // On souhaite l'interruption du script en l'absence du paramètre
                echo json_encode($response);
                die();
            }


    /* Etape  04 : REQUETE PREPAREE  -----------------------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
            // Requête :
            $sql = "DELETE FROM medecins WHERE id_medecin = :id;";  

            // Requête préparée en PDO
            $stmnt = $bdd->prepare($sql);
            $stmnt->bindValue(":id", $id_medecin, PDO::PARAM_INT);  
            
            // Exécution de la requête
            $stmnt->execute();


    /* Etape 05 : TRAITEMENT DU RESULTAT  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
        if(!$stmnt){
            //  $row = $stmnt->fetch();

            // Il y a une erreur donc message
            $response["error_message"] = "Requête SQL erronnée";

            //  Encodage tableau PHP $response en JSON
            echo json_encode($response);

            //  Fin du script
            die();

        } else {      
            // Il n'y a pas d'erreur
            $response["error"] = false;

            //  Résultat de la requête
            $response["error_message"] = "Suppression OK";
            $response["data"] = "";

            //  $response["data"] = $stmnt->fetchAll(PDO::FETCH_ASSOC);

            //  Conversion du tableau en JSON et affichage
            //  Encodage tableau PHP $response en JSON
            echo json_encode($response);

            //  Fin du script
            die();
        }