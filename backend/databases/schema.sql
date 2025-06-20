-- ===================================================================
-- ASSETIUM – Base de Données pour Gestion de Parc Informatique
-- Auteur : IBRAUM | Date : 2025-06
-- ===================================================================

-- ================================
-- TABLES D'UTILISATEURS ET RÔLES
-- ================================

DROP TABLE IF EXISTS utilisateurs, roles CASCADE;

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE utilisateurs (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  mot_de_passe TEXT NOT NULL,
  role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL
);

-- ================================
-- TABLES D'ÉQUIPEMENTS
-- ================================

DROP TABLE IF EXISTS equipements, types_equipements CASCADE;

CREATE TABLE types_equipements (
  id SERIAL PRIMARY KEY,
  libelle VARCHAR(100) NOT NULL
);

CREATE TABLE equipements (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  marque VARCHAR(100),
  modele VARCHAR(100),
  numero_serie VARCHAR(100) UNIQUE,
  date_acquisition DATE,
  etat VARCHAR(50) DEFAULT 'en service',
  type_id INTEGER REFERENCES types_equipements(id) ON DELETE SET NULL
);

-- ================================
-- TABLES D'AFFECTATIONS
-- ================================

DROP TABLE IF EXISTS affectations;

CREATE TABLE affectations (
  id SERIAL PRIMARY KEY,
  utilisateur_id INTEGER REFERENCES utilisateurs(id) ON DELETE CASCADE,
  equipement_id INTEGER REFERENCES equipements(id) ON DELETE CASCADE,
  date_affectation DATE DEFAULT CURRENT_DATE,
  date_retour DATE
);

-- ================================
-- TABLES D'INCIDENTS
-- ================================

DROP TABLE IF EXISTS incidents;

CREATE TABLE incidents (
  id SERIAL PRIMARY KEY,
  equipement_id INTEGER REFERENCES equipements(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  date_signalement DATE DEFAULT CURRENT_DATE,
  statut VARCHAR(50) DEFAULT 'ouvert',
  gravite VARCHAR(50) DEFAULT 'moyen'
);

-- ================================
-- TABLES DE MAINTENANCES
-- ================================

DROP TABLE IF EXISTS maintenances;

CREATE TABLE maintenances (
  id SERIAL PRIMARY KEY,
  equipement_id INTEGER REFERENCES equipements(id) ON DELETE CASCADE,
  type VARCHAR(50), -- préventive / corrective
  commentaire TEXT,
  date_maintenance DATE DEFAULT CURRENT_DATE
);

-- ================================
-- TABLE DE STATISTIQUES (OPTIONNELLE)
-- ================================

DROP TABLE IF EXISTS statistiques;

CREATE TABLE statistiques (
  id SERIAL PRIMARY KEY,
  equipement_id INTEGER REFERENCES equipements(id),
  utilisation_hours INTEGER DEFAULT 0,
  taux_disponibilite DECIMAL(5,2),
  date_calcul DATE DEFAULT CURRENT_DATE
);

-- ================================
-- DONNÉES FACTICES DE RÉFÉRENCE
-- ================================

-- Rôles
INSERT INTO roles (nom) VALUES
('admin'), ('technicien'), ('utilisateur');

-- Utilisateurs
INSERT INTO utilisateurs (nom, email, mot_de_passe, role_id) VALUES
('Alice Dupont', 'alice1@assetium.com', 'hashedpwd', 1),
('Bob Martin', 'bob2@assetium.com', 'hashedpwd', 2),
('Clara Leroy', 'clara3@assetium.com', 'hashedpwd', 3),
('David Morel', 'david4@assetium.com', 'hashedpwd', 2),
('Eva Petit', 'eva5@assetium.com', 'hashedpwd', 3),
('Franck Simon', 'franck6@assetium.com', 'hashedpwd', 3),
('Gwen Dubois', 'gwen7@assetium.com', 'hashedpwd', 3),
('Hugo Lemoine', 'hugo8@assetium.com', 'hashedpwd', 2),
('Isabelle Blanc', 'isabelle9@assetium.com', 'hashedpwd', 3),
('Jacques Millet', 'jacques10@assetium.com', 'hashedpwd', 3),
('Karine Chevalier', 'karine11@assetium.com', 'hashedpwd', 2),
('Louis Gerard', 'louis12@assetium.com', 'hashedpwd', 3),
('Manon Mercier', 'manon13@assetium.com', 'hashedpwd', 3),
('Nina Lefevre', 'nina14@assetium.com', 'hashedpwd', 3),
('Olivier Caron', 'olivier15@assetium.com', 'hashedpwd', 2),
('Pauline Roche', 'pauline16@assetium.com', 'hashedpwd', 3),
('Quentin Renaud', 'quentin17@assetium.com', 'hashedpwd', 3),
('Romain Marchand', 'romain18@assetium.com', 'hashedpwd', 2),
('Sophie Noel', 'sophie19@assetium.com', 'hashedpwd', 3),
('Thomas Bonnet', 'thomas20@assetium.com', 'hashedpwd', 3),
('Ugo Hardy', 'ugo21@assetium.com', 'hashedpwd', 3),
('Valerie Fabre', 'valerie22@assetium.com', 'hashedpwd', 2),
('William Roy', 'william23@assetium.com', 'hashedpwd', 3),
('Xavier Colin', 'xavier24@assetium.com', 'hashedpwd', 2),
('Yasmine Garnier', 'yasmine25@assetium.com', 'hashedpwd', 3),
('Zacharie Muller', 'zacharie26@assetium.com', 'hashedpwd', 3),
('Anais Lambert', 'anais27@assetium.com', 'hashedpwd', 3),
('Bruno Lemoine', 'bruno28@assetium.com', 'hashedpwd', 3),
('Camille Joly', 'camille29@assetium.com', 'hashedpwd', 3),
('Damien Berger', 'damien30@assetium.com', 'hashedpwd', 3);

-- Types d’équipements
INSERT INTO types_equipements (libelle) VALUES
('Ordinateur portable'),
('Imprimante'),
('Serveur'),
('Routeur'),
('Écran'),
('Scanner');

-- Équipements
INSERT INTO equipements (nom, marque, modele, numero_serie, date_acquisition, etat, type_id) VALUES
('Dell XPS', 'Dell', 'XPS13', 'SN10001', '2023-01-10', 'en service', 1),
('HP LaserJet', 'HP', 'LJ200', 'SN10002', '2022-11-02', 'en service', 2),
('Lenovo ThinkPad', 'Lenovo', 'T14', 'SN10003', '2023-01-15', 'en panne', 1),
('HP ProLiant', 'HP', 'DL360', 'SN10004', '2023-02-01', 'maintenance', 3),
('Cisco Router', 'Cisco', 'RV340', 'SN10005', '2023-02-03', 'en service', 4),
('Asus Vivobook', 'Asus', 'X512', 'SN10006', '2023-01-17', 'en service', 1),
('Canon Pixma', 'Canon', 'MG2550', 'SN10007', '2023-02-20', 'en panne', 2),
('Samsung Screen', 'Samsung', 'S24F350', 'SN10008', '2022-12-30', 'en service', 5),
('Brother HL-L2350', 'Brother', 'HL2350', 'SN10009', '2023-01-05', 'maintenance', 2),
('Netgear Switch', 'Netgear', 'GS308', 'SN10010', '2023-01-10', 'en service', 4),
('MacBook Pro', 'Apple', 'M1 13"', 'SN10011', '2023-02-14', 'en service', 1),
('Epson L3110', 'Epson', 'L3110', 'SN10012', '2023-02-15', 'en service', 2),
('Dell Screen', 'Dell', 'U2723QE', 'SN10013', '2022-12-20', 'en panne', 5),
('HP EliteBook', 'HP', '850 G8', 'SN10014', '2023-01-19', 'en service', 1),
('Fortinet FW', 'Fortinet', 'FG-60F', 'SN10015', '2023-02-10', 'en service', 4),
('MSI GF63', 'MSI', 'GF63', 'SN10016', '2023-01-21', 'maintenance', 1),
('Canon Scan', 'Canon', 'DR-C225', 'SN10017', '2023-02-22', 'en service', 6),
('Samsung Book', 'Samsung', 'Galaxy Book', 'SN10018', '2023-01-18', 'en service', 1),
('Lexmark B2338', 'Lexmark', 'B2338dw', 'SN10019', '2023-02-01', 'en panne', 2),
('Lenovo L22i', 'Lenovo', 'L22i-30', 'SN10020', '2023-02-03', 'en service', 5),
('Dell Vostro', 'Dell', '3500', 'SN10021', '2023-01-12', 'en service', 1),
('Epson Scanner', 'Epson', 'ES-50', 'SN10022', '2023-02-04', 'en service', 6),
('Cisco AP', 'Cisco', 'AIR-AP1850', 'SN10023', '2023-02-06', 'maintenance', 4),
('HP ProDesk', 'HP', '600 G6', 'SN10024', '2023-01-30', 'en panne', 1),
('Samsung Display', 'Samsung', 'C27F398', 'SN10025', '2023-01-22', 'en service', 5),
('Apple Mac Mini', 'Apple', 'M2', 'SN10026', '2023-02-11', 'en service', 1),
('Canon Fax', 'Canon', 'FAX-L170', 'SN10027', '2023-01-27', 'en service', 2),
('Dell Optiplex', 'Dell', '3080', 'SN10028', '2023-01-25', 'en service', 1),
('Ubiquiti UAP', 'Ubiquiti', 'UAP-AC-LR', 'SN10029', '2023-02-17', 'en service', 4),
('Brother MFC', 'Brother', 'MFC-J491DW', 'SN10030', '2023-01-11', 'en service', 2);

-- Affectations
INSERT INTO affectations (utilisateur_id, equipement_id, date_affectation) VALUES
(1, 1, '2023-02-01'),
(2, 2, '2023-02-01'),
(3, 3, '2023-02-02'),
(4, 4, '2023-02-03'),
(5, 5, '2023-02-03'),
(6, 6, '2023-02-04'),
(7, 7, '2023-02-04'),
(8, 8, '2023-02-05'),
(9, 9, '2023-02-06'),
(10, 10, '2023-02-07'),
(11, 11, '2023-02-08'),
(12, 12, '2023-02-09'),
(13, 13, '2023-02-10'),
(14, 14, '2023-02-11'),
(15, 15, '2023-02-12'),
(16, 16, '2023-02-13'),
(17, 17, '2023-02-14'),
(18, 18, '2023-02-15'),
(19, 19, '2023-02-16'),
(20, 20, '2023-02-17'),
(21, 21, '2023-02-18'),
(22, 22, '2023-02-19'),
(23, 23, '2023-02-20'),
(24, 24, '2023-02-21'),
(25, 25, '2023-02-22'),
(26, 26, '2023-02-23'),
(27, 27, '2023-02-24'),
(28, 28, '2023-02-25'),
(29, 29, '2023-02-26'),
(30, 30, '2023-02-27');

-- 🚨 Incidents
INSERT INTO incidents (equipement_id, description, statut, gravite) VALUES
(1, 'Écran noir au démarrage', 'ouvert', 'moyen'),
(2, 'Bourrage papier', 'résolu', 'faible'),
(3, 'Connexion réseau instable', 'ouvert', 'élevé'),
(4, 'Erreur RAID', 'ouvert', 'critique'),
(5, 'Routeur reboot tout seul', 'résolu', 'moyen'),
-- ... jusqu'à 30 incidents similaires :
(6, 'Batterie faible', 'ouvert', 'faible'),
(7, 'Impossible d’imprimer', 'ouvert', 'moyen'),
(8, 'Défaut d’alimentation', 'résolu', 'élevé'),
(9, 'Écran qui scintille', 'ouvert', 'faible'),
(10, 'Carte réseau défectueuse', 'ouvert', 'critique'),
(11, 'USB non détecté', 'ouvert', 'moyen'),
(12, 'Impression lente', 'ouvert', 'faible'),
(13, 'Problème de ventilation', 'ouvert', 'élevé'),
(14, 'RAM défectueuse', 'résolu', 'critique'),
(15, 'Blocage système', 'ouvert', 'élevé'),
(16, 'Scanner non détecté', 'résolu', 'faible'),
(17, 'Chargeur cassé', 'ouvert', 'faible'),
(18, 'Lenteur globale', 'ouvert', 'moyen'),
(19, 'Firmware obsolète', 'ouvert', 'moyen'),
(20, 'Redémarrage aléatoire', 'ouvert', 'critique'),
(21, 'Surchauffe détectée', 'ouvert', 'élevé'),
(22, 'Disque dur plein', 'ouvert', 'moyen'),
(23, 'Pas de son', 'résolu', 'faible'),
(24, 'Imprimante indisponible', 'ouvert', 'élevé'),
(25, 'Clavier non reconnu', 'ouvert', 'faible'),
(26, 'Connexion WiFi instable', 'ouvert', 'moyen'),
(27, 'Erreur système', 'ouvert', 'critique'),
(28, 'Alimentation défectueuse', 'résolu', 'moyen'),
(29, 'Ports Ethernet HS', 'ouvert', 'élevé'),
(30, 'Affichage lent', 'ouvert', 'faible');

-- Maintenances
INSERT INTO maintenances (equipement_id, type, commentaire, date_maintenance) VALUES
(1, 'préventive', 'Nettoyage interne complet', '2025-01-03'),
(2, 'corrective', 'Remplacement du toner', '2025-01-04'),
(3, 'corrective', 'Réinstallation de l’OS', '2025-01-05'),
(4, 'préventive', 'Contrôle RAID serveur', '2025-01-06'),
(5, 'corrective', 'Reconfiguration du routeur', '2025-01-07'),
(6, 'préventive', 'Nettoyage clavier et écran', '2025-01-08'),
(7, 'corrective', 'Changement tête d’impression', '2025-01-09'),
(8, 'préventive', 'Mise à jour du firmware écran', '2025-01-10'),
(9, 'corrective', 'Changement rouleau d’impression', '2025-01-11'),
(10, 'corrective', 'Réparation port LAN', '2025-01-12'),
(11, 'préventive', 'Vérification batterie', '2025-01-13'),
(12, 'corrective', 'Nettoyage têtes d’encre', '2025-01-14'),
(13, 'corrective', 'Remplacement câble HDMI', '2025-01-15'),
(14, 'préventive', 'Diagnostic complet BIOS', '2025-01-16'),
(15, 'corrective', 'Mise à jour FortiOS', '2025-01-17'),
(16, 'corrective', 'Remplacement de RAM', '2025-01-18'),
(17, 'préventive', 'Alignement optique scanner', '2025-01-19'),
(18, 'corrective', 'Réinstallation pilotes', '2025-01-20'),
(19, 'préventive', 'Changement unité de fusion', '2025-01-21'),
(20, 'corrective', 'Dépoussiérage ventilateur', '2025-01-22'),
(21, 'préventive', 'Vérification SSD et HDD', '2025-01-23'),
(22, 'corrective', 'Nettoyage connectiques', '2025-01-24'),
(23, 'corrective', 'Mise à jour firmware Wi-Fi', '2025-01-25'),
(24, 'préventive', 'Contrôle alimentation', '2025-01-26'),
(25, 'corrective', 'Changement d’alimentation', '2025-01-27'),
(26, 'préventive', 'Nettoyage externe', '2025-01-28'),
(27, 'corrective', 'Réparation carte mère', '2025-01-29'),
(28, 'préventive', 'Test mémoire', '2025-01-30'),
(29, 'corrective', 'Reprogrammation firmware', '2025-01-31'),
(30, 'préventive', 'Inspection de sécurité', '2025-02-01');

-- Statistiques
INSERT INTO statistiques (equipement_id, utilisation_hours, taux_disponibilite, date_calcul) VALUES
(1, 1200, 98.5, '2025-05-31'),
(2, 850, 95.0, '2025-05-31'),
(3, 400, 75.3, '2025-05-31'),
(4, 980, 92.1, '2025-05-31'),
(5, 1100, 97.8, '2025-05-31'),
(6, 700, 90.0, '2025-05-31'),
(7, 650, 88.7, '2025-05-31'),
(8, 800, 94.5, '2025-05-31'),
(9, 350, 70.2, '2025-05-31'),
(10, 900, 96.4, '2025-05-31'),
(11, 1000, 97.0, '2025-05-31'),
(12, 730, 89.6, '2025-05-31'),
(13, 680, 87.5, '2025-05-31'),
(14, 560, 83.0, '2025-05-31'),
(15, 890, 94.3, '2025-05-31'),
(16, 420, 76.4, '2025-05-31'),
(17, 1150, 98.8, '2025-05-31'),
(18, 770, 90.2, '2025-05-31'),
(19, 680, 88.1, '2025-05-31'),
(20, 540, 82.5, '2025-05-31'),
(21, 890, 94.7, '2025-05-31'),
(22, 400, 74.9, '2025-05-31'),
(23, 1120, 98.0, '2025-05-31'),
(24, 810, 92.3, '2025-05-31'),
(25, 670, 86.4, '2025-05-31'),
(26, 720, 89.7, '2025-05-31'),
(27, 590, 83.2, '2025-05-31'),
(28, 440, 77.0, '2025-05-31'),
(29, 1020, 96.5, '2025-05-31'),
(30, 760, 90.4, '2025-05-31');
