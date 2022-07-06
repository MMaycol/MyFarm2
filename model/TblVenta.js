import { Entity } from "./core/Entity";
import { TblProductos } from "./TblProducto";

class TblVenta extends Entity {
    constructor(obj = {}) {
        super();
        for (const prop in obj) {
            this[prop] = obj[prop];
        }
    }
    
    ApiMethods = {
        Get: "TblVenta",
    }

    PKVenta= "1"
    FKEmpleado = "1"
    FechaFactura= ""
    DescuentoVenta= "0.000"
    IVAVenta= ""
    TotalVenta= ""
    NombreCliente= "Alejandro Vazquez"
    EstadoVenta= "1"

}

export { TblVenta }