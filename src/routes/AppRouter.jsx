import {Navigate,Route, Routes} from 'react-router-dom'
import Login from "@/pages/Login"
import Dashboard from '@/admin/Dashboard';
import PrivateRoute from '@/utils/auth/PrivateRoute';
import { isTokenValid } from '@/utils/auth/auth.utils';
import CategoriesIndex from '@/admin/categories/CategoriesIndex';
import ProductsIndex from '@/admin/products/ProductsIndex';
import Index from '@/admin/Index';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/login" />} />
      <Route path='/login' element={
         isTokenValid() ? <Navigate to="/admin" /> : <Login />
      } />

      <Route path='/admin' element={<PrivateRoute /> }>
         <Route element={<Dashboard />}>
            <Route index element={<Navigate to="dashboard"/>} /> 
            <Route path='dashboard' element={<Index />} />
            <Route path='categories' element={<CategoriesIndex />} />
            <Route path='products' element={<ProductsIndex />} />
         </Route>
      </Route>
   </Routes>
  )
}

export default AppRouter