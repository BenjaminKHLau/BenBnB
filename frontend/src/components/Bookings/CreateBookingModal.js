import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateBookingFormComponent from './CreateBooking';
import { useSelector } from 'react-redux';

function CreateBookingModal() {
  const [showModal, setShowModal] = useState(false);

  const allSpots = useSelector(state => state.spots)


  useEffect(()=> {
    setShowModal(false)
  }, [allSpots])

  return (
    <>
      <div className='create-spot-button' onClick={() => setShowModal(true)}>Book your visit!</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateBookingFormComponent />
        </Modal>
      )}
    </>
  );
}

export default CreateBookingModal;