import { useState,useEffect,useMemo } from "react";
import { toast } from 'react-toastify';
import { Bar, Pie } from "react-chartjs-2";
import { getSalesReport,getSalesProductReport } from "@/services/report.service";
import { getLastFiveDaysDateRange } from "@/helpers/formatDate";
import { validateDateRange } from "@/helpers/validators/dateRange";
import "chart.js/auto";
import { buildBarData,buildPieData,barOptions,pieOptions } from "@/helpers/DashboardCharts";

const Index = () => {
    const {startDate,endDate}= getLastFiveDaysDateRange();
    const [fechaInicio, setFechaInicio] = useState(startDate);
    const [fechaFin, setFechaFin] = useState(endDate);
    const [loading, setLoading] = useState(false); 

    const [ventas,setVentas] = useState([]);
    const [productos, setProductos] = useState([]);

    const loadDasboard = async() =>{
        const {ok, message} = validateDateRange(fechaInicio,fechaFin);
        if(!ok){
            toast.error(message);
            return;
        }

        setLoading(true);
        try {
            const [sales, salesProducts] = await Promise.all([
                getSalesReport(fechaInicio, fechaFin),
                getSalesProductReport(fechaInicio,fechaFin)
            ]);
            setVentas(sales);
            setProductos(salesProducts);
        } catch (error) {
            console.error(error);
            setVentas([]);
            setProductos([]);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        loadDasboard();
    },[])


    const dataBar = useMemo(()=> buildBarData(ventas), [ventas]);
    const dataPie = useMemo(()=>buildPieData(productos),[productos]);

  return (
    <div>
        <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">📊 Dashboard de Ventas </h2>
        <div className="flex flex-wrap justify-center gap-6">
            <div>
                <label className="text-sm text-gray-600 block mb-1" htmlFor="">Fecha incio</label>
                <input type="date" value={fechaInicio} className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" onChange={(e) => setFechaInicio(e.target.value)}/>
            </div>
            <div>
                <label className="text-sm text-gray-600 block mb-1" htmlFor="">Fecha fin</label>
                <input value={fechaFin} type="date" className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" onChange={(e) => setFechaFin(e.target.value)} />
            </div>
            <div>
                <button 
                    onClick={loadDasboard} 
                    disabled={loading}
                    className={`mt-6 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 cursor-pointer mr-4
                        ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
                   >
                    {loading ? "Cargando..." : "Generar Reporte"}
                   </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mt-5">
            <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center">
               <h3 className="text-lg font-semibold text-indigo-700 mb-4 text-center">
                  Ventas de los últimos 5 días
               </h3>

                {ventas.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-70 text-gray-500">
                        <div className="text-6xl mb-4">📊</div>
                        <p className="text-lg font-medium">No hay ventas disponibles</p>
                        <p className="text-center text-sm mt-2">No se encontraron ventas para el rango de fechas seleccionadas</p>
                    </div>  
                ): (
                    <Bar data={dataBar} options={barOptions} />
                )}


            </div>
             <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center">
               <h3 
                 className="text-lg font-semibold text-indigo-700 mb-4 text-center">
                  Productos más vendidos
               </h3>
               {productos.length === 0 ?(
                <div className="flex flex-col items-center justify-center h-87.5 text-gray-500">
                     <div className="text-6xl mb-4">🛒</div>
                     <p className="text-lg font-medium">No hay productos disponibles</p>
                     <p className="text-sm text-center mt-2">
                        No se encontraron productos vendidos para el rango de fechas
                     </p>
                </div>
               ):(
                    <div className="w-full max-w-87.5 h-87.5">
                        <Pie data={dataPie} options={pieOptions} />
                    </div>
               )}
            </div>
        </div>
    </div>
  )
}

export default Index