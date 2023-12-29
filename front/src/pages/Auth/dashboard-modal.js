import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CustomModal = ({ showModal, handleCloseModal, selectedArticle }) => {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('date', new Date());
    formData.append('image', data.image[0]);

    try {
        const response = await fetch(`http://localhost:8080/projects/put/${selectedArticle.id}`, {
            method: 'PUT',
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
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <div className="card-body p-4">
        <h2 className="card-title text-center">Modifier l'article {selectedArticle.id}</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Titre
            </label>
            <input type="text" className="form-control" {...register("name")} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" {...register("description")} />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input id="file-input" className="form-control" type="file" accept="image/*" {...register("image")} />
          </div>
          <Button type="submit" className="btn btn-primary py-1 my-3 w-100">
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CustomModal;