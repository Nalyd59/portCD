const mysql = require('mysql');
const sharp = require('sharp');
const fs = require('fs');
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// creer un nouveau projet
const createProjects = (req, res) => {
    const ArticleObject = {
        title: req.body.name,
        image: null,
        description: req.body.description,
        date: req.body.date
    };
    if (req.file) {
        sharp(req.file.buffer)
            .toBuffer()
            .then((webpData) => {
                const webpFileName = `webp_${Date.now()}.webp`;
                fs.writeFile(`images/projects/${webpFileName}`, webpData, (err) => {
                    if (err) {
                        return res.status(500).json({ error: "Erreur lors de l'enregistrement de l'image WebP." });
                    }

                    ArticleObject.image = webpFileName;

                    const sqlQuery = "INSERT INTO projects (title, image, description, date) VALUES (?, ?, ?, ?)";
                    conn.query(sqlQuery, [ArticleObject.title, ArticleObject.image, ArticleObject.description, ArticleObject.date], (error, results) => {
                        if (error) {
                            return res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout de l'article." });
                        }
                        const newArticleId = results.insertId;
                        return res.status(201).json({ message: "L'article a été ajouté avec succès.", articleId: newArticleId });
                    });
                });
            })
            .catch((error) => {
                res.status(500).json({ error: "Erreur lors de la conversion de l'image en WebP." });
            });
    } else {
        return res.status(400).json({ error: "Veuillez fournir une image." });
    }
};
// modifier un projet
const putProject = (req, res) => {
    const projectId = req.params.id; // En supposant que l'ID du projet est passé en tant que paramètre d'itinéraire

    // Vérifier si l'ID du projet est fourni
    if (!projectId) {
        return res.status(400).json({ error: "Veuillez fournir l'identifiant du projet à mettre à jour." });
    }

    // Construire les données mises à jour du projet à partir du corps de la requête
    const updatedProject = {
        title: req.body.name || null, // Utiliser null si le champ est vide
        image: null,
        description: req.body.description || null, // Utiliser null si le champ est vide
        date: req.body.date || null, // Utiliser null si le champ est vide
    };

    // Vérifier si une nouvelle image est fournie pour la mise à jour
    if (req.file) {
        sharp(req.file.buffer)
            .toBuffer()
            .then((webpData) => {
                const webpFileName = `webp_${Date.now()}.webp`;
                fs.writeFile(`images/projects/${webpFileName}`, webpData, (err) => {
                    if (err) {
                        return res.status(500).json({ error: "Erreur lors de l'enregistrement de la nouvelle image WebP." });
                    }

                    updatedProject.image = webpFileName;

                    const sqlMessage = `SELECT image FROM articles WHERE id = ?`;
                    const sqlQuery = "UPDATE projects SET title = IFNULL(?, title), image = IFNULL(?, image), description = IFNULL(?, description), date = IFNULL(?, date) WHERE id = ?";
                    const sqlValues = [updatedProject.title, updatedProject.image, updatedProject.description, updatedProject.date, projectId];

                    conn.query(sqlMessage, [projectId], (error, results) => {
                        if (error) {
                            res.json({ error });
                        } else {
                            const imagePath = `../images/projects/${results[0].image}`;
                            fs.unlinkSync(imagePath)
                            conn.query(sqlQuery, sqlValues, (error, results) => {
                                if (error) {
                                    return res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du projet." });
                                }
                                return res.status(200).json({ message: "Le projet a été mis à jour avec succès." });
                            });
                        }
                    });
                });
            })
            .catch((error) => {
                res.status(500).json({ error: "Erreur lors de la conversion de la nouvelle image en WebP." });
            });
    } else {
        // Si aucune nouvelle image n'est fournie, mettre à jour les données du projet en excluant l'image
        const sqlQuery = "UPDATE projects SET title = IFNULL(?, title), description = IFNULL(?, description), date = IFNULL(?, date) WHERE id = ?";
        const sqlValues = [updatedProject.title, updatedProject.description, updatedProject.date, projectId];

        conn.query(sqlQuery, sqlValues, (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du projet." });
            }
            return res.status(200).json({ message: "Le projet a été mis à jour avec succès." });
        });
    }
};
// recuperer les Projets
const getProjects = (req, res) => {
    const query = 'SELECT id, title, image, description, link FROM `projects`;';
    conn.query(query, (err, result) => {
        if (err) {
            console.error('Erreur de la récupération des données ' + err);
            res.status(500).json({ error: 'Erreur lors de la récupération des projets' });
        } else {
            res.status(200).json(result);
        }
    })
}
// recuperer un projet
const getOneProjects = (req, res) => {

};
// supprimer les Projets
const deleteProjects = (req, res) => {

}
// supprimer un projet
const deleteOneProjects = (req, res) => {
    const projectId = req.params.id;
    const sqlQuery = `DELETE FROM projects WHERE id = ?`;
    const sqlMessage = `SELECT image FROM projects WHERE id = ?`;

    conn.query(sqlMessage, [projectId], (error, results) => {
        if (error) {
            res.json({ error });
        } else {
            conn.query(sqlQuery, [projectId], (error, results) => {
                if (error) {

                    res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de l\'article.' });

                } else {
                    if (results.affectedRows > 0) {
                        res.status(200).json({ message: 'L\'article a été supprimé avec succès.' });
                    } else {
                        res.status(404).json({ error: 'L\'article avec l\'ID spécifié n\'a pas été trouvé.' });
                    }
                }
            });
        }
    });
}


module.exports = {
    createProjects,
    putProject,
    getProjects,
    getOneProjects,
    deleteProjects,
    deleteOneProjects
};