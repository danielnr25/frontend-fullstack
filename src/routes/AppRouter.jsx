import {Navigate,Route, Routes} from 'react-router-dom'
import Login from "@/pages/Login"
import Dashboard from '@/admin/Dashboard';
import PrivateRoute from '@/utils/auth/PrivateRoute';
import { isTokenValid } from '@/utils/auth/auth.utils';
import CategoriesIndex from '@/admin/categories/CategoriesIndex';
import ProductsIndex from '@/admin/products/ProductsIndex';
import Index from '@/admin/Index';
import CategoriesForm from '@/admin/categories/CategoriesForm';
import ProductsForm from '@/admin/products/ProductsForm';

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
            <Route path='categories/new' element={<CategoriesForm />} />
            <Route path='categories/edit/:id' element={<CategoriesForm />} />
            <Route path='products' element={<ProductsIndex />} />
            <Route path='products/new' element={<ProductsForm />} />
            <Route path='products/edit/:id' element={<ProductsForm />} />
         </Route>
      </Route>
   </Routes>
  )
}

export default AppRouter