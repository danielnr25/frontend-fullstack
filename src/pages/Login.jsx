import Logo from '@/assets/logo.jpg'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
     <div className="flex flex-col lg:flex-row w-full max-w-360 bg-white overflow-hidden">
         <div className="lg:w-2/3 flex items-center justify-center p-12 bg-white">
            <img src={Logo} alt="Illustration"
            className="max-w-full h-auto object-contain" />
         </div>

         <div className="lg:w-1/3 bg-gray-50 flex flex-col justify-center px-16 py-20 rounded-r-3xl">
            <h2 className="text-blue-600 font-bold text-3xl mb-10 text-center">ISI - Panel de Administración</h2>
            <form className='space-y-8'>
               <div>
                  <input 
                     type="text" 
                     id="username" 
                     name="username" 
                     className="w-full rounded-full bg-white border border-indigo-700 px-6 py-3 text-center text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 transition" 
                     placeholder="Ingrese su usuario" />
               </div>
               
               <div>
                  <input 
                     type="password" 
                     id="password" 
                     name="password" 
                     className="w-full rounded-full bg-white border border-indigo-700 px-6 py-3 text-center text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 transition" 
                     placeholder="Ingrese su contraseña" />
               </div>
               <button 
                  className="w-full bg-indigo-800 text-white font-bold rounded-full py-3 tracking-widest hover:bg-indigo-900 transition cursor-pointer"
                  type="submit"
               >
                  Ingresar
               </button>
            </form>
         </div>
      </div>
    </div>
  )
}

export default Login