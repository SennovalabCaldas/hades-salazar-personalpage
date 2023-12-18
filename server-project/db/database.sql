CREATE DATABASE IF NOT EXISTS hades_site_db;

USE hades_site_db;

CREATE TABLE
    users (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        current_password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        active BOOLEAN NOT NULL,
        phone_number VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );

DESCRIBE users;

CREATE TABLE
    slides (
        id INT NOT NULL AUTO_INCREMENT,
        slide_title VARCHAR(255) NOT NULL,
        slide_description VARCHAR(255) NOT NULL,
        slide_image VARCHAR(255) NOT NULL,
        active BOOLEAN NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );

DESCRIBE slides;

CREATE TABLE
    categoryServices (
        id INT NOT NULL AUTO_INCREMENT,
        category_name VARCHAR(255) NOT NULL,
        active BOOLEAN NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );

DESCRIBE categoryServices;

CREATE TABLE
    services (
        id INT NOT NULL AUTO_INCREMENT,
        service_name VARCHAR(255) NOT NULL,
        service_description VARCHAR(255) NOT NULL,
        service_image VARCHAR(255) NOT NULL,
        service_price VARCHAR(255) NOT NULL,
        active BOOLEAN NOT NULL,
        category_id INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (category_id) REFERENCES categoryServices (id)
    );

DESCRIBE services;

CREATE TABLE
    academicExperience (
        id INT NOT NULL AUTO_INCREMENT,
        academic_name VARCHAR(255) NOT NULL,
        academic_description VARCHAR(255) NOT NULL,
        academic_image VARCHAR(255),
        year_of_experience INT NOT NULL,
        active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );

DESCRIBE academicExperience;

CREATE TABLE
    professionalExperience (
        id INT NOT NULL AUTO_INCREMENT,
        academic_name VARCHAR(255) NOT NULL,
        academic_description VARCHAR(255) NOT NULL,
        academic_image VARCHAR(255),
        year_start INT,
        year_end INT,
        active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );

DESCRIBE professionalExperience;

CREATE TABLE
    eventsCalendar (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        start DATETIME NOT NULL,
        end DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );

DESCRIBE eventsCalendar;