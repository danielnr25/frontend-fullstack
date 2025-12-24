import { ChartBarIcon, HomeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"
import { Link, useLocation, Outlet,useNavigate } from "react-router-dom"

const Dashboard = () => {

   const location = useLocation();
   const navigate = useNavigate();
   const isActive = (path) => location.pathname.startsWith(path); 

   const menuItems = [
      { name:"Inicio", icon:HomeIcon, path:"/admin/dashboard"},
      { name:"Categorias", icon:ShoppingBagIcon, path:"/admin/categories"},
      { name:"Productos", icon:ShoppingBagIcon, path:"/admin/products"},
      { name:"Ventas", icon:ChartBarIcon, path:"/admin/detailshop"},
   ];

   const handleLogout=() =>{
      localStorage.removeItem("token");
      navigate("/login");
   }

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

         <nav className="flex flex-col grow space-y-2 px-2">
            {menuItems.map((item)=>(
               <Link 
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-4 px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-700 ${isActive(item.path) ? "bg-blue-700 text-white":"text-gray-400" }`}
               >
                  <item.icon className="w-6 h-6"/>
                  <span>{item.name}</span>
               </Link>
            ))}
         </nav>

         <div className="px-4 py-4">
            <button
               onClick={handleLogout} 
               className="w-full px-4 py-2 text-sm font-medium text-gray-200 bg-red-700 rounded-lg hover:bg-red-600">
            Cerrar sesión
            </button>
         </div>
      </aside>

      <main className="grow p-6 bg-gray-100">
         <div className="bg-white rounded-lg shadow-sm border-gray-100 p-6">
           <Outlet />
         </div>
      </main>

   </div>
  )
}

export default Dashboard