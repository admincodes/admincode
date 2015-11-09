CREATE DATABASE  IF NOT EXISTS `admincode` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `admincode`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: 172.2.1.95    Database: admincode
-- ------------------------------------------------------
-- Server version	5.6.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `TB_USER`
--

DROP TABLE IF EXISTS `TB_USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TB_USER` (
  `USER_SEQ` int(11) NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PASSWORD` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `USER_ID` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `REG_DATE` datetime DEFAULT NULL,
  `UP_DATE` datetime DEFAULT NULL,
  `DEL_YN` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `COMMENT` varchar(4000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `USER_EMAIL` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`USER_SEQ`)
) ENGINE=InnoDB AUTO_INCREMENT=1015 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='사용자 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TB_USER`
--

LOCK TABLES `TB_USER` WRITE;
/*!40000 ALTER TABLE `TB_USER` DISABLE KEYS */;
INSERT INTO `TB_USER` VALUES (1000,'박민우','aaaa','minwoo','2015-05-23 22:58:26','2015-05-23 22:58:26','N',NULL,NULL),(1003,'정상화','aaaa','jjhangu','2015-05-23 23:03:20','2015-05-23 23:03:20','N',NULL,NULL),(1004,'test','password','test','2015-06-15 22:43:49','2015-06-15 22:43:49','N','','email@naver.com'),(1005,'hoho','32',NULL,'2015-06-15 23:01:43','2015-06-15 23:01:43','N','','jjhangu@naver.com'),(1006,'hoho','32',NULL,'2015-06-15 23:03:06','2015-06-15 23:03:06','N','','jjhangu@naver.com'),(1007,'hoho','32',NULL,'2015-06-16 23:44:49','2015-06-16 23:44:49','N','','jjhangu@naver.com'),(1008,'쯔앙구','pw',NULL,'2015-06-22 14:37:55','2015-06-22 14:37:55','N','','jjhangu@naver.com'),(1009,'asdf','asdf',NULL,'2015-06-22 14:43:21','2015-06-22 14:43:21','N','','jjhagu@naver.com'),(1010,'asdfasdf','asdfasdf',NULL,'2015-06-22 14:44:48','2015-06-22 14:44:48','N','','jjhangu@naver.com1'),(1011,'admincode','dntjd123',NULL,'2015-06-22 17:43:53','2015-06-22 17:43:53','N','','mwpark'),(1012,'험프티','gjwlsdud',NULL,'2015-06-23 17:17:23','2015-06-23 17:17:23','N','','gogakaka@naver.com'),(1013,'mwpark','qkralsdn',NULL,'2015-07-01 08:31:13','2015-07-01 08:31:13','N','','mwpark@signetics.com'),(1014,'test.org','qwerty',NULL,'2015-07-28 11:53:37','2015-07-28 11:53:37','N','','test@test.org');
/*!40000 ALTER TABLE `TB_USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-09 23:06:18
