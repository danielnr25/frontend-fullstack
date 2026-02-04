import { getCurrentMonthDateRange } from "@/helpers/formatDate";
import { useEffect, useState } from "react";
import SalesList from "./SalesList";    
import Loading from "@/shared/Loading";
import Label from "@/components/Label";
import Pagination from "@/shared/Pagination";
import { getSales } from "@/services/sales.service";
import { generateSalesPDF } from "@/helpers/generateSalesPDF";

const SalesIndex = () => {
    const {startDate,endDate}= getCurrentMonthDateRange(); 
    const [fechaInicio, setFechaInicio] = useState(startDate);
    const [fechaFin, setFechaFin] = useState(endDate);

    const [sales, setSales] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [message, setMessage] = useState("");
    const limit =10;

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(false);

    useEffect(()=>{
        fetchSales(page)
    },[page])


    const fetchSales = async(pageNumber = 1) => {
        setLoading(true);
        try {
            const params = { page:pageNumber, limit}
            if(fechaInicio) params.fechaInicio = fechaInicio;
            if(fechaFin) params.fechaFin = fechaFin;

            const data = await getSales(params);
            if(data.message){
                setMessage(data.message)
                setSales([]);
                setTotalPages(1);
                setTotalItems(0);
                return;
            }
            setSales(data.sales);
            setTotalPages(data.pagination.totalPages);
            setTotalItems(data.pagination.totalItems);
            setMessage("");
        } catch (error) {
            setError(true);
            setMessage(error.message);
        }finally{
            setLoading(false);
        }
    }

    const handlesearch = () =>{
        fetchSales(page);
    }

    const onChangeGenerateReport = () =>{
        if (!fechaInicio || !fechaFin) {
            toast.error("Por favor, selecciona un rango de fechas antes de generar el reporte.");
            return;
        }

      generateSalesPDF(sales, fechaInicio, fechaFin);
    }

    if(loading) return <Loading message="Cargando Ventas ..."/>;


  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          📋 Listado de Ventas
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div>
            <Label text="Fecha Inicio" labelclass="block text-sm font-medium text-gray-700 mb-1" htmlfor="fechaInicio" />
            <input
              type="date"
              id="fechaInicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <Label text="Fecha Fin" labelclass="block text-sm font-medium text-gray-700 mb-1" htmlfor="fechaFin"/>
            <input
              type="date"
              id="fechaFin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 cursor-pointer"
            onClick={handlesearch}
          >
            <i className="fas fa-search mr-2"></i>
            Buscar
          </button>

          <button
            onClick={onChangeGenerateReport}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 cursor-pointer"
          >
            <i className="fas fa-file-pdf mr-2"></i>
            Reporte
          </button>
         
        </div>
      </div>
      <hr className="my-6 border-gray-200" />
      {message ? (
            <p className="text-yellow-500 text-center font-medium text-xl">{message}</p>
         ) : (
            <div>
               <SalesList
                  sales={sales}
               />
               <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  totalItems={totalItems}
               />
            </div>
         )}
    </>
  );
};

export default SalesIndex;
