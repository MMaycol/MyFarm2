import { CatUnidadMedida } from "./CatUnidadMedida";
import { Entity } from "./core/Entity";
import { TblProductos } from "./TblProducto";

class TblDetalleVenta extends Entity {
    constructor(obj = {}) {
        super();
        for (const prop in obj) {
            this[prop] = obj[prop];
        }
    }
    
    ApiMethods = {
        Get: "TblDetalleVenta",
    }

    PKVenta= "1"
    FKEmpleado = "1"
    FechaFactura= ""
    DescuentoVenta= "0.000"
    IVAVenta= ""
    TotalVenta= ""
    NombreCliente= "Alejandro Vazquez"
    EstadoVenta= "1"

    TblProductos = {
        val: [],
        get: async ()=> {
            if (this.FKProducto != "") {
                const producto = new TblProductos();

                return await producto.GetByProps("PKProducto", this.FKProducto);
            }else{
                return this.TblProductos.val;
            }            
        }, set(newValue) {
            this.TblProductos.val = newValue;
        }
    }

    CatUnidadMedia = {
        val: [],
        get: async ()=> {
            if (this.FKUnidadMedida != "") {
                const umedida = new CatUnidadMedida();

                return await umedida.GetByProps("PKUnidadMedida", this.FKUnidadMedida);
            }else{
                return this.CatUnidadMedia.val;
            }            
        }, set(newValue) {
            this.CatUnidadMedia.val = newValue;
        }
    }

}

export { TblDetalleVenta }