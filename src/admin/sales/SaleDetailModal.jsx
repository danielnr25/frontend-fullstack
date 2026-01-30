import { formatDate } from "@/helpers/formatDate";
import Loading from "@/shared/Loading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = import.meta.env.VITE_API_URL;

const SaleDetailModal = ({ isOpen, onClose, sale, size = "md" }) => {
  const navigate = useNavigate();
  const [saledetail, setSaledetail] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  // frutas = ['fresa','manzana','pera']
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const decoded = jwtDecode(token);
    setUserRole(decoded.role);
    if (sale) {
      fetchSalesdetail();
    }
  }, [navigate, sale]);

  const fetchSalesdetail = async () => {
    if (!sale) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/sales/${sale.venta_id}`);
      setSaledetail(response.data);
    } catch (err) {
      setError("Error al obtener los productos: " + err);
    } finally {
      setLoading(false);
    }
  };
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
  };
  if (!isOpen) return null;
  if (loading) {
    return <Loading message="Cargando detalle de la venta..." />;
  }
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-2xl shadow-lg w-full ${sizeClasses[size]} mx-4`}
      >
        <div className="flex justify-between items-center border-b px-6 py-3">
          <h2 className="text-xl font-bold text-gray-800">
            Detalle de la Venta # {sale?.venta_id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition cursor-pointer"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <p>
              <span className="font-semibold">Cliente:</span> {sale?.username}
            </p>
            <p>
              <span className="font-semibold">Fecha:</span>{" "}
              {formatDate(sale?.fecha)}
            </p>
          </div>
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-indigo-700 text-white">
              <tr>
                <th className="px-3 py-2 text-left">Producto</th>
                <th className="px-3 py-2 text-center">Cantidad</th>
                <th className="px-3 py-2 text-center">Precio Unitario</th>
                <th className="px-3 py-2 text-center">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {saledetail.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  <td className="px-3 py-2">{item.producto}</td>
                  <td className="px-3 py-2 text-center">{item.cantidad}</td>
                  <td className="px-3 py-2 text-center">
                    {item.precio_unitario}
                  </td>
                  <td className="px-3 py-2 text-center">{item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <p className="text-lg font-bold text-gray-800">
              Total: $
              {saledetail
                .reduce(
                  (acc, item) => acc + item.precio_unitario * item.cantidad,
                  0,
                )
                .toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex justify-end border-t px-6 py-3">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailModal;
