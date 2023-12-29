// Importation des dépendances express, body-parser et cors
// Nouvelle version 
// import express from "express";
// Ancienne version
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const adminsRoutes = require('./routes/admins.route');
const projectsRoutes = require('./routes/projects.route');
const cors = require('cors');
const path = require('path');

// Connection a la base de données
const connectDb = require('./config/db');

// Middlewares
const app = express();

// Use app Express
app.use(express.json());

// Use bodyParser
app.use(bodyParser.json());

// Permet de décripter des URL
app.use(bodyParser.urlencoded({extended: true}));

// Middlewares cookieParser
app.use(cookieParser());

// Use cors
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
})
);

// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/admins', adminsRoutes);
app.use('/projects', projectsRoutes);


// Configuration et lancement du serveur
const start = async () => {
    try {
        await connectDb();
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`le serveur à démarré sur le port ${port}`);

        })
    } catch (error) {
        console.log(`Erreur lors du démarrage du serveur`);
    }
};

start();