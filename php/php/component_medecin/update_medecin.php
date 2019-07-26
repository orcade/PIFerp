<?php

    /* ------------------------      Opération UPDATE sur la table MEDECINS (MAJ)
   ============================================================================= */

            // URL à communiquer aux FRONTEND pour le placer dans le fichier JS
            //  http://192.168.1.117/testphp/PIF_02/php/component_medecin/update_medecin.php

            // URL pour le domicile
            //  http://localhost/projects/PIF_02/php/component_medecin/update_medecin.php

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
    if(isset($_REQUEST["id"], $_REQUEST["prenom_medecin"], $_REQUEST["nom_medecin"]) 
            && !empty($_REQUEST["id"]) &&!empty($_REQUEST["prenom_medecin"])
            && !empty($_REQUEST["nom_medecin"])){
        //  Assignation d'une variable au paramètre récupéré
        $id_medecin            = $_REQUEST["id"];
        $prenom_medecin = $_REQUEST["prenom_medecin"];
        $nom_medecin       = $_REQUEST["nom_medecin"];

    } else {
        // S'il n'y a pas de paramètre
        $response["error_message"] = "Paramètres manquants: id, prenom_medecin et nom_medecin";

        // On souhaite l'interruption du script en l'absence du paramètre
        echo json_encode($response);
        die();
    }

    
    /* Etape 04 : REQUETE PREPAREE  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
        // Requête  :
        $sql = "UPDATE medecins 
                            SET  prenom_medecin = :prenom_medecin, nom_medecin = :nom_medecin
                            WHERE id_medecin = :id;";

        // Requête préparée en PDO
        $stmnt = $bdd->prepare($sql);
        $stmnt->bindValue(":id_medecin", $id_medecin, PDO::PARAM_INT);
        $stmnt->bindValue(":prenom_medecin", $prenom_medecin, PDO::PARAM_STR);
        $stmnt->bindValue(":nom_medecin", $nom_medecin, PDO::PARAM_STR);
        
        // Exécution de la requête
        // $stmnt->execute();
        $stmnt->execute(array(':id' => $id_medecin,':prenom_medecin' => $prenom_medecin, ':nom_medecin' => $nom_medecin));


    /* Etape 05 : TRAITEMENT DU RESULTAT  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */

        if(!$stmnt){
            //$row = $stmnt->fetch();

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
     