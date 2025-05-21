import { useState } from "react";
import axios from "axios";
import { AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import s from "./App.module.css";
import { Item } from "../types";

const PER_PAGE = 12;

function App() {
  const [galleryItems, setGalleryItems] = useState<Item[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Item | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const fetchImages = async (
    searchQuery: string,
    page: number
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<{
        results: Item[];
        total: number;
        total_pages: number;
      }> = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: searchQuery,
          page: page,
          per_page: PER_PAGE,
          client_id: "b1V2aaOcjtxbjdPMfheZtxW3Ez6LB3TEO1KbyHXp3j4",
        },
      });
      console.log(response);

      const results: Item[] = response.data.results;

      if (results.length === 0 && page === 1) {
        toast.error("No images found. Try another query.");
        return;
      }
      setGalleryItems((prev) => (page === 1 ? results : [...prev, ...results]));
      setHasMore(results.length === PER_PAGE);
    } catch (error) {
      console.log(error);
      toast.error("Oops! Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (newQuery: string): void => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setGalleryItems([]);
    fetchImages(newQuery, 1);
  };

  const handleLoadMore = (): void => {
    const nextPage: number = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const openModal = (image: Item): void => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={s.container}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {galleryItems.length > 0 && (
        <ImageGallery items={galleryItems} onImageClick={openModal} />
      )}
      {isLoading && <Loader />}
      {hasMore && galleryItems.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}

export default App;
