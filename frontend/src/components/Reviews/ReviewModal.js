// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import LoginForm from './LoginForm';
import CreateReviewFormComponent from './NewReview';

function ReviewFormModal() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviewFormComponent closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default ReviewFormModal;