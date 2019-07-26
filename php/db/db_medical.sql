-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  lun. 22 juil. 2019 à 17:00
-- Version du serveur :  10.1.38-MariaDB
-- Version de PHP :  7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `db_medical`
--

-- --------------------------------------------------------

--
-- Structure de la table `medecins`
--

CREATE TABLE `medecins` (
  `id_medecins` int(11) NOT NULL,
  `nom_medecin` varchar(64) NOT NULL,
  `prenom_medecin` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Liste des médecins';

--
-- Déchargement des données de la table `medecins`
--

INSERT INTO `medecins` (`id_medecins`, `nom_medecin`, `prenom_medecin`) VALUES
(1, 'ARENS', 'Marc'),
(2, 'BERGER ', 'Anne'),
(3, 'CHRISTOFFERSEN', 'Sonja '),
(4, 'DOOMS', 'Jeanne'),
(5, 'ERICH', 'Thérésia'),
(6, 'FAUCONNIER', 'Christophe'),
(7, 'GERRY', 'Jördi'),
(8, 'HERBER', 'Hugo'),
(9, 'INGRAM', 'Neil'),
(10, 'JOLY', 'Marcelle');

-- --------------------------------------------------------

--
-- Structure de la table `medecins_medicaments`
--

CREATE TABLE `medecins_medicaments` (
  `medecin_id` int(11) NOT NULL,
  `medicament_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tables intermédiaire Médecins & Médicaments';

-- --------------------------------------------------------

--
-- Structure de la table `medecins_patients`
--

CREATE TABLE `medecins_patients` (
  `medecin_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tables intermédiaire Médecins & Patients';

-- --------------------------------------------------------

--
-- Structure de la table `medicaments`
--

CREATE TABLE `medicaments` (
  `id_medicament` int(11) NOT NULL,
  `nom_medicament` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Listes des médicaments';

--
-- Déchargement des données de la table `medicaments`
--

INSERT INTO `medicaments` (`id_medicament`, `nom_medicament`) VALUES
(1, 'DOLIPRANE'),
(2, 'EFFERALGAN '),
(3, 'DAFALGAN \r\n '),
(4, 'LEVOTHYROX'),
(5, 'VOLTARENE '),
(6, 'CLAMOXYL '),
(7, 'PARACETAMOL BIOGARAN'),
(8, 'BETADINE '),
(9, 'ELUDRIL '),
(10, 'LEVOTHYROX ');

-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

CREATE TABLE `patients` (
  `id_patient` int(11) NOT NULL,
  `nom_patient` varchar(64) NOT NULL,
  `prenom_patient` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Listes des patients';

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients` (`id_patient`, `nom_patient`, `prenom_patient`) VALUES
(1, 'COLIN', 'Julien'),
(2, 'MIK', 'Michel'),
(3, 'DOE', 'Marc'),
(4, 'BOIL', 'Antoine'),
(5, 'DRO', 'Julie'),
(6, 'POLA', 'Nathalie'),
(7, 'KHRISTHEL', 'Lucie'),
(8, 'KAKM', 'Valérie'),
(9, 'MORDA', 'Léo'),
(10, 'MORDAN', 'Lucien');

-- --------------------------------------------------------

--
-- Structure de la table `patients_medicaments`
--

CREATE TABLE `patients_medicaments` (
  `patient_id` int(11) NOT NULL,
  `medicament_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Teble intermédiaire Patients & Médicaments';

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `medecins`
--
ALTER TABLE `medecins`
  ADD PRIMARY KEY (`id_medecins`);

--
-- Index pour la table `medecins_medicaments`
--
ALTER TABLE `medecins_medicaments`
  ADD KEY `medecin_id` (`medecin_id`,`medicament_id`);

--
-- Index pour la table `medecins_patients`
--
ALTER TABLE `medecins_patients`
  ADD KEY `medecin_id` (`medecin_id`,`patient_id`);

--
-- Index pour la table `medicaments`
--
ALTER TABLE `medicaments`
  ADD PRIMARY KEY (`id_medicament`);

--
-- Index pour la table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id_patient`);

--
-- Index pour la table `patients_medicaments`
--
ALTER TABLE `patients_medicaments`
  ADD KEY `patient_id` (`patient_id`,`medicament_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `medecins`
--
ALTER TABLE `medecins`
  MODIFY `id_medecins` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `medicaments`
--
ALTER TABLE `medicaments`
  MODIFY `id_medicament` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `patients`
--
ALTER TABLE `patients`
  MODIFY `id_patient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `medecins_patients`
--
ALTER TABLE `medecins_patients`
  ADD CONSTRAINT `medecins_patients_ibfk_1` FOREIGN KEY (`medecin_id`) REFERENCES `medecins` (`id_medecins`);

--
-- Contraintes pour la table `patients_medicaments`
--
ALTER TABLE `patients_medicaments`
  ADD CONSTRAINT `patients_medicaments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id_patient`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
