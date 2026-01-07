import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@/shared/Pagination";
import ProductList from "./ProductsList";
import { allProduct,searchProduct } from "@/services/product.service";

const ProductIndex = () => {

   const [searchTerm, setSearchTerm] = useState("");
   const [products, setProducts] = useState([]);
   const [allProducts, setAllProducts] = useState([]);
   const [message, setMessage] = useState("");

   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const [totalItems, setTotalItems] = useState(0);
   const limit = 10;

   useEffect(() => {
      const fetchProducts = async (pageNumber) => {
         try {
            const response = await allProduct(pageNumber, limit);
            setAllProducts(response.products);
            setProducts(response.products);
            setTotalPages(response.pagination.totalPages);
            setTotalItems(response.pagination.totalItems);
         } catch (error) {
            setMessage(error.message);
         }
      }
      fetchProducts();
   }, [page]);

   const navigate = useNavigate();
   const handleNewProduct = () => {
      navigate("/admin/products/new"); // Ajusta esta ruta según tu estructura
   };

   const handleSearch = async () => {
      if (!searchTerm.trim()) {
         setProducts(allProducts)
         setMessage("");
         return
      }

      try {
         const response = await searchProduct(searchTerm);
         if (response.data.length > 0) {
            setProducts(response.data);
            setTotalPages(1);
            setTotalItems(response.data.length);
            setMessage("");
         } else {
            setProducts([])
            setMessage(response.message)
            setTotalPages(1);
            setTotalItems(0);
         }
      } catch (error) {
         setMessage(error.message);
      }
   }

   return (
      <>
         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
               🛒 Listado de Productos
            </h1>
         </div>

         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
               <button
                  onClick={handleNewProduct}
                  className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 cursor-pointer"
               >
                  <i className="fas fa-plus mr-2"></i>
                  Nuevo
               </button>

               <div className="relative w-full sm:w-64">
                  <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                  <input
                     type="text"
                     onChange={(e) => setSearchTerm(e.target.value)}
                     value={searchTerm}
                     placeholder="Buscar producto..."
                     className="w-full border border-gray-300 pl-9 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
               </div>
            </div>

            <button onClick={handleSearch} className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 cursor-pointer">
               <i className="fas fa-search mr-2"></i>
               Buscar
            </button>
         </div>

         <hr className="my-6 border-gray-200" />
          {message ? (
            <p className="text-yellow-500 text-center font-semibold text-2xl">{message}</p>
         ) : (
            <div>
               <ProductList products={products} />
               <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  totalItems={totalItems}
               />
            </div>
         )}
      </>
   )
}

export default ProductIndex