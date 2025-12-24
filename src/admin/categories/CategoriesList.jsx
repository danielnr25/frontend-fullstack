import { useNavigate } from "react-router-dom"

const CategoriesList = ({categories}) => {

   const navigate = useNavigate();

   const handleEditCategory = (id) => {
      navigate(`/admin/categories/edit/${id}`);
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
                        className="bg-red-600 text-white px-3 py-1.5 rounded-md cursor-pointer"
                     >Eliminar</button>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
    </div>
  )
}

export default CategoriesList