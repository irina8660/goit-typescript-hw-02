import Modal from "react-modal";
import s from "./ImageModal.module.css";
import { Item } from "../types";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Item | null;
}

function ImageModal({ isOpen, onClose, image }: ImageModalProps) {
  if (!image) return null;
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
      <img src={image?.urls?.regular} alt={image?.alt_description || "Image"} />
    </Modal>
  );
}

export default ImageModal;
