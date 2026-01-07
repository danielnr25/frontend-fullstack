import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { deleteByProduct } from "@/services/product.service";
import { toast } from 'react-toastify';
const ProductList = ({products}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null)

  const openModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false)
  }

  const deleteProduct = async () => {
    if (!setSelectedProduct) return
    try {
      const response = await deleteByProduct(selectedProduct.id)
      toast.success(response.message);
      setSelectedProduct(null);
      //setCategories(categories.filter((cat)=>cat.id !== selectedCategory.id))
      //await deleteCategory(selectedCategory.id)
      closeModal();
    } catch (err) {
      toast.error(err.message);
    }
  }

  const handleEditProduct = (id) => {
    navigate(`/admin/products/edit/${id}`);
  }


  return (
    <div>
      <table className="w-full border border-gray-100 roundend-sm">
        <thead className="bg-indigo-700 text-white">
          <tr className="text-center uppercase text-base">
            <th className="px-4 py-2">Categoria</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Imagen</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-base font-medium text-center">
          {products.map((product) => (
            <tr
              key={product.id}
              className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <td className="py-3">{product.categorianombre}</td>
              <td className="py-3">{product.nombre}</td>
              <td className="py-3">{product.stock}</td>
              <td className="py-3">{product.precio}</td>
              <td className="py-3">
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="w-20 h-20 object-cover rounded-md mx-auto"
                />
              </td>
                <td className="py-3 space-x-4">
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="bg-yellow-600 text-white px-3 py-1.5 rounded-md cursor-pointer"
                  >Editar</button>
                  <button
                    onClick={() => openModal(product)}
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
            <h2 className="text-lg font-semibold mb-4">Confirmar eliminación</h2>
            <p>
              ¿Estás seguro de que deseas eliminar el producto{" "}
              <strong>{selectedProduct?.nombre}</strong>?
            </p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={deleteProduct}
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

export default ProductList