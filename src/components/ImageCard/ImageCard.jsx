import s from "./ImageCard.module.css";

const ImageCard = ({ item, onClick }) => {
  const { id, alt_description, urls } = item;

  return (
    <div className={s.card} onClick={() => onClick(item)}>
      <img
        id={id}
        src={urls.small}
        alt={alt_description || "Image"}
        className={s.image}
      />
      <p className={s.description}>{alt_description || "No description"}</p>
    </div>
  );
};

export default ImageCard;
