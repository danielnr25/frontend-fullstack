const BASE_URL = import.meta.env.VITE_API_URL

export const loginService = async (data) => {
   const response = await fetch(`${BASE_URL}/auth/login`,{
      method:"POST",
      headers:{
         "Content-Type": "application/json"         // tipo de contenido es un JSON
      },
      body: JSON.stringify(data)
   });
   const result = await response.json();
   console.log('resultado service:', result)
   if(!response.ok){
      throw new Error(result.message || "Error en la autenticación")
   }
   return result
}


// esto fue usando en login inicialmente
// const handleLogin = (e) =>{
//       e.preventDefault(); // previene el comportamiento por defecto del formulario
//       const data = {username, password}

//       fetch(`${BASE_URL}/auth/login`,{
//          method:"POST",
//          headers:{
//             "Content-Type": "application/json"         // tipo de contenido es un JSON
//          },
//          body: JSON.stringify(data)
//       }).then((response)=>{
//          if(!response.ok){
//             console.error('Error de la autenticación')
//          }
//          return response.json();
//       }).then((result)=>{
//          if(result.token){
//             console.log('token: ' ,result.token)
//          }else{
//             setError(result.message)
//          }
//       }).catch((error)=>{
//          setError(error.message)
//       })

//    }