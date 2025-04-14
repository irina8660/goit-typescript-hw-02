import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value.trim();

    if (query === "") {
      toast.error("Please enter a search term!");
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.form_search}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder=" Search images and photos..."
          className={s.form_search__input}
        />
        <button type="submit" className={s.form_search__button}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
