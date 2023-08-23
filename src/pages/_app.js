import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "./index.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
