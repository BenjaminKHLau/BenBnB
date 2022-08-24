import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSpotFormComponent from '.';

function CreateSpotModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>CREATE A SPOT</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotFormComponent />
        </Modal>
      )}
    </>
  );
}

export default CreateSpotModal;