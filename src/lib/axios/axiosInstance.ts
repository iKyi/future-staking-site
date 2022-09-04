// import { store } from "app/store";
import { store } from "app/store";
import axios from "axios";
import { newSnackbar } from "features/global/globalSlice";

const axiosInstance = axios.create({
  timeout: 120000,
});

axiosInstance.interceptors.response.use(
  function (response: any) {
    // ends here
    // bind message to snackbar
    const { message } = response;
    if (message) {
      store.dispatch(
        newSnackbar({
          id: `ApiCall${Math.random()}`,
          content: message,
          variant: "info",
        })
      );
    }

    return response;
  },
  function (error) {
    // bind for error message snackbar
    const errorMessage =
      error.response?.data?.message ?? error?.message ?? null;
    if (errorMessage) {
      store.dispatch(
        newSnackbar({
          id: `ApiCall${Math.random()}`,
          content: errorMessage,
          variant: "error",
        })
      );
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
