export function parseJwt(token) { // funcion para decodificar el token JWT y obtener la información del usuario, :https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript, nos permite obtener la información del usuario desde el token JWT almacenado en localStorage y verificar si el token es válido. 
  try {
    const base64url = token.split('.')[1];
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error al parsear el token:", error); // Si hay un error al parsear el token, se imprime un mensaje en la consola
    return null;
  }
}


export const isTokenValid = () =>{
   const token = localStorage.getItem("token");
   if(!token) return false
   const parsedToken = parseJwt(token);
   return parsedToken && parsedToken.exp > Date.now() / 1000; // verificamos si el token no ha expirado
}