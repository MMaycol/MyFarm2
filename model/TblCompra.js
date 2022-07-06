import { Entity } from "./core/Entity";

import { CatProveedor } from "./CatProveedor";
import { TblDetalleCompra } from "./TblDetalleCompra";

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
    Total =  "0.000";
    IVACompra = "0.000" ;
    EstadoCompra = "1";

    CatProveedor = {
        val: [],
        get: async ()=> {
            if (this.FKProveedor != "") {
                const proveedor = new CatProveedor();

                return await proveedor.GetByProps("PKProveedor", this.FKProveedor);
            }else{
                return this.CatProveedor.val;
            }            
        }, set(newValue) {
            this.CatProveedor.val = newValue;
        }
    }

    TblDetalleCompra = {
        val: [],
        get: async ()=> {
            if (this.PKCompra != "") {
                const detalle = new TblDetalleCompra();

                return await detalle.GetByProps("FKCompra", this.PKCompra);
            }else{
                return this.TblDetalleCompra.val;
            }            
        }, set(newValue) {
            this.TblDetalleCompra.val = newValue;
        }
    }

}

export { TblCompra }