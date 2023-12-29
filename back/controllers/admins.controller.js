const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
const EMAIL =  process.env.EMAIL_ADMIN;
const KEY =  process.env.SECRET_KEY;

// Register a new user
const createUser = (req, res) => {
    // Utilise req.body de body-parser
    const { nom, prenom, date, mail, password } = req.body;
    // Vérifier si les champs sont remplis
    if (!mail || !password) {
        return res.status(400).json({
            error: 'Email ou mot de passe manquant',
        });
    }
    if (mail == EMAIL) {
        return res.status(400).json({
            error: 'Email deja utilisée',
        });
    }
    // Vérifier si les mdp avec les regex
    const passwordRegexMAJ = /[A-Z]/g;
    const passwordRegexMIN = /[a-z]/g;
    const passwordRegexNUM = /[1-9]/g;
    const passwordRegexSPE = /[^a-zA-Z\d]/g;
    let errorMessage = 'Le mot de passe doit contenir';

    if (!passwordRegexMAJ.test(password)) {
        return res.status(400).json({
            error: errorMessage + ' une majuscule.',
        });
    }
    if (!passwordRegexMIN.test(password)) {
        return res.status(400).json({
            error: errorMessage + ' une lettre en minuscule.',
        });
    }
    if (!passwordRegexNUM.test(password)) {
        return res.status(400).json({
            error: errorMessage + ' au moins un chiffre.',
        });
    }
    if (!passwordRegexSPE.test(password)) {
        return res.status(400).json({
            error: errorMessage + ' au moins un caractère spécial.',
        });
    }
    // Cryptage du password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const query = 'INSERT INTO `admin` (`nom`, `prenom`,`date`,`mail`, `password`) VALUES ( ?, ?, ?, ?, ?)';
        conn.query(query, [nom, prenom, date, mail, hashedPassword], (dbErr) => {
            if (dbErr) {
                return res.status(500).json({ error: dbErr.message });
            } else {
                res.status(200).json({ message: 'Utilisateur enregistré' });
            }
        });
    });
};

// Connexion admin 
const signUp = (req, res) => {
    const { email, password } = req.body;

    // Vérifier si les champs sont remplis
    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont requis' });
    }
    
    const query = 'SELECT * FROM `admin` WHERE `mail` = ?';

    conn.query(query, [email], (dbErr, results) => {
        if (dbErr) {
            return res.status(500).json({ error: dbErr.message });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }

        const admin = results[0];

        bcrypt.compare(password, admin.password, (bcryptErr, result) => {
            if (bcryptErr) {
                return res.status(500).json({ error: 'Erreur de comparaison de mot de passe' });
            }

            if (!result) {
                return res.status(401).json({ error: 'Mot de passe incorrect' });
            }

            // Le mot de passe est correct, générer un token JWT
            jwt.sign({ }, KEY, (jwtErr, token) => {
                if (jwtErr) {
                    return res.status(500).json({ error: 'Erreur de génération du token JWT' });
                }
                res.json({ message: token});
            });
        });
    });
};

// Dashboard
const dashboard = (req, res) => {

    const token = req.headers.authorization;

    if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
    }

    jwt.verify(token, KEY, (err, decoded) => {
    if (err) {
        return res.status(401).json({ error: 'Token invalide' });
    }
    });

    return res.status(200).json({message: "acces autoriser"})
};

module.exports = {
    signUp,
    createUser,
    dashboard
};