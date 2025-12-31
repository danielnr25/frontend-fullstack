import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoriesList from "./CategoriesList";
import Pagination from "@/shared/Pagination";
import { searchCategory,allCategory } from "@/services/category.service";
const CategoriesIndex = () => {
   const navigate = useNavigate();
   const [searchTerm, setSearchTerm] =useState("");
   const [categories, setCategories] = useState([]);
   const [allCategories, setAllCategories] = useState([]);
   const [message, setMessage] = useState("");

   const [page, setPage] = useState(1);
   const [totalPages,setTotalPages] = useState(1);
   const [totalItems,setTotalItems] = useState(0);
   const limit = 10;

   useEffect(()=>{
      const fetchCategories = async(pageNumber) => {
         try {
            const response = await allCategory(pageNumber,limit)
            setAllCategories(response.categories)
            setCategories(response.categories)
            setTotalPages(response.pagination.totalPages)
            setTotalItems(response.pagination.totalItems)
            setMessage("");
         } catch (error) {
            setMessage(error.message);
         }
      }
      
      fetchCategories();
   },[page])

   const handleNewCategory = () => {
      navigate("/admin/categories/new")
   }

   const handleSearch = async() =>{
      if(!searchTerm.trim()){
         setCategories(allCategories)
         setMessage("")
         return
      }

      try {
         const response = await searchCategory(searchTerm)
         if(response.data.length > 0){
            console.log(response.data)
            setCategories(response.data)
            setTotalItems(response.data.length)
            setTotalPages(1);
            setMessage("");
         }else{
            setCategories([])
            setTotalPages(1)
            setTotalItems(0)
            setMessage(response.data.message)
         }
      } catch (error) {
         setMessage(error.message)
      }
   }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          🗂️ Listado de Categorías
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 cursor-pointer"
          onClick={handleNewCategory}
          >
            <i className="fas fa-plus mr-2"></i>
            Nuevo
          </button>

          <div className="relative w-full sm:w-64">
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            <input
              type="text"
              value={searchTerm}
              placeholder="Buscar categorías..."
              onChange={(e)=> setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 pl-9 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <button 
         onClick={handleSearch}
         className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 cursor-pointer">
          <i className="fas fa-search mr-2"></i>
          Buscar
        </button>
      </div>
      <hr className="my-6 border-gray-200" />

      {message ? (
            <p className="text-yellow-500 text-center font-semibold text-2xl">{message}</p>
         ) : (
            <div>
               <CategoriesList categories={categories} />
               <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  totalItems={totalItems}
               />
            </div>
         )}
    </>
  );
};

export default CategoriesIndex;
