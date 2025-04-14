import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import s from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

const PER_PAGE = 12;

function App() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchImages = async (searchQuery, page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: searchQuery,
            page: page,
            per_page: PER_PAGE,
            client_id: "b1V2aaOcjtxbjdPMfheZtxW3Ez6LB3TEO1KbyHXp3j4", // заміни на свій ключ
          },
        }
      );

      const results = response.data.results;

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

  const handleSearch = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setGalleryItems([]);
    fetchImages(newQuery, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
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
