import { Entity } from "./core/Entity";
import { TblProductos } from "./TblProducto";

class TblProductoBodega extends Entity {
    constructor(curso = {}) {
        super();
        for (const prop in curso) {
            this[prop] = curso[prop];
        }
    }
    
    ApiMethods = {
        Get: "TblProductoBodega",
    }

    FKProducto = ""
    FKBodega = ""
    UnidadesExistencias = ""

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
}

export { TblProductoBodega }