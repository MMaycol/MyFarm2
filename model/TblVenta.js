import { Entity } from "./core/Entity";
import { CatEmpleado } from "./CatEmpleado";
import { TblDetalleVenta } from "./TblDetalleVenta";

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

    CatEmpleado = {
        val: [],
        get: async ()=> {
            if (this.FKEmpleado != "") {
                const empleado = new CatEmpleado();

                return await empleado.GetByProps("PKEmpleado", this.FKEmpleado);
            }else{
                return this.CatEmpleado.val;
            }            
        }, set(newValue) {
            this.CatEmpleado.val = newValue;
        }
    }

    TblDetalleVenta = {
        val: [],
        get: async ()=> {
            if (this.PKVenta != "") {
                const detalleventa = new TblDetalleVenta();

                return await detalleventa.GetByProps("FKVenta", this.PKVenta);
            }else{
                return this.TblDetalleVenta.val;
            }            
        }, set(newValue) {
            this.TblDetalleVenta.val = newValue;
        }
    }

    

}

export { TblVenta }