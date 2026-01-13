import { Slide, toast } from "react-toastify";

export const showToast = ({ text, type, position, autoClose }) => {
  toast(text, {
    type,
    theme: "colored",
    transition: Slide,
    pauseOnHover: true,
    hideProgressBar: true,
    autoClose: autoClose ?? 5000,
    position: position ?? "bottom-right",
  });
};
