<?php

    /* ------------------------      Opération UPDATE sur la table PATIENTS (MAJ)
   ============================================================================= */

            // URL à communiquer aux FRONTEND pour le placer dans le fichier JS
            //  http://192.168.1.117/testphp/PIF_02/php/component_patient/update_patient.php

            // URL pour le domicile
            //  http://localhost/projects/PIF_02/php/component_patient/update_patient.php

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
    if(isset($_REQUEST["id"], $_REQUEST["prenom_patient"], $_REQUEST["nom_patient"]) 
            && !empty($_REQUEST["id"]) &&!empty($_REQUEST["prenom_patient"])
            && !empty($_REQUEST["nom_patient"])){
        //  Assignation d'une variable au paramètre récupéré
        $id_patient            = $_REQUEST["id"];
        $prenom_patient = $_REQUEST["prenom_patient"];
        $nom_patient       = $_REQUEST["nom_patient"];

    } else {
        // S'il n'y a pas de paramètre
        $response["error_message"] = "Paramètres manquants: id, prenom_patient et nom_patient";

        // On souhaite l'interruption du script en l'absence du paramètre
        echo json_encode($response);
        die();
    }

    
    /* Etape 04 : REQUETE PREPAREE  ---------------- -----------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------------------- */
        // Requête  :
        $sql = "UPDATE patients 
                            SET  prenom_patient = :prenom_patient, nom_patient = :nom_patient
                            WHERE id_patient = :id;";

        // Requête préparée en PDO
        $stmnt = $bdd->prepare($sql);
        $stmnt->bindValue(":id_patient", $id_patient, PDO::PARAM_INT);
        $stmnt->bindValue(":prenom_patient", $prenom_patient, PDO::PARAM_STR);
        $stmnt->bindValue(":nom_patient", $nom_patient, PDO::PARAM_STR);
        
        // Exécution de la requête
        // $stmnt->execute();
        $stmnt->execute(array(':id' => $id_patient,':prenom_patient' => $prenom_patient, ':nom_patient' => $nom_patient));


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
     