const ProductsIndex = () => {
  return (
       <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          🗂️ Listado de Productos
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 cursor-pointer">
            <i className="fas fa-plus mr-2"></i>
            Nuevo
          </button>

          <div className="relative w-full sm:w-64">
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full border border-gray-300 pl-9 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 cursor-pointer">
          <i className="fas fa-search mr-2"></i>
          Buscar
        </button>
      </div>
      <hr className="my-6 border-gray-200" />
    </>
  )
}

export default ProductsIndex