import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Export a function to show toast notifications
export const showToast = (message, language = "ar", autoClose = 2500) => {
  toast.success(message[language], {
    position: "top-right",
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
