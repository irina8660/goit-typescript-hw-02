import { memo, useMemo } from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ items, onImageClick }) => {
  const imageList = useMemo(() => {
    return items.map((item) => (
      <ImageCard key={item.id} item={item} onClick={onImageClick} />
    ));
  }, [items, onImageClick]);

  return <ul className={s.gallery}>{imageList}</ul>;
};

export default memo(ImageGallery);
