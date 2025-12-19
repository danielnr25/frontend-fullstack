import {Navigate,Route, Routes} from 'react-router-dom'
import Login from "@/pages/Login"
import Dashboard from '@/admin/Dashboard';
import PrivateRoute from '@/utils/auth/PrivateRoute';
import { isTokenValid } from '@/utils/auth/auth.utils';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/login" />} />
      <Route path='/login' element={
         isTokenValid() ? <Navigate to="/admin" /> : <Login />
      } />

      <Route path='/admin/' element={<PrivateRoute /> }>
         <Route index element={<Navigate to="dashboard"/>} /> 
         <Route path='dashboard' element={<Dashboard />} />
      </Route>
   </Routes>
  )
}

export default AppRouter