/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.21 : Database - ktv
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ktv` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `ktv`;

/*Table structure for table `tb_classify` */

DROP TABLE IF EXISTS `tb_classify`;

CREATE TABLE `tb_classify` (
  `classifyId` int(4) NOT NULL COMMENT '分类id',
  `classifyName` varchar(30) NOT NULL COMMENT '分类名',
  PRIMARY KEY (`classifyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_classify` */

/*Table structure for table `tb_depart` */

DROP TABLE IF EXISTS `tb_depart`;

CREATE TABLE `tb_depart` (
  `departId` int(4) unsigned NOT NULL AUTO_INCREMENT COMMENT '部门id',
  `departName` varchar(20) NOT NULL COMMENT '部门名称',
  PRIMARY KEY (`departId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_depart` */

/*Table structure for table `tb_staff` */

DROP TABLE IF EXISTS `tb_staff`;

CREATE TABLE `tb_staff` (
  `endTime` timestamp NULL DEFAULT NULL COMMENT '离职时间',
  `staffId` int(4) unsigned NOT NULL AUTO_INCREMENT COMMENT '员工id',
  `staffName` varchar(20) DEFAULT NULL COMMENT '员工姓名',
  `departId` int(4) unsigned NOT NULL COMMENT '部门id',
  `phone` varchar(12) NOT NULL COMMENT '员工电话',
  `startTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '入职时间',
  `isDimission` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否离职，0 否， 1 是',
  PRIMARY KEY (`staffId`),
  KEY `departId` (`departId`),
  CONSTRAINT `tb_staff_ibfk_1` FOREIGN KEY (`departId`) REFERENCES `tb_depart` (`departId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_staff` */

/*Table structure for table `tb_user` */

DROP TABLE IF EXISTS `tb_user`;

CREATE TABLE `tb_user` (
  `userId` char(32) NOT NULL COMMENT '用户id',
  `sex` tinyint(1) unsigned DEFAULT '0' COMMENT '性别， 0 表示男 1 表示女',
  `age` tinyint(4) unsigned DEFAULT NULL COMMENT '年龄',
  `phone` varchar(12) NOT NULL COMMENT '电话号码',
  `isBlock` tinyint(1) unsigned DEFAULT '0' COMMENT '黑名单，0 非黑名单 1 是',
  `userName` varchar(20) NOT NULL COMMENT '唯一 用户名',
  `password` varchar(30) NOT NULL COMMENT '密码',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
