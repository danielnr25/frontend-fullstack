import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { deleteByCategory } from "@/services/category.service";
import { toast } from 'react-toastify';
const CategoriesList = ({categories}) => {

   const navigate = useNavigate();
   const [isModalOpen, setIsModalOpen] = useState(false); 
   const [selectedCategory, setSelectCategory] = useState();

   const handleEditCategory = (id) => {
      navigate(`/admin/categories/edit/${id}`);
   }

   const openModal = (category) => {
      setSelectCategory(category)
      setIsModalOpen(true);
   }

   const closeModal = () => {
      setSelectCategory(null)
      setIsModalOpen(false)
   }

   const deleteCategory = async() =>{
      if(!selectedCategory) return
      try{
         const response = await deleteByCategory(selectedCategory.id)
         toast.success(response.message)
         closeModal();
      }catch(err){
         toast.error(err.message || 'Error al eliminar la categoría ...')
      } 
   }
   

  return (
    <div>
      <table className="w-full border border-gray-100 roundend-sm">
        <thead className="bg-indigo-700 text-white">
          <tr className="text-center uppercase text-base">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
         <tbody className="text-base font-medium text-center">
            {categories.map((category)=>(
               <tr
                  key={category.id}
                  className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition-colors"
               >
                  <td className="py-3 uppercase">{category.nombre}</td>
                  <td className="py-3">{category.descripcion}</td>
                  <td>
                     <button 
                     onClick={()=>handleEditCategory(category.id)}
                        className="bg-yellow-600 mr-2 text-white px-3 py-1.5 rounded-md cursor-pointer">Editar</button>
                     <button
                        onClick={()=> openModal(category)}
                        className="bg-red-600 text-white px-3 py-1.5 rounded-md cursor-pointer"
                     >Eliminar</button>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>

      {isModalOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center border-b px-6 py-3">
              <h2 className="text-xl font-bold text-gray-800">Confirmar eliminación</h2>
              <button
               onClick={closeModal}   
               className="text-gray-500 hover:text-red-500 transition cursor-pointer"
              >
                <i className="fas fa-times text-lg"></i>X
              </button>
            </div>
            <div className="py-2 px-4">
              <p>
               ¿Estás seguro de que deseas eliminar la categoría{" "}
               <strong>{selectedCategory?.nombre}</strong>
              </p>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
               onClick={closeModal}
               className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
               onClick={deleteCategory}
                className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
               >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
         

    </div>
  )
}

export default CategoriesList