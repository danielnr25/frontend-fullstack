import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate } from "@/helpers/formatDate";
import { toast } from 'react-toastify';
import { getSaleById } from "@/services/sales.service";

export const generateSaleInvoice = async (sale) => {
    if (!sale) {
        toast.error("No se pudo generar la factura porque no hay datos de la venta.");
        return;
    }

    const listdetail = await getSaleById(sale.venta_id);
    const doc = new jsPDF({ unit: "mm", format: [100, 150] });
    doc.text("Factura de Venta", 50, 10, { align: "center" });
    doc.text(`ID Venta: ${sale.venta_id}`, 10, 20);
    doc.text(`Fecha: ${formatDate(sale.fecha)}`, 10, 30);
    doc.text(`Cliente: ${sale.username}`, 10, 40);
    doc.text(`Total: ${sale.total}`, 10, 50);

    const filas = listdetail.map((item) => [
        item.producto,
        item.cantidad,
        item.precio_unitario,
        item.subtotal,
    ]);

    autoTable(doc, {
        head: [["Producto", "Cantidad", "Precio", "Subtotal"]],
        body: filas,
        startY: 60,
    });

    const totalGeneral = listdetail.reduce((acc, item) => acc + Number(item.subtotal || 0), 0);
    filas.push([
        "",
        { content: "TOTAL GENERAL", colSpan: 2, styles: { halign: "right", fontStyle: "bold" } },
        totalGeneral.toFixed(2)
    ]);

    autoTable(doc, {
        head: [["Producto", "Cantidad", "Precio", "Subtotal"]],
        body: filas,
        startY: 60,
    });
    doc.output("dataurlnewwindow");
}