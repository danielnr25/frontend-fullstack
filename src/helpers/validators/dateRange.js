export const validateDateRange = (fechaInicio, fechaFin) => {
    if(!fechaInicio || !fechaFin){
        return {ok:false, message: "Por favor selecciona un rango de fechas antes de generar el reporte."}
    }

    if(fechaInicio>fechaFin){
        return {ok:false, message: "La fecha de inicio no puede ser mayor que la fecha fin."}
    }
    
    return { ok:true, message:""}
}