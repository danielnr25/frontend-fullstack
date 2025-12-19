
const Dashboard = () => {
  return (
   <div className="flex">
      <aside className="flex flex-col w-64 min-h-screen bg-gray-800 text-white transition-all duration-300">

         <div className="flex items-center justify-between px-4 py-6">
            <span className="text-xl font-semibold">
            Dashboard
            </span>

            <button className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-md hover:bg-gray-600">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="w-6 h-6 transition-transform duration-300"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 12h16M4 6h16M4 18h16"
               />
            </svg>
            </button>
         </div>

         <nav className="flex flex-col flex-grow space-y-2 px-2">

            <div className="flex items-center space-x-4 px-4 py-2 rounded-md bg-blue-700 text-white">
            <div className="w-6 h-6 bg-gray-500 rounded"></div>
            <span>Inicio</span>
            </div>

            <div className="flex items-center space-x-4 px-4 py-2 rounded-md text-gray-400 hover:bg-gray-700 transition-all">
            <div className="w-6 h-6 bg-gray-500 rounded"></div>
            <span>Ventas</span>
            </div>

            <div className="flex items-center space-x-4 px-4 py-2 rounded-md text-gray-400 hover:bg-gray-700 transition-all">
            <div className="w-6 h-6 bg-gray-500 rounded"></div>
            <span>Productos</span>
            </div>

            <div className="flex items-center space-x-4 px-4 py-2 rounded-md text-gray-400 hover:bg-gray-700 transition-all">
            <div className="w-6 h-6 bg-gray-500 rounded"></div>
            <span>Categorías</span>
            </div>

         </nav>

         <div className="px-4 py-4">
            <button className="w-full px-4 py-2 text-sm font-medium text-gray-200 bg-red-700 rounded-lg hover:bg-red-600">
            Cerrar sesión
            </button>
         </div>
      </aside>

      <main className="flex-grow p-6 bg-gray-100">
         <div className="bg-white rounded-lg shadow p-6">
            Contenido principal
         </div>
      </main>

   </div>
  )
}

export default Dashboard