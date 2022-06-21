import { Entity } from "./core/Entity";
import { TblProductos } from "./TblProducto";

class TblDetalleCompra extends Entity {
    constructor(obj = {}) {
        super();
        for (const prop in obj) {
            this[prop] = obj[prop];
        }
    }
    
    ApiMethods = {
        Get: "TblDetalleCompra",
    }

    PKDetalleCompra = "1"
    FKCompra ="1"
    FKUnidadMedida ="1"
    FKProducto = "1"
    Cantidad =""
    SubTotal = ""
    EstadoDetalleCompra ="1"

}

export { TblDetalleCompra }