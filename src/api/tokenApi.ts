import { toast } from "react-toastify";

export const getToken = (isTokenExpired = false) => {
  fetch(`${process.env.REACT_APP_TOKEN_API_URL}`)
    .then((response) => response.json())
    .then((tokenData) => {
      if (isTokenExpired && tokenData.success) {
        toast(
          "A new token has been successfully downloaded. Please try again"
        );
      }
      sessionStorage.setItem("abzagency_token", tokenData.token);
    }).catch((error) => {
      toast(error.message);
    });
};
