import { useState } from "react";
import { getLastFiveDaysDateRange,formatDateOnly } from "@/helpers/formatDate";
import { toast } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect } from "react";

ChartJS.register( CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

const Index = () => {
    const{startDate,endDate}= getLastFiveDaysDateRange();
    const [fechaInicio, setFechaInicio] = useState(startDate);
    const [fechaFin, setFechaFin] = useState(endDate);
    const [loading, setLoading] = useState(false); 

    const [ventas,setVentas] = useState([]);
    const [productos, setProductos] = useState([]);
    const fetchDataSales = async(fechaInicio,fechaFin) =>{
       setLoading(true);
       try {
            const params = {fechaInicio,fechaFin};
            const response = await axios.get(`${BASE_URL}/reports/sales-report?`,{params});
            const data = response.data.sales;
            setVentas(data);
       } catch (error) {
            console.error(error);
            setVentas([]);
       }finally{
            setLoading(false);
       }
    }

    const fetchDataProducts = async(fechaInicio,fechaFin) =>{
       setLoading(true);
       try {
            const params = {fechaInicio,fechaFin};
            const response = await axios.get(`${BASE_URL}/reports/sales-product-report?`,{params});
            const data = response.data.salesProducts;
            setProductos(data);
       } catch (error) {
            console.error(error);
            setProductos([]);
       }finally{
            setLoading(false);
       }
    }

    useEffect(()=>{
        handlesearch();
    },[])

    const handlesearch = () => {
        if(!fechaInicio || !fechaFin){
            toast.error("Por favor selecciona un rango de fechas antes de generar el reporte.");
            return;
        }
        fetchDataSales(fechaInicio,fechaFin);
        fetchDataProducts(fechaInicio,fechaFin);
        console.log('ejecutando')
    }

    // gráfica de barras
    const dataBar = {
        labels: ventas.map((v)=> formatDateOnly(v.fecha)),
        datasets: [
            {
                label: "Ventas (S/)",
                data: ventas.map((v)=>v.amount),
                backgroundColor: "rgba(37, 99, 235, 0.7)", // blue-600
                borderColor: "rgba(29, 78, 216, 1)",       // blue-700
                borderWidth: 1,
            }
        ],
    }; 

    // gráfica circular
    const dataPie = {
        labels: productos.map((p)=> p.nombre),
        datasets: [
            {
                data: productos.map((p)=>p.cantidad),
                backgroundColor: [
                    "#2563EB", // Azul medio (blue-600)
                    "#8B5CF6", // Azul intenso (blue-700)
                    "#0EA5E9", // Celeste vibrante (sky-500)
                    "#10B981", // Verde esmeralda (emerald-500)
                    "#8B5CF6", // Violeta elegante (violet-500)
                ],
                borderColor: "#FFF",       // blue-700
                borderWidth: 1,
            }
        ],
    }

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
                <button onClick={handlesearch}  className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 cursor-pointer mr-4">Generar Reporte</button>
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
                    <Bar 
                        data={dataBar}
                        options={{
                           responsive: true,
                            plugins: {
                              legend: { display: false },
                              title: { display: false },
                           },
                           animation:{
                            duration:900,
                            easing: 'easeOutQuart',
                           }
                        }}
                    />
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
                        <Pie 
                            data={dataPie}
                            options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { position: "bottom" },
                                },
                            }}
                        />
                    </div>
               )}
            </div>
        </div>
    </div>
  )
}

export default Index