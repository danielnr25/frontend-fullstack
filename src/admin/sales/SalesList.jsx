import { formatDate } from "@/helpers/formatDate";
import { useState } from "react";
import SaleDetailModal from "./SaleDetailModal";
const SalesList = ({sales}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);

    const handleOpenModal = (sale_id) =>{
        setSelectedSale(sale_id);
        setIsModalOpen(true);
    }
    const onchangedatailpdf = (sale_id) => {
        console.log('venta_id',sale_id)
    } 
  return (
    <div>
         <table className="w-full border border-gray-100 roundend-sm">
            <thead className="bg-indigo-700 text-white">
               <tr className="text-center uppercase text-base">
                  <th className="px-4 py-2">ID Venta</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Cliente</th>
                  <th className="px-4 py-2">Total</th>
                  <th colSpan={2} className="px-4 py-2">Accion</th>
               </tr>
            </thead>
            <tbody className="text-base font-medium text-center">
                {sales.map((sale)=>(
                    <tr
                        key={sale.venta_id}
                        className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition"  
                    >
                        <td className="py-3 px-2">{sale.venta_id}</td>
                        <td className="py-3 px-2">{formatDate(sale.fecha)}</td>
                        <td className="py-3 px-2">{sale.username}</td>
                        <td className="py-3 px-2 text-center">{sale.total}</td>
                        <td>
                            <button
                                onClick={() => handleOpenModal(sale)}
                                className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-md transition cursor-pointer"
                            >
                            <i className="fas fa-eye mr-2"></i>
                            Ver Detalles
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={()=>onchangedatailpdf(sale.venta_id)}
                                className="flex items-center bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 cursor-pointer"
                            >
                                <i class="fa-solid fa-print mr-2"></i>
                                fact
                            </button>
                        </td>
                    </tr>
                ))

                }
            </tbody>
        </table>

        <SaleDetailModal 
            isOpen={isModalOpen}
            sale={selectedSale}
            onClose={() => setIsModalOpen(false)}
            size="lg"
        />
    </div>
  )
}

export default SalesList