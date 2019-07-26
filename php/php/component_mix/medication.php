<?php

        /* ------------------------ Prescription : Listes des médicaments pris par un patient
        *                                   JOINTURE : Tables MEDICAMENTS & PATIENTS
   ============================================================================= */

            // URL à communiquer aux FRONTEND pour le placer dans le fichier JS
            //  http://192.168.1.117/testphp/PIF_02/php/component_mix/medication.php

            // URL pour le domicile
            //  http://localhost/projects/PIF_02/php/component_mix/medication.php

    // ============================================================================

/* Etape  01 : PARAMETRAGE DU SCRIPT   -----------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------- */
    //  Inclusion du fichier comprenant la fonction cors()
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
        $id_patient = $_REQUEST["id"];

    } else {
        // S'il n'y a pas de paramètre
        $response["error_message"] = "Paramètre manquant : ID";

        // On souhaite l'interruption du script en l'absence du paramètre
        echo json_encode($response);
        die();
    }


/* Etape  04 : REQUETE PREPAREE  -----------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------- */
    // Requête  :
    $sql = "SELECT prenom_patient, nom_patient,nom_medicament
                    FROM patients AS P
                    INNER JOIN patients_medicaments AS PM ON PM.patient_id = P.id_patient
                    INNER JOIN medicaments AS ME ON PM.medicament_id = ME.id_medicament
                    WHERE P.id_patient = :id;";

    // Requête préparée en PDO
    $stmnt = $bdd->prepare($sql);

    $stmnt->bindValue(":id", $id_patient, PDO::PARAM_INT);
    
    // Exécution de la requête
    $stmnt->execute();


/* Etape 05 : TRAITEMENT DU RESULTAT  ---------------- -----------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------- */

if(!$stmnt){
    // $row = $stmnt->fetch();

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