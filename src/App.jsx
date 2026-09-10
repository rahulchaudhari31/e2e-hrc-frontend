import Approuter from "./Router/Approuter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Approuter />
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;