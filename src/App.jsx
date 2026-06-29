
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Weather from "./components/pages/Weather";
import TodoList from "./components/pages/TodoList";
import Faq from "./components/pages/Faq";
import Product from "./components/pages/Product";
import ProductDetails from "./components/pages/ProductDetails";

export default function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/todo-list" element={<TodoList />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Routes>

    </BrowserRouter>
  );
}