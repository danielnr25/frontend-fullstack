import AppRouter from "@/routes/AppRouter"
import { ToastContainer } from "react-toastify";
const App = () => {
  return (<div>
      <AppRouter />
      <ToastContainer
         position="top-right"
         autoClose={3000}
         hideProgressBar={false}
         newestOnTop={true}
         closeOnClick
         pauseOnHover
         draggable
         theme="colored"
      />

  </div>)
}

export default App