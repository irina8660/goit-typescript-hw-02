import Modal from "react-modal";
import PropTypes from "prop-types";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

function ImageModal({ isOpen, onClose, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <button className={s.closeButton} onClick={onClose}>
        &times;
      </button>
      <img src={image?.urls?.regular} alt={image?.alt_description} />
    </Modal>
  );
}

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.object,
};

export default ImageModal;
