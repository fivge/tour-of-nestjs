CREATE TABLE `photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `filename` varchar(255) NOT NULL,
  `views` int(11) NOT NULL,
  `isPublished` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;