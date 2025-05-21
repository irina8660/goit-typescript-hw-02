import s from "./ImageCard.module.css";
import { Item } from "../types";

interface ImageCardProps {
  item: Item;
  onClick: (item: Item) => void;
}

const ImageCard = ({ item, onClick }: ImageCardProps) => {
  console.log(item);
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
