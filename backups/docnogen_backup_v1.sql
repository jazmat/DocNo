-- MySQL dump 10.13  Distrib 8.0.40, for macos11.7 (x86_64)
--
-- Host: localhost    Database: docnogen
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AuditLogs`
--

DROP TABLE IF EXISTS `AuditLogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AuditLogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `action` varchar(50) NOT NULL,
  `table_name` varchar(50) DEFAULT NULL,
  `record_id` int DEFAULT NULL,
  `old_values` json DEFAULT NULL,
  `new_values` json DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `audit_logs_user_id` (`user_id`),
  KEY `audit_logs_action` (`action`),
  KEY `audit_logs_created_at` (`created_at`),
  CONSTRAINT `auditlogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuditLogs`
--

LOCK TABLES `AuditLogs` WRITE;
/*!40000 ALTER TABLE `AuditLogs` DISABLE KEYS */;
INSERT INTO `AuditLogs` VALUES (1,1,'CREATE_DOCUMENT','documents',1,NULL,'{\"document_number\": \"IT-PRE-20260215-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-15 19:16:12'),(2,2,'CREATE_DOCUMENT','documents',2,NULL,'{\"document_number\": \"IT-RPT-20260216-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 03:24:42'),(3,2,'CREATE_DOCUMENT','documents',3,NULL,'{\"document_number\": \"IT-RPT-20260216-002-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 03:32:35'),(4,2,'CREATE_DOCUMENT','documents',4,NULL,'{\"document_number\": \"OPS-TMP-20260216-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 03:33:20'),(5,2,'CREATE_DOCUMENT','documents',5,NULL,'{\"document_number\": \"IT-TMP-20260216-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 03:58:42'),(6,2,'CREATE_DOCUMENT','documents',6,NULL,'{\"document_number\": \"IT-TMP-20260216-002-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 04:04:52'),(7,2,'CREATE_DOCUMENT','documents',7,NULL,'{\"document_number\": \"IT-PRE-20260216-002-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 04:11:08'),(8,2,'CREATE_DOCUMENT','documents',8,NULL,'{\"document_number\": \"SAL-CTR-20260216-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 04:27:27'),(9,2,'CREATE_DOCUMENT','documents',9,NULL,'{\"document_number\": \"SAL-CTR-20260216-002-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 04:28:07'),(10,2,'CREATE_DOCUMENT','documents',10,NULL,'{\"document_number\": \"IT-PRO-20260216-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 04:28:52'),(11,2,'CREATE_DOCUMENT','documents',11,NULL,'{\"document_number\": \"IT-PRE-20260216-003-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 04:40:43'),(12,1,'CREATE_DOCUMENT','documents',12,NULL,'{\"document_number\": \"IT-TMP-20260216-003-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 05:14:35'),(13,1,'CREATE_DOCUMENT','documents',13,NULL,'{\"document_number\": \"IT-TMP-20260216-004-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 05:35:13'),(14,2,'CREATE_DOCUMENT','documents',14,NULL,'{\"document_number\": \"MKTG-PRE-20260216-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 05:43:36'),(15,2,'CREATE_DOCUMENT','documents',15,NULL,'{\"document_number\": \"IT-MEM-20260216-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 05:49:33'),(16,2,'CREATE_DOCUMENT','documents',16,NULL,'{\"document_number\": \"IT-PRE-20260216-004-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 06:03:05'),(17,2,'CREATE_DOCUMENT','documents',17,NULL,'{\"document_number\": \"MKTG-PRE-20260216-002-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 06:05:57'),(18,1,'CREATE_DOCUMENT','documents',18,NULL,'{\"document_number\": \"IT-PRO-20260216-002-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 06:15:39'),(19,2,'CREATE_DOCUMENT','documents',19,NULL,'{\"document_number\": \"LEG-OTH-20260216-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 06:33:53'),(20,2,'CREATE_DOCUMENT','documents',20,NULL,'{\"document_number\": \"IT-MEM-20260216-002-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 09:54:53'),(21,2,'CREATE_DOCUMENT','documents',21,NULL,'{\"document_number\": \"SAL-TMP-20260216-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-16 11:56:09'),(22,2,'CREATE_DOCUMENT','documents',22,NULL,'{\"document_number\": \"MKTG-OTH-20260217-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-17 09:41:38'),(23,2,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"IT-TMP-20260217-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-17 20:40:50'),(24,2,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"MKTG-CTR-20260220-002-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-20 19:23:40'),(25,2,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"MKTG-CTR-20260220-003-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-20 19:26:20'),(26,2,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"MKTG-CTR-20260220-004-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-20 19:35:06'),(27,2,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"MKTG-CTR-20260220-005-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-20 19:36:47'),(28,2,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"HR-MEM-20260220-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-20 19:39:21'),(29,2,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"MKTG-INV-20260220-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-20 19:43:04'),(30,1,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"HR-CTR-20260220-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-20 19:46:33'),(31,1,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"MKTG-INV-20260220-002-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-20 20:18:25'),(32,1,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"FIN-RPT-20260220-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-20 20:24:24'),(33,1,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"FIN-INV-20260220-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-20 23:47:26'),(34,1,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"MKTG-CTR-20260221-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-21 00:30:42'),(35,1,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"IT-RPT-20260221-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-21 00:46:30'),(36,1,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"IT-MEM-20260221-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-21 00:49:22'),(37,2,'CREATE_DOCUMENT','documents',NULL,NULL,'{\"document_number\": \"HR-INV-20260221-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-21 00:59:46'),(38,2,'CREATE_DOCUMENT','documents',49,NULL,'{\"document_number\": \"FIN-RPT-20260221-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-21 01:32:47'),(39,2,'CREATE_DOCUMENT','documents',50,NULL,'{\"document_number\": \"IT-RPT-20260222-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-22 10:40:27'),(40,1,'CREATE_DOCUMENT','documents',51,NULL,'{\"document_number\": \"MKTG-MEM-20260223-001-JA\"}','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-02-23 11:24:38');
/*!40000 ALTER TABLE `AuditLogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_number_rules`
--

DROP TABLE IF EXISTS `doc_number_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doc_number_rules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `pattern` varchar(255) NOT NULL,
  `reset_frequency` enum('never','yearly') DEFAULT 'yearly',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_number_rules`
--

LOCK TABLES `doc_number_rules` WRITE;
/*!40000 ALTER TABLE `doc_number_rules` DISABLE KEYS */;
INSERT INTO `doc_number_rules` VALUES (1,'Default Rule','{DEPT}-{CAT}-{YEAR}-{SEQ}','yearly',1,'2026-02-24 10:08:43');
/*!40000 ALTER TABLE `doc_number_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_sequences`
--

DROP TABLE IF EXISTS `doc_sequences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doc_sequences` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `rule_id` int NOT NULL,
  `department` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `current_value` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_sequence` (`rule_id`,`department`,`category`,`year`),
  CONSTRAINT `doc_sequences_ibfk_1` FOREIGN KEY (`rule_id`) REFERENCES `doc_number_rules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_sequences`
--

LOCK TABLES `doc_sequences` WRITE;
/*!40000 ALTER TABLE `doc_sequences` DISABLE KEYS */;
/*!40000 ALTER TABLE `doc_sequences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `document_number` varchar(100) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `document_number` (`document_number`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,'Some Document for testing','DOC-1772017654447',1,1,1,'2026-02-25 11:07:34'),(2,'Some Document for testing','DOC-1772017774094',1,1,1,'2026-02-25 11:09:34'),(3,'Some Document for testing again','DOC-1772018062011',1,1,1,'2026-02-25 11:14:22'),(4,'Another Document for testing','DOC-1772018386332',1,1,1,'2026-02-25 11:19:46'),(5,'Some Document for testing againa and again','DOC-1772018783301',1,1,1,'2026-02-25 11:26:23'),(6,'Some more testing','DOC-1772019100309',4,1,1,'2026-02-25 11:31:40'),(7,'Some Document for testing and testing','DOC-1772019502912',5,5,1,'2026-02-25 11:38:22'),(8,'Something19','DOC-1772019606666',2,4,1,'2026-02-25 11:40:06');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents_backup`
--

DROP TABLE IF EXISTS `documents_backup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents_backup` (
  `id` int NOT NULL DEFAULT '0',
  `document_number` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `document_title` varchar(255) NOT NULL,
  `document_category` enum('Report','Template','Presentation','Invoice','Contract','Proposal','Memo','Other') NOT NULL,
  `department` varchar(50) NOT NULL,
  `status` enum('generated','in_use','archived') DEFAULT 'generated',
  `generated_at` datetime DEFAULT NULL,
  `last_used_at` datetime DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents_backup`
--

LOCK TABLES `documents_backup` WRITE;
/*!40000 ALTER TABLE `documents_backup` DISABLE KEYS */;
INSERT INTO `documents_backup` VALUES (1,'IT-PRE-20260215-001-JA',1,'Jehanzeb Azmat','jehanzeb.azmat@esigmatech.com','Specifications','Presentation','Information Technology','generated','2026-02-15 19:16:12',NULL,'{\"notes\": \"\"}','2026-02-15 19:16:12'),(2,'IT-RPT-20260216-001-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Something','Report','Information Technology','generated','2026-02-16 03:24:42',NULL,'{\"notes\": \"\"}','2026-02-16 03:24:42'),(3,'IT-RPT-20260216-002-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Specifications','Report','Information Technology','generated','2026-02-16 03:32:35',NULL,'{\"notes\": \"\"}','2026-02-16 03:32:35'),(4,'OPS-TMP-20260216-001-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Something','Template','Operations','generated','2026-02-16 03:33:20',NULL,'{\"notes\": \"\"}','2026-02-16 03:33:20'),(5,'IT-TMP-20260216-001-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Something','Template','Information Technology','generated','2026-02-16 03:58:42',NULL,'{\"notes\": \"\"}','2026-02-16 03:58:42'),(6,'IT-TMP-20260216-002-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Something','Template','Information Technology','generated','2026-02-16 04:04:52',NULL,'{\"notes\": \"\"}','2026-02-16 04:04:52'),(7,'IT-PRE-20260216-002-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Specifications','Presentation','Information Technology','generated','2026-02-16 04:11:08',NULL,'{\"notes\": \"\"}','2026-02-16 04:11:08'),(8,'SAL-CTR-20260216-001-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Specifications','Contract','Sales','generated','2026-02-16 04:27:27',NULL,'{\"notes\": \"\"}','2026-02-16 04:27:27'),(9,'SAL-CTR-20260216-002-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Specifications','Contract','Sales','generated','2026-02-16 04:28:07',NULL,'{\"notes\": \"\"}','2026-02-16 04:28:07'),(10,'IT-PRO-20260216-001-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Something','Proposal','Information Technology','generated','2026-02-16 04:28:52',NULL,'{\"notes\": \"\"}','2026-02-16 04:28:52'),(11,'IT-PRE-20260216-003-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Specifications','Presentation','Information Technology','generated','2026-02-16 04:40:43',NULL,'{\"notes\": \"\"}','2026-02-16 04:40:43'),(12,'IT-TMP-20260216-003-JA',1,'Jehanzeb Azmat','jehanzeb.azmat@esigmatech.com','Specifications','Template','Information Technology','generated','2026-02-16 05:14:35',NULL,'{\"notes\": \"\"}','2026-02-16 05:14:35'),(13,'IT-TMP-20260216-004-JA',1,'Jehanzeb Azmat','jehanzeb.azmat@esigmatech.com','Specifications','Template','Information Technology','generated','2026-02-16 05:35:13',NULL,'{\"notes\": \"\"}','2026-02-16 05:35:13'),(14,'MKTG-PRE-20260216-001-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Something','Presentation','Marketing','generated','2026-02-16 05:43:36',NULL,'{\"notes\": \"\"}','2026-02-16 05:43:36'),(15,'IT-MEM-20260216-001-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Specifications','Memo','Information Technology','generated','2026-02-16 05:49:33',NULL,'{\"notes\": \"\"}','2026-02-16 05:49:33'),(16,'IT-PRE-20260216-004-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Specifications','Presentation','Information Technology','generated','2026-02-16 06:03:05',NULL,'{\"notes\": \"\"}','2026-02-16 06:03:05'),(17,'MKTG-PRE-20260216-002-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Something','Presentation','Marketing','generated','2026-02-16 06:05:57',NULL,'{\"notes\": \"\"}','2026-02-16 06:05:57'),(18,'IT-PRO-20260216-002-JA',1,'Jehanzeb Azmat','jehanzeb.azmat@esigmatech.com','Specifications','Proposal','Information Technology','generated','2026-02-16 06:15:39',NULL,'{\"notes\": \"\"}','2026-02-16 06:15:39'),(19,'LEG-OTH-20260216-001-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Specifications','Other','Legal','generated','2026-02-16 06:33:53',NULL,'{\"notes\": \"\"}','2026-02-16 06:33:53'),(20,'IT-MEM-20260216-002-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Something3','Memo','Information Technology','generated','2026-02-16 09:54:53',NULL,'{\"notes\": \"\"}','2026-02-16 09:54:53'),(21,'SAL-TMP-20260216-001-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Something4','Template','Sales','generated','2026-02-16 11:56:09',NULL,'{\"notes\": \"\"}','2026-02-16 11:56:09'),(22,'MKTG-OTH-20260217-001-JA',2,'Jehanzeb Azmat','jazmat@icloud.com','Something5','Other','Marketing','generated','2026-02-17 09:41:38',NULL,'{\"notes\": \"\"}','2026-02-17 09:41:38');
/*!40000 ALTER TABLE `documents_backup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents_save`
--

DROP TABLE IF EXISTS `documents_save`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents_save` (
  `id` int NOT NULL DEFAULT '0',
  `document_number` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  `document_title` varchar(255) NOT NULL,
  `document_category` enum('Report','Template','Presentation','Invoice','Contract','Proposal','Memo','Other') NOT NULL,
  `department` varchar(50) NOT NULL,
  `status` enum('generated','in_use','archived') DEFAULT 'generated',
  `generated_at` datetime DEFAULT NULL,
  `last_used_at` datetime DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  KEY `fk_documents_user` (`user_id`),
  CONSTRAINT `fk_documents_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents_save`
--

LOCK TABLES `documents_save` WRITE;
/*!40000 ALTER TABLE `documents_save` DISABLE KEYS */;
INSERT INTO `documents_save` VALUES (1,'IT-PRE-20260215-001-JA',1,'Specifications','Presentation','Information Technology','generated','2026-02-15 19:16:12',NULL,'{\"notes\": \"\"}','2026-02-15 19:16:12'),(2,'IT-RPT-20260216-001-JA',2,'Something','Report','Information Technology','generated','2026-02-16 03:24:42',NULL,'{\"notes\": \"\"}','2026-02-16 03:24:42'),(3,'IT-RPT-20260216-002-JA',2,'Specifications','Report','Information Technology','generated','2026-02-16 03:32:35',NULL,'{\"notes\": \"\"}','2026-02-16 03:32:35'),(4,'OPS-TMP-20260216-001-JA',2,'Something','Template','Operations','generated','2026-02-16 03:33:20',NULL,'{\"notes\": \"\"}','2026-02-16 03:33:20'),(5,'IT-TMP-20260216-001-JA',2,'Something','Template','Information Technology','generated','2026-02-16 03:58:42',NULL,'{\"notes\": \"\"}','2026-02-16 03:58:42'),(6,'IT-TMP-20260216-002-JA',2,'Something','Template','Information Technology','generated','2026-02-16 04:04:52',NULL,'{\"notes\": \"\"}','2026-02-16 04:04:52'),(7,'IT-PRE-20260216-002-JA',2,'Specifications','Presentation','Information Technology','generated','2026-02-16 04:11:08',NULL,'{\"notes\": \"\"}','2026-02-16 04:11:08'),(8,'SAL-CTR-20260216-001-JA',2,'Specifications','Contract','Sales','generated','2026-02-16 04:27:27',NULL,'{\"notes\": \"\"}','2026-02-16 04:27:27'),(9,'SAL-CTR-20260216-002-JA',2,'Specifications','Contract','Sales','generated','2026-02-16 04:28:07',NULL,'{\"notes\": \"\"}','2026-02-16 04:28:07'),(10,'IT-PRO-20260216-001-JA',2,'Something','Proposal','Information Technology','generated','2026-02-16 04:28:52',NULL,'{\"notes\": \"\"}','2026-02-16 04:28:52'),(11,'IT-PRE-20260216-003-JA',2,'Specifications','Presentation','Information Technology','generated','2026-02-16 04:40:43',NULL,'{\"notes\": \"\"}','2026-02-16 04:40:43'),(12,'IT-TMP-20260216-003-JA',1,'Specifications','Template','Information Technology','generated','2026-02-16 05:14:35',NULL,'{\"notes\": \"\"}','2026-02-16 05:14:35'),(13,'IT-TMP-20260216-004-JA',1,'Specifications','Template','Information Technology','generated','2026-02-16 05:35:13',NULL,'{\"notes\": \"\"}','2026-02-16 05:35:13'),(14,'MKTG-PRE-20260216-001-JA',2,'Something','Presentation','Marketing','generated','2026-02-16 05:43:36',NULL,'{\"notes\": \"\"}','2026-02-16 05:43:36'),(15,'IT-MEM-20260216-001-JA',2,'Specifications','Memo','Information Technology','generated','2026-02-16 05:49:33',NULL,'{\"notes\": \"\"}','2026-02-16 05:49:33'),(16,'IT-PRE-20260216-004-JA',2,'Specifications','Presentation','Information Technology','generated','2026-02-16 06:03:05',NULL,'{\"notes\": \"\"}','2026-02-16 06:03:05'),(17,'MKTG-PRE-20260216-002-JA',2,'Something','Presentation','Marketing','generated','2026-02-16 06:05:57',NULL,'{\"notes\": \"\"}','2026-02-16 06:05:57'),(18,'IT-PRO-20260216-002-JA',1,'Specifications','Proposal','Information Technology','generated','2026-02-16 06:15:39',NULL,'{\"notes\": \"\"}','2026-02-16 06:15:39'),(19,'LEG-OTH-20260216-001-JA',2,'Specifications','Other','Legal','generated','2026-02-16 06:33:53',NULL,'{\"notes\": \"\"}','2026-02-16 06:33:53'),(20,'IT-MEM-20260216-002-JA',2,'Something3','Memo','Information Technology','generated','2026-02-16 09:54:53',NULL,'{\"notes\": \"\"}','2026-02-16 09:54:53'),(21,'SAL-TMP-20260216-001-JA',2,'Something4','Template','Sales','generated','2026-02-16 11:56:09',NULL,'{\"notes\": \"\"}','2026-02-16 11:56:09'),(22,'MKTG-OTH-20260217-001-JA',2,'Something5','Other','Marketing','generated','2026-02-17 09:41:38',NULL,'{\"notes\": \"\"}','2026-02-17 09:41:38');
/*!40000 ALTER TABLE `documents_save` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Documents_save2`
--

DROP TABLE IF EXISTS `Documents_save2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Documents_save2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `document_number` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  `document_title` varchar(255) NOT NULL,
  `document_category` enum('Report','Template','Presentation','Invoice','Contract','Proposal','Memo','Other') NOT NULL,
  `department` varchar(50) NOT NULL,
  `status` enum('generated','in_use','archived') DEFAULT 'generated',
  `generated_at` datetime DEFAULT NULL,
  `last_used_at` datetime DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_doc_user` (`user_id`),
  CONSTRAINT `fk_doc_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Documents_save2`
--

LOCK TABLES `Documents_save2` WRITE;
/*!40000 ALTER TABLE `Documents_save2` DISABLE KEYS */;
INSERT INTO `Documents_save2` VALUES (1,'IT-PRE-20260215-001-JA',1,'Specifications','Presentation','Information Technology','generated','2026-02-15 19:16:12',NULL,'{\"notes\": \"\"}','2026-02-15 19:16:12'),(2,'IT-RPT-20260216-001-JA',2,'Something','Report','Information Technology','generated','2026-02-16 03:24:42',NULL,'{\"notes\": \"\"}','2026-02-16 03:24:42'),(3,'IT-RPT-20260216-002-JA',2,'Specifications','Report','Information Technology','generated','2026-02-16 03:32:35',NULL,'{\"notes\": \"\"}','2026-02-16 03:32:35'),(4,'OPS-TMP-20260216-001-JA',2,'Something','Template','Operations','generated','2026-02-16 03:33:20',NULL,'{\"notes\": \"\"}','2026-02-16 03:33:20'),(5,'IT-TMP-20260216-001-JA',2,'Something','Template','Information Technology','generated','2026-02-16 03:58:42',NULL,'{\"notes\": \"\"}','2026-02-16 03:58:42'),(6,'IT-TMP-20260216-002-JA',2,'Something','Template','Information Technology','generated','2026-02-16 04:04:52',NULL,'{\"notes\": \"\"}','2026-02-16 04:04:52'),(7,'IT-PRE-20260216-002-JA',2,'Specifications','Presentation','Information Technology','generated','2026-02-16 04:11:08',NULL,'{\"notes\": \"\"}','2026-02-16 04:11:08'),(8,'SAL-CTR-20260216-001-JA',2,'Specifications','Contract','Sales','generated','2026-02-16 04:27:27',NULL,'{\"notes\": \"\"}','2026-02-16 04:27:27'),(9,'SAL-CTR-20260216-002-JA',2,'Specifications','Contract','Sales','generated','2026-02-16 04:28:07',NULL,'{\"notes\": \"\"}','2026-02-16 04:28:07'),(10,'IT-PRO-20260216-001-JA',2,'Something','Proposal','Information Technology','generated','2026-02-16 04:28:52',NULL,'{\"notes\": \"\"}','2026-02-16 04:28:52'),(11,'IT-PRE-20260216-003-JA',2,'Specifications','Presentation','Information Technology','generated','2026-02-16 04:40:43',NULL,'{\"notes\": \"\"}','2026-02-16 04:40:43'),(12,'IT-TMP-20260216-003-JA',1,'Specifications','Template','Information Technology','generated','2026-02-16 05:14:35',NULL,'{\"notes\": \"\"}','2026-02-16 05:14:35'),(13,'IT-TMP-20260216-004-JA',1,'Specifications','Template','Information Technology','generated','2026-02-16 05:35:13',NULL,'{\"notes\": \"\"}','2026-02-16 05:35:13'),(14,'MKTG-PRE-20260216-001-JA',2,'Something','Presentation','Marketing','generated','2026-02-16 05:43:36',NULL,'{\"notes\": \"\"}','2026-02-16 05:43:36'),(15,'IT-MEM-20260216-001-JA',2,'Specifications','Memo','Information Technology','generated','2026-02-16 05:49:33',NULL,'{\"notes\": \"\"}','2026-02-16 05:49:33'),(16,'IT-PRE-20260216-004-JA',2,'Specifications','Presentation','Information Technology','generated','2026-02-16 06:03:05',NULL,'{\"notes\": \"\"}','2026-02-16 06:03:05'),(17,'MKTG-PRE-20260216-002-JA',2,'Something','Presentation','Marketing','generated','2026-02-16 06:05:57',NULL,'{\"notes\": \"\"}','2026-02-16 06:05:57'),(18,'IT-PRO-20260216-002-JA',1,'Specifications','Proposal','Information Technology','generated','2026-02-16 06:15:39',NULL,'{\"notes\": \"\"}','2026-02-16 06:15:39'),(19,'LEG-OTH-20260216-001-JA',2,'Specifications','Other','Legal','generated','2026-02-16 06:33:53',NULL,'{\"notes\": \"\"}','2026-02-16 06:33:53'),(20,'IT-MEM-20260216-002-JA',2,'Something3','Memo','Information Technology','generated','2026-02-16 09:54:53',NULL,'{\"notes\": \"\"}','2026-02-16 09:54:53'),(21,'SAL-TMP-20260216-001-JA',2,'Something4','Template','Sales','generated','2026-02-16 11:56:09',NULL,'{\"notes\": \"\"}','2026-02-16 11:56:09'),(22,'MKTG-OTH-20260217-001-JA',2,'Something5','Other','Marketing','generated','2026-02-17 09:41:38',NULL,'{\"notes\": \"\"}','2026-02-17 09:41:38'),(23,'MKTG-CTR-20260221-001-JA',1,'Something12','Contract','Marketing','generated','2026-02-21 00:30:42',NULL,'{\"notes\": \"kasdhka da dakdasl\"}','2026-02-21 00:30:42'),(24,'IT-RPT-20260221-001-JA',1,'Something12','Report','Information Technology','generated','2026-02-21 00:46:30',NULL,'{\"notes\": \"sfsvv \"}','2026-02-21 00:46:30'),(25,'IT-MEM-20260221-001-JA',1,'Document created after making chnages','Memo','Information Technology','generated','2026-02-21 00:49:22',NULL,'{\"notes\": \"This is the document to test DB update\"}','2026-02-21 00:49:22'),(26,'HR-INV-20260221-001-JA',2,'Something14','Invoice','Human Resources','generated','2026-02-21 00:59:46',NULL,'{\"notes\": \"Something 14 from non-admin user\"}','2026-02-21 00:59:46'),(49,'FIN-RPT-20260221-001-JA',2,'Important document after fixing auto-increment','Report','Finance','generated','2026-02-21 01:32:47',NULL,'{\"notes\": \"Let\'s see if the auto-increment works\"}','2026-02-21 01:32:47'),(50,'IT-RPT-20260222-001-JA',2,'Something11111','Report','Information Technology','generated','2026-02-22 10:40:27',NULL,'{\"notes\": \"\"}','2026-02-22 10:40:27'),(51,'MKTG-MEM-20260223-001-JA',1,'Some document','Memo','Marketing','generated','2026-02-23 11:24:38',NULL,'{\"notes\": \"\"}','2026-02-23 11:24:38');
/*!40000 ALTER TABLE `Documents_save2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lookup_types`
--

DROP TABLE IF EXISTS `lookup_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lookup_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup_types`
--

LOCK TABLES `lookup_types` WRITE;
/*!40000 ALTER TABLE `lookup_types` DISABLE KEYS */;
INSERT INTO `lookup_types` VALUES (1,'department','Departments','2026-02-24 07:56:03'),(2,'category','Categories','2026-02-24 07:56:03');
/*!40000 ALTER TABLE `lookup_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lookup_values`
--

DROP TABLE IF EXISTS `lookup_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lookup_values` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type_id` int NOT NULL,
  `label` varchar(150) NOT NULL,
  `value` varchar(150) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `lookup_values_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `lookup_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup_values`
--

LOCK TABLES `lookup_values` WRITE;
/*!40000 ALTER TABLE `lookup_values` DISABLE KEYS */;
/*!40000 ALTER TABLE `lookup_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lookups`
--

DROP TABLE IF EXISTS `lookups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lookups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookups`
--

LOCK TABLES `lookups` WRITE;
/*!40000 ALTER TABLE `lookups` DISABLE KEYS */;
/*!40000 ALTER TABLE `lookups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `department` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_admin` tinyint(1) DEFAULT '0',
  `email_verified` tinyint(1) DEFAULT '0',
  `verification_token` varchar(100) DEFAULT NULL,
  `reset_token` varchar(512) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `users_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jehanzeb.azmat@esigmatech.com','$2a$10$4xerAKVFoaR5Es/076gRy.4wi4RDKKkhLOuPnuPV8URz3hwLUHe4a','Jehanzeb Azmat','IT',1,0,0,NULL,NULL,NULL,'2026-02-15 15:03:19','2026-02-15 15:03:19'),(2,'jazmat@icloud.com','$2b$10$IblNkXRrwkGg5VGMfDrMa.iIjZTZChKP.FOT.VbbGA1jzgq5YDQA6','Jehanzeb Azmat',NULL,1,1,0,NULL,NULL,NULL,'2026-02-15 19:14:26','2026-02-17 09:42:56');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-25 17:34:46
