import { memo, useMemo } from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import { Item } from "../types";

interface ImageGalleryProps {
  items: Item[];
  onImageClick: (item: Item) => void;
}

const ImageGallery = ({ items, onImageClick }: ImageGalleryProps) => {
  const imageList = useMemo(() => {
    return items.map((item) => (
      <ImageCard key={item.id} item={item} onClick={onImageClick} />
    ));
  }, [items, onImageClick]);

  return <ul className={s.gallery}>{imageList}</ul>;
};

export default memo(ImageGallery);
