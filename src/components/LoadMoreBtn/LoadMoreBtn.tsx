import s from "./LoadMoreBtn.module.css";
interface LoadMoreBtnProps {
  onClick: () => void;
}
const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps) => {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
