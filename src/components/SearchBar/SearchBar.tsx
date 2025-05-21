import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = (
      form.elements.namedItem("search") as HTMLInputElement
    ).value.trim();

    if (query === "") {
      toast.error("Please enter a search term!");
      return;
    }

    onSubmit(query);
    form.reset();
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
