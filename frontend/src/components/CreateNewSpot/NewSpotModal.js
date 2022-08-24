import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSpotFormComponent from '.';
import { useSelector } from 'react-redux';

function CreateSpotModal() {
  const [showModal, setShowModal] = useState(false);

  const allSpots = useSelector(state => state.spots)


  useEffect(()=> {
    setShowModal(false)
  }, [allSpots])

  return (
    <>
      <button onClick={() => setShowModal(true)}>Become a Host</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotFormComponent />
        </Modal>
      )}
    </>
  );
}

export default CreateSpotModal;