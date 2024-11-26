CREATE TABLE users (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    active tinyint(1) DEFAULT '1',
    password varchar(255) NOT NULL,
    createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    deactivatedAt datetime DEFAULT NULL,
    isTwoFAEnabled tinyint(1) DEFAULT '0',
    twoFACode varchar(6) DEFAULT '',
    twoFACodeExpiration datetime DEFAULT CURRENT_TIMESTAMP,
    passwordRecoveryCode varchar(255) DEFAULT NULL,
    recoveryCodeExpiration datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
);