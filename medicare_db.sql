-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: medicare_db
-- ------------------------------------------------------
-- Server version	8.0.45
CREATE DATABASE medicare_db;
USE medicare_db;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `appointment_date` datetime NOT NULL,
  `status` enum('pending','confirmed','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`appointment_id`),
  KEY `idx_appointment_patient_id` (`patient_id`),
  KEY `idx_appointment_doctor_id` (`doctor_id`),
  CONSTRAINT `fk_appointment_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  CONSTRAINT `fk_appointment_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,1,1,'2026-04-10 09:00:00','confirmed','Kham tong quat','2026-04-09 09:00:00'),(2,2,2,'2026-04-10 10:30:00','pending','Kham da lieu','2026-04-09 09:15:00'),(3,3,2,'2026-04-10 12:00:00','confirmed','Kham benh ngoai da','2026-04-09 09:30:00'),(4,4,3,'2026-04-10 13:30:00','pending','Kham rang','2026-04-09 09:45:00'),(5,5,2,'2026-04-10 15:00:00','confirmed','Kham noi mut mong nuoc','2026-04-09 10:00:00'),(6,6,4,'2026-04-10 16:30:00','pending','Kham mat','2026-04-09 10:15:00'),(7,7,3,'2026-04-10 18:00:00','confirmed','KIem tra sau rang','2026-04-09 10:30:00'),(8,8,4,'2026-04-10 19:30:00','cancelled','Do do can va kham mat','2026-04-09 10:45:00'),(9,2,2,'2026-04-10 13:00:00','confirmed','Lich hen bo sung tu thong bao NC7','2026-04-10 08:20:00'),(10,1,1,'2026-04-10 14:00:00','confirmed','Lich hen bo sung tu thong bao NC9','2026-04-10 08:40:00');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specialty_id` int NOT NULL,
  `experience_years` int NOT NULL DEFAULT '0',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`doctor_id`),
  UNIQUE KEY `uk_doctor_user_id` (`user_id`),
  KEY `idx_doctor_specialty_id` (`specialty_id`),
  CONSTRAINT `fk_doctor_specialty` FOREIGN KEY (`specialty_id`) REFERENCES `specialty` (`specialty_id`),
  CONSTRAINT `fk_doctor_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,2,'Tran Binh',1,8,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775723515/image6_mr167k.png'),(2,4,'Pham Dung',2,2,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775723653/image7_j0izpd.png'),(3,8,'Ly Minh',5,3,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775724405/image14_jab5qp.png'),(4,10,'Vu Thinh',7,4,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775724612/image15_vdmxlr.png');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drug`
--

DROP TABLE IF EXISTS `drug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drug` (
  `drug_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`drug_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug`
--

LOCK TABLES `drug` WRITE;
/*!40000 ALTER TABLE `drug` DISABLE KEYS */;
INSERT INTO `drug` VALUES (1,'Paracetamol','Giam dau ha sot',5000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775726283/Paracetamol_ewnf42.jpg'),(2,'Vitamin C','Tang suc de khang',3000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775726425/Vitamin_C_vmc8io.png'),(3,'Cetirizine','Thuoc chong di ung',7000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775726456/Cetirizine_nlrkhh.jpg'),(4,'Panadol Extra','Giam dau nhanh, ha sot, co cafein giup tinh tao',6000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775726587/PanadolExtra_en6wuf.jpg'),(5,'Gaviscon','Dieu tri trao nguoc da day va o chua',2000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775726805/Gaviscon_evnufe.jpg'),(6,'Augmentin','Khang sinh dieu tri nhiem khuan duong ho hap',50000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775726846/Augmentin_c2k4mg.jpg'),(7,'Amlodipine','Dieu tri cao huyet ap va dau that nguc',40000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775726876/Amlodipine_qr9yot.jpg'),(8,'Salbutamol','Thuoc xit gian phe quan, dieu tri hen suyen',100000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775726914/Salbutamol_hlfvob.jpg'),(9,'Efferalgan','Giam dau, ha sot dang sui bot',50000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775726960/Efferalgan_jqcfn7.jpg'),(10,'Hapacol 150','Thuoc ha sot chuyen dung cho tre em',30000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775727012/Hapacol150_hgtmz5.jpg'),(11,'Dexamethasone','Thuoc khang viem manh, dieu tri di ung nang',10000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775727049/Dexamethasone_imzdmn.jpg'),(12,'Mebendazole','Thuoc tay giun dinh ky cho nguoi lon va tre em',55000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775727101/Mebendazole_qr5iyw.jpg'),(13,'Smecta','Thuoc dieu tri tieu chay va dau thuc quan, da day',60000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775727107/Smecta_pxtqnu.jpg'),(14,'Rodogyl','Khang sinh dac tri nhiem trung rang mieng, viem loi',70000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775727161/Rodogyl_yzm4vf.jpg'),(15,'Franrogyl','Dieu tri sau rang, viem chan rang va phu ne',10000.00,'https://res.cloudinary.com/dczz59gpu/image/upload/v1775727167/Franrogyl_zztcjg.jpg');
/*!40000 ALTER TABLE `drug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `inventory_id` int NOT NULL AUTO_INCREMENT,
  `drug_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `production_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  PRIMARY KEY (`inventory_id`),
  KEY `idx_inventory_drug_id` (`drug_id`),
  CONSTRAINT `fk_inventory_drug` FOREIGN KEY (`drug_id`) REFERENCES `drug` (`drug_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,1,100,'2025-01-01','2027-12-31'),(2,2,200,'2024-10-15','2027-10-15'),(3,3,150,'2024-08-20','2027-08-20'),(4,4,300,'2025-02-10','2028-02-10'),(5,5,120,'2025-03-01','2028-03-01'),(6,6,150,'2025-01-15','2027-01-15'),(7,7,50,'2024-12-01','2027-12-01'),(8,8,60,'2025-02-20','2027-02-20'),(9,9,15,'2025-01-10','2028-01-10'),(10,10,70,'2025-03-15','2028-03-15'),(11,11,80,'2025-02-05','2027-02-05'),(12,12,90,'2024-11-20','2027-11-20'),(13,13,45,'2025-01-25','2028-01-25'),(14,14,70,'2025-03-10','2028-03-10'),(15,15,120,'2025-02-28','2028-02-28');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_record`
--

DROP TABLE IF EXISTS `medical_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_record` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `diagnosis` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `treatment` text COLLATE utf8mb4_unicode_ci,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`record_id`),
  KEY `idx_medical_record_patient_id` (`patient_id`),
  KEY `idx_medical_record_doctor_id` (`doctor_id`),
  CONSTRAINT `fk_medical_record_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  CONSTRAINT `fk_medical_record_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_record`
--

LOCK TABLES `medical_record` WRITE;
/*!40000 ALTER TABLE `medical_record` DISABLE KEYS */;
INSERT INTO `medical_record` VALUES (1,1,1,'Nghi viem hong','Da tung cam cum','2026-04-10 09:30:00'),(2,1,2,'Di ung da nhe','Da tung viem da co dia','2026-04-10 11:00:00'),(3,3,2,'Viem da tiep xuc','Boi thuoc mo, tranh hoa chat','2026-04-10 12:30:00'),(4,5,2,'Thuy dau','Cach ly, boi ho nuoc, ha sot','2026-04-10 14:00:00'),(5,7,3,'Sau rang so 36','Han rang tham my','2026-04-10 15:30:00'),(6,1,1,'Roi loan nhip tim nhe','Nghi ngoi, theo doi them','2026-04-10 17:00:00');
/*!40000 ALTER TABLE `medical_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_id`),
  KEY `idx_notification_user_id` (`user_id`),
  CONSTRAINT `fk_notification_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,1,'Ban co lich hen vao 09:00 ngay 10/04/2026',0,'2026-04-09 18:00:00'),(2,3,'Ban co lich hen vao 10:30 ngay 10/04/2026',0,'2026-04-09 18:05:00'),(3,2,'Ban co lich kham voi benh nhan Nguyen An',1,'2026-04-09 18:10:00'),(4,4,'Ban co lich kham voi benh nhan Le Chi',0,'2026-04-09 18:15:00'),(5,1,'Ban co ket qua xet nghiem moi',1,'2026-04-10 08:00:00'),(6,2,'Ban da duoc phan cong lich kham moi',0,'2026-04-10 08:10:00'),(7,3,'Ban co lich hen vao 13:00 ngay 10/04/2026',0,'2026-04-10 08:20:00'),(8,4,'Don thuoc cua ban da duoc cap nhat',1,'2026-04-10 08:30:00'),(9,1,'Ban co lich hen vao 14:00 ngay 10/04/2026',0,'2026-04-10 08:40:00'),(10,2,'Ho so benh an da duoc cap nhat',1,'2026-04-10 08:50:00');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  UNIQUE KEY `uk_patient_user_id` (`user_id`),
  CONSTRAINT `fk_patient_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,1,'Nguyen An','2002-05-10','Nam','Da Nang','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724408/image11_haldjd.jpg'),(2,3,'Le Chi','2001-11-20','Nu','Quang Nam','https://res.cloudinary.com/dczz59gpu/image/upload/v1775722654/image_4_zo9nhr.png'),(3,7,'Dang Thu','2006-09-15','Nu','Ha Noi','https://res.cloudinary.com/dczz59gpu/image/upload/v1775723040/Lighthearted_z1fwdi.jpg'),(4,9,'Bui Nam','1990-04-30','Nam','Thanh pho Ho Chi Minh','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724409/image12_ocjsfs.jpg'),(5,11,'Do Hung','2000-12-04','Nam','Dong Nai','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724411/image9_yjzrqb.jpg'),(6,13,'Nguyen Thi Tuyet Trinh','2005-04-25','Nu','Can Tho','https://res.cloudinary.com/dczz59gpu/image/upload/v1775722814/image1_zbpauf.png'),(7,14,'Duong Le Kim Phung','2005-02-17','Nu','Soc Trang','https://res.cloudinary.com/dczz59gpu/image/upload/v1775723083/z7701887361673_45790b4fa6072813384cfd6dfca22887_fdvg9p.jpg'),(8,15,'Tran Anh Tuan','2005-09-23','Nam','Can Tho','https://res.cloudinary.com/dczz59gpu/image/upload/v1775723319/image5_bptquf.jpg');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `appointment_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `idx_payment_patient_id` (`patient_id`),
  KEY `idx_payment_appointment_id` (`appointment_id`),
  CONSTRAINT `fk_payment_appointment` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`),
  CONSTRAINT `fk_payment_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,1,1,150000.00,'cash','paid','2026-04-10 10:05:00'),(2,2,2,200000.00,'banking','pending','2026-04-10 11:35:00'),(3,3,3,180000.00,'cash','paid','2026-04-10 12:10:00'),(4,4,4,220000.00,'banking','paid','2026-04-10 13:20:00'),(5,5,5,50000.00,'cash','pending','2026-04-10 14:00:00'),(6,6,6,160000.00,'banking','paid','2026-04-10 15:10:00'),(7,7,7,70000.00,'cash','paid','2026-04-10 16:00:00'),(8,8,8,90000.00,'banking','pending','2026-04-10 17:30:00'),(9,2,9,120000.00,'cash','paid','2026-04-10 18:45:00'),(10,1,10,140000.00,'banking','pending','2026-04-10 19:20:00');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `prescription_id` int NOT NULL AUTO_INCREMENT,
  `record_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`prescription_id`),
  KEY `idx_prescription_record_id` (`record_id`),
  KEY `idx_prescription_patient_id` (`patient_id`),
  KEY `idx_prescription_doctor_id` (`doctor_id`),
  CONSTRAINT `fk_prescription_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  CONSTRAINT `fk_prescription_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `fk_prescription_record` FOREIGN KEY (`record_id`) REFERENCES `medical_record` (`record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` VALUES (1,1,1,1,'2026-04-10 10:00:00'),(2,2,1,2,'2026-04-10 11:30:00'),(3,3,3,2,'2026-04-10 13:00:00'),(4,4,5,2,'2026-04-10 14:30:00'),(5,5,7,3,'2026-04-10 16:00:00'),(6,6,1,1,'2026-04-10 17:30:00'),(7,6,1,1,'2026-04-10 17:35:00'),(8,2,1,2,'2026-04-10 11:35:00'),(9,4,5,2,'2026-04-10 14:35:00'),(10,3,3,2,'2026-04-10 13:05:00');
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription_detail`
--

DROP TABLE IF EXISTS `prescription_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prescription_id` int NOT NULL,
  `drug_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `dosage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_prescription_detail_prescription_id` (`prescription_id`),
  KEY `idx_prescription_detail_drug_id` (`drug_id`),
  CONSTRAINT `fk_prescription_detail_drug` FOREIGN KEY (`drug_id`) REFERENCES `drug` (`drug_id`),
  CONSTRAINT `fk_prescription_detail_prescription` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`prescription_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_detail`
--

LOCK TABLES `prescription_detail` WRITE;
/*!40000 ALTER TABLE `prescription_detail` DISABLE KEYS */;
INSERT INTO `prescription_detail` VALUES (1,1,1,10,'Ngay 2 lan, moi lan 1 vien'),(2,2,2,5,'Ngay 1 lan, moi lan 1 vien'),(3,3,3,7,'Ngay 1 lan buoi toi, moi lan 1 vien'),(4,4,4,8,'Ngay 2 lan, moi lan 1 vien'),(5,5,5,6,'Ngay 1 lan, moi lan 1 vien'),(6,6,6,10,'Ngay 2 lan, moi lan 1 vien'),(7,7,7,4,'Ngay 1 lan buoi sang, moi lan 1 vien'),(8,8,8,12,'Ngay 3 lan, moi lan 1 vien'),(9,9,9,5,'Ngay 1 lan, moi lan 1 vien'),(10,10,10,3,'Ngay 1 lan buoi toi, moi lan 1 vien');
/*!40000 ALTER TABLE `prescription_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialty`
--

DROP TABLE IF EXISTS `specialty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialty` (
  `specialty_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`specialty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialty`
--

LOCK TABLES `specialty` WRITE;
/*!40000 ALTER TABLE `specialty` DISABLE KEYS */;
INSERT INTO `specialty` VALUES (1,'Tim mach','Chuyên khoa chẩn đoán và điều trị các bệnh lý về hệ tuần hoàn, tim và mạch máu.','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724816/timmach_wqaxmh.jpg'),(2,'Da lieu','Chăm sóc và điều trị các vấn đề về da, tóc, móng.','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724839/khoadalieu_hipale.jpg'),(3,'Nhi khoa','Chăm sóc sức khỏe toàn diện và điều trị bệnh lý cho trẻ em từ sơ sinh đến tuổi vị thành niên.','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724878/nhikhoa_jcnoao.jpg'),(4,'Khoa kham benh','Tiếp nhận, phân loại và thực hiện khám lâm sàng ban đầu cho mọi đối tượng bệnh nhân.','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724972/khoakhambenh_ucexbz.jpg'),(5,'Rang ham mat','Khám và điều trị các bệnh lý về răng miệng, phục hình thẩm mỹ và phẫu thuật hàm mặt.','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724971/ranghammat_jvwq9w.jpg'),(6,'San phu khoa','Chăm sóc sức khỏe phụ nữ, quản lý thai kỳ, sinh con và các bệnh lý phụ khoa.','https://res.cloudinary.com/dczz59gpu/image/upload/v1775725122/sanphukhoa_cdzidj.jpg'),(7,'Mat','Chẩn đoán, điều trị các bệnh lý về mắt và thực hiện các thủ thuật đo thị lực, nhãn khoa.','https://res.cloudinary.com/dczz59gpu/image/upload/v1775725131/khoamat_lnzmi9.jpg'),(8,'Tai mui hong','Điều trị chuyên sâu các bệnh về tai, mũi, xoang, họng và các cấu trúc vùng đầu cổ.','https://res.cloudinary.com/dczz59gpu/image/upload/v1775725184/khoataimuihong_gzaggj.jpg');
/*!40000 ALTER TABLE `specialty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_result`
--

DROP TABLE IF EXISTS `test_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_result` (
  `test_id` int NOT NULL AUTO_INCREMENT,
  `record_id` int NOT NULL,
  `test_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `result` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`test_id`),
  KEY `idx_test_result_record_id` (`record_id`),
  CONSTRAINT `fk_test_result_record` FOREIGN KEY (`record_id`) REFERENCES `medical_record` (`record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_result`
--

LOCK TABLES `test_result` WRITE;
/*!40000 ALTER TABLE `test_result` DISABLE KEYS */;
INSERT INTO `test_result` VALUES (1,1,'Xet nghiem mau','Binh thuong','2026-04-10 09:45:00'),(2,2,'Test di ung','Di ung nhe voi thoi tiet','2026-04-10 11:15:00'),(3,3,'Soi da','Viem nhiem do vi khuan','2026-04-10 12:45:00'),(4,4,'Xet nghiem dich not phong','Duong tinh voi Varicella Zoster','2026-04-10 14:15:00'),(5,5,'Chup x-quang rang','Sau men rang dien rong','2026-04-10 15:45:00'),(6,6,'Diem tam do (ECG)','Nhip xoang hoi nhanh','2026-04-10 17:15:00');
/*!40000 ALTER TABLE `test_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('patient','doctor','staff','admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Nguyen','An','an@gmail.com','901000001','patient_an','Abc@123','patient','2026-04-09 08:00:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724408/image11_haldjd.jpg'),(2,'Tran','Binh','binh@gmail.com','901000002','doctor_binh','Abc@123','doctor','2026-04-09 08:10:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775723515/image6_mr167k.png'),(3,'Le','Chi','chi@gmail.com','901000003','patient_chi','Abc@123','patient','2026-04-09 08:20:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775722654/image_4_zo9nhr.png'),(4,'Pham','Dung','dung@gmail.com','901000004','doctor_dung','Abc@123','doctor','2026-04-09 08:30:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775723653/image7_j0izpd.png'),(5,'Vo','Ha','ha@gmail.com','901000005','staff_ha','Abc@123','staff','2026-04-09 08:40:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775723238/imgae3_eumfhj.jpg'),(6,'Admin','System','admin@gmail.com','901000006','admin_system','Abc@123','admin','2026-04-09 08:50:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775723803/images_knk042.png'),(7,'Dang','Thu','thu@gmail.com','901000007','patient_thu','Abc@123','patient','2026-04-09 08:55:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775723040/Lighthearted_z1fwdi.jpg'),(8,'Ly','Minh','minh@gmail.com','901000008','doctor_minh','Abc@123','doctor','2026-04-09 09:00:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724405/image14_jab5qp.png'),(9,'Bui','Nam','nam@gmail.com','901000009','patient_nam','Abc@123','patient','2026-04-09 09:05:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724409/image12_ocjsfs.jpg'),(10,'Vu','Thinh','thinh@gmail.com','901000010','doctor_thinh','Abc@123','doctor','2026-04-09 09:10:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724612/image15_vdmxlr.png'),(11,'Do','Hung','hung@gmail.com','901000011','patient_hung','Abc@123','patient','2026-04-09 09:15:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775724411/image9_yjzrqb.jpg'),(12,'Diep','Chi','chi@gmail.com','901000012','staff_chi','Abc@123','staff','2026-04-09 09:20:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775723244/image4_uzb2oq.jpg'),(13,'Nguyen Thi','Tuyet Trinh','tuyettrinhnguyenthi25042005@gmail.com','901000013','patient_trinh','Abc@123','patient','2026-04-09 09:25:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775722814/image1_zbpauf.png'),(14,'Duong Le','Kim Phung','kimphungduongle9@gmail.com','901000014','patient_phung','Abc@123','patient','2026-04-09 09:30:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775723083/z7701887361673_45790b4fa6072813384cfd6dfca22887_fdvg9p.jpg'),(15,'Tran','Anh Tuan','trananhtuan23092005@gmail.com','901000015','patient_tuan','Abc@123','patient','2026-04-09 09:35:00','https://res.cloudinary.com/dczz59gpu/image/upload/v1775723319/image5_bptquf.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-10 13:34:17
