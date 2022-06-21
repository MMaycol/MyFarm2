import { Entity } from "./core/Entity";
import { TblProductos } from "./TblProducto";

class TblCompra extends Entity {
    constructor(obj = {}) {
        super();
        for (const prop in obj) {
            this[prop] = obj[prop];
        }
    }
    
    ApiMethods = {
        Get: "TblCompra",
    }

    PKCompra = "1" 
    FKProveedor = "1" 
    Descuento = "0.000" 
    FechaCompra = "" 
    Total =  "" 
    IVACompra = "" 
    EstadoCompra = "1"

}

export { TblCompra }