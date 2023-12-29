import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css"; // Assurez-vous d'importer la feuille de style Bootstrap
import CustomModal from "./dashboard-modal";
import "../../styles/dashboard.css"

const Dashboard = () => {
    const { handleSubmit, register, reset } = useForm();
    const [articles, setArticles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedArticles = articles.slice(startIndex, endIndex);
    const totalPages = Math.ceil(articles.length / itemsPerPage);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/admins/dashboard", {
                    headers: {
                        Authorization: JSON.parse(localStorage.getItem("ADMIN")),
                    },
                });
                console.log(response.data.message);
                toast.success(response.data.message);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data" + error.message);
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/projects/get`)
            .then((res) => {
                setArticles(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const deleteArticle = (articleId) => {
        console.log(articleId);
        axios.delete(`http://localhost:8080/projects/delete/${articleId}`)
            .then((res) => {
                toast.success('suppression reussie');
                setArticles(articles.filter((article) => article.id !== articleId))
            })
            .catch((err) => console.log(err));
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('date', new Date());
        formData.append('image', data.image[0]);

        try {
            const response = await fetch('http://localhost:8080/projects/create', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête HTTP');
            }

            const result = await response.json();
            toast.success('Ajout réussi');
        } catch (error) {
            toast.error('Erreur lors de l\'ajout : ' + error.message);
        }

        reset();
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToIdPage = (id) => {
        if (id > 0 && id <= totalPages) {
            setCurrentPage(id);
        }
    };

    const handleShowModal = (article) => {
        setSelectedArticle(article);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedArticle([]);
        setShowModal(false);
    };

    return (
        <>
            <h1 className="mt-4 text-center">Dashboard</h1>
            <div className="container mt-4">
                <div>
                    <div className="row">
                        <div className="card" style={{ width: '100%' }}>
                            <div className="card-body" style={{ margin: '0' }}>
                                <h2 className="card-title">Ajoutez un article</h2>
                                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                    <input type="text" className="form-control mb-3" {...register("name")} />
                                    <input type="text" className="form-control mb-3" {...register("description")} />
                                    <input
                                        id="file-input"
                                        className="form-control mb-3"
                                        type="file"
                                        accept="image/*"
                                        {...register("image")}
                                    />
                                    <button type="submit" className="btn btn-primary py-2 my-3 w-100">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ margin: '0 auto' }}>
                        {displayedArticles.map((article, index) => (
                            <div className="card mb-3" key={index} style={{ margin: '0 auto', textAlign: 'center', width:'30%' }}>
                                <img
                                    className="card-img-top reduced-image"
                                    src={`http://localhost:8080/images/projects/${article.image}`}
                                    alt={article.title}
                                    style={{ marginTop: '10px' }}
                                />
                                <div className="card-body">
                                    <h3 className="card-title">{article.title}</h3>
                                    <p className="card-text">{article.description}</p>
                                    <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                                        <button className="btn btn-danger" onClick={() => deleteArticle(article.id)}>
                                            Supprimer
                                        </button>
                                        <button className="btn btn-info" onClick={() => handleShowModal(article)}>
                                            Éditer
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <nav className="navPagination" aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={goToPreviousPage}>
                            <button className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li className={`page-item ${index + 1 === currentPage ? 'active' : ''}`} key={index}>
                                <button className="page-link" onClick={() => goToIdPage(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} onClick={goToNextPage}>
                            <button className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <CustomModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                onSubmit={onSubmit}
                selectedArticle={selectedArticle}
            />
        </>
    );
}

export default Dashboard;