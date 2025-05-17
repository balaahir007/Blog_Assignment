import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
  import { ToastContainer } from 'react-toastify';
import BlogPage from "./pages/BlogPage";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-blog" element={<BlogPage/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
};

export default App;
