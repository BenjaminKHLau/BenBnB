// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
// import LoginForm from './LoginForm';
import EditSpotFormComponent from '.';
import { useSelector } from 'react-redux';

function EditFormModal({ spotId }) {
  const [showModal, setShowModal] = useState(false);

  const allSpots = useSelector(state => state.spots)

  useEffect(()=> {
    setShowModal(false)
  }, [allSpots])

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotFormComponent spotId={spotId}/>
        </Modal>
      )}
    </>
  );
}

export default EditFormModal;