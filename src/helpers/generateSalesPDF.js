import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate } from "@/helpers/formatDate";
import { toast } from 'react-toastify';
export const generateSalesPDF = (sales, fechaInicio, fechaFin) => {
   if (!fechaInicio || !fechaFin) {
      toast.error("Selecciona ambas fechas antes de generar el reporte.");
      return;
   }

   // Crear documento PDF
   const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
   const pageWidth = doc.internal.pageSize.getWidth();

   // === ENCABEZADO ===
   doc.setFont("helvetica", "bold");
   doc.setFontSize(18);
   doc.setTextColor(40, 40, 40);
   doc.text("REPORTE DE VENTAS ISI", pageWidth / 2, 18, { align: "center" });

   doc.setFontSize(12);
   doc.setFont("helvetica", "normal");
   doc.setTextColor(100);
   doc.text(`Del ${fechaInicio} al ${fechaFin}`, pageWidth / 2, 26, { align: "center" });

   // Línea decorativa
   doc.setDrawColor(67, 56, 202);
   doc.setLineWidth(0.8);
   doc.line(25, 30, pageWidth - 25, 30);

   // === TABLA ===
   const columnas = ["#", "Fecha / Hora", "Cliente", "Total (S/)"];
   const filas = sales.map((v, index) => [
      index + 1,
      formatDate(v.fecha),
      v.username,
      v.total,
   ]);

   // Calcular y agregar TOTAL GENERAL
   const totalGeneral = sales.reduce((acc, v) => acc + Number(v.total || 0), 0);
   filas.push([
      "",
      { content: "TOTAL GENERAL", colSpan: 2, styles: { halign: "right", fontStyle: "bold" } },
      totalGeneral.toFixed(2)
   ]);

   autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 36,
      theme: "striped",
      styles: {
         fontSize: 10,
         halign: "center",
         valign: "middle",
         textColor: [60, 60, 60],
         lineColor: [230, 230, 230],
      },
      headStyles: {
         fillColor: [67, 56, 202],
         textColor: 255,
         fontSize: 11,
         fontStyle: "bold",
      },
      bodyStyles: { fillColor: [250, 250, 250] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      columnStyles: {
         0: { cellWidth: 10 },
         1: { cellWidth: 40 },
         2: { cellWidth: 80 },
         3: { halign: "right", cellWidth: 30 },
      },
   });

   // === PIE DE PÁGINA ===
   const pageHeight = doc.internal.pageSize.height;
   const fechaActual = new Date().toLocaleString("es-PE", {
      dateStyle: "medium",
      timeStyle: "short",
   });

   doc.setFontSize(10);
   doc.setTextColor(120);
   doc.text("Generado: " + fechaActual, 15, pageHeight - 10);
   doc.text("ISI - Reporte de Ventas", pageWidth - 15, pageHeight - 10, {
      align: "right",
   });

   // === DESCARGA ===
   const nombreArchivo = `reporte_ventas_${fechaInicio}_a_${fechaFin}.pdf`;
   doc.save(nombreArchivo);
};
