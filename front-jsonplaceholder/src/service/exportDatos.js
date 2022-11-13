import ExportJsonExcel from "js-export-excel";

export default function exportDatos(nombre, tipo, columnasName, columnasfilter, datos, tamanocolumns) {

    let option = {};

    option.fileName = nombre; // nombre de archivo
    if (tipo === 1) {
        option.datas = [
            {
                //para armar una hoja de el reporte
                sheetData: datos, // datos
                sheetName: "Usuarios", // nombre de la hoja
                skipHeader: true,
                cellStyles: { color: "red" },
                sheetFilter: columnasfilter, // filtrado de columna
                sheetHeader: columnasName, // encabezado de la primera fila
                columnWidths: tamanocolumns, // el ancho de la columna debe corresponder al orden de la columna
            },
        ];
    }
    if (tipo === 2) {
        option.datas = [
            {
                //para armar una hoja de el reporte
                sheetData: datos, // datos
                sheetName: "Publicaciones", // nombre de la hoja
                skipHeader: true,
                cellStyles: { color: "red" },
                sheetFilter: columnasfilter, // filtrado de columna
                sheetHeader: columnasName, // encabezado de la primera fila
                columnWidths: tamanocolumns, // el ancho de la columna debe corresponder al orden de la columna
            },
        ];
    }
    if (tipo === 3) {
        option.datas = [
            {
                //para armar una hoja de el reporte
                sheetData: datos, // datos
                sheetName: "Fotos", // nombre de la hoja
                skipHeader: true,
                cellStyles: { color: "red" },
                sheetFilter: columnasfilter, // filtrado de columna
                sheetHeader: columnasName, // encabezado de la primera fila
                columnWidths: tamanocolumns, // el ancho de la columna debe corresponder al orden de la columna
            },
        ];
    }
    if (tipo === 4) {
        option.datas = [
            {
                //para armar una hoja de el reporte
                sheetData: datos, // datos
                sheetName: "Peticiones", // nombre de la hoja
                skipHeader: true,
                cellStyles: { color: "red" },
                sheetFilter: columnasfilter, // filtrado de columna
                sheetHeader: columnasName, // encabezado de la primera fila
                columnWidths: tamanocolumns, // el ancho de la columna debe corresponder al orden de la columna
            },
        ];
    }

    const toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel(); // Guardar

}