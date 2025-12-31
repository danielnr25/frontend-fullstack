import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, getCategoryById,updateCategory } from "@/services/category.service";
import { toast } from "react-toastify";
import { useEffect } from "react";

const CategoriesForm = ({ initialData = {} }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
  });
const onchangeBack = () => {
    navigate("/admin/categories");
  };

   useEffect(() => {
    if (id) {
      const fetchCategoryData = async () => {
        try {
          const category = await getCategoryById(id);
          setFormData({
            name: category.nombre || "",
            description: category.descripcion || ""
          })
        } catch (error) {
            toast.error(error.message)
            onchangeBack();
        }
    };

      fetchCategoryData();
    }
   }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await updateCategory(id,formData);
        toast.success(response.message);
      } else {
        const response = await createCategory(formData);
        toast.success(response.message);
      }
      onchangeBack(); // listado de categorias
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">
          {id ? "Editar Categoría" : "Nueva Categoría"}
        </h2>
        <button
          className="text-blue-600 hover:underline"
          onClick={onchangeBack}
        >
          Regresar
        </button>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ingresa el nombre de la categoría"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ingresa una descripción"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {id ? "Actualizar Categoría" : "Crear Categoría"}
        </button>
      </form>
    </>
  );
};

export default CategoriesForm;
