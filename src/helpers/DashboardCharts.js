import {formatDateOnly} from './formatDate';

export const buildBarData = (ventas = []) =>({
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
})

export const buildPieData = (productos = []) => ({
    labels: productos.map((p)=> p.nombre),
    datasets: [
        {
            data: productos.map((p)=>p.cantidad),
            backgroundColor: [ "#2563EB", "#8B5CF6", "#0EA5E9", "#10B981", "#8B5CF6" ],
            borderColor: "#FFF",       // blue-700
            borderWidth: 1,
        }
    ],
})

export const barOptions = {
    responsive: true,
    plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: {
            callbacks:{
                label: (ctx) => `S/ ${Number(ctx.raw ?? 0).toFixed(2)}`,
            }
        }
    },
    animation:{
        duration:900,
        easing: 'easeOutQuart',
    }
}

export const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: "bottom" },
    },
}