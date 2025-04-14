import s from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <p className={s.error}>Something went wrong. Please try again later.</p>
  );
};

export default ErrorMessage;
