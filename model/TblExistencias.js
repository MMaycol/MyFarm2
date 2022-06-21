import { Entity } from "../model/core/Entity.js";
import { TblProductos } from "./TblProducto.js";

class TblExistencias extends Entity {
    
    constructor(props) {
        super();
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }

    PKExistencias = 1
    FKProducto = 1
    cantidad_inicial = 4
    precio_venta = 1.000000000000000e+002
    Existencias = 2
    fecha_vencimiento = "2025-06-07"

    TblProductos = {
        val: this,
        async get(){
            const productos = new TblProductos();

            return await productos.GetByProps("PKProducto", this.val.FKProducto)
        },
        set(newValue) {
            this.val =  newValue;
        },
        async getName(param) {
            const p = new TblProductos();

            return await p.GetByProps("PKProducto", param);
        }
    };

    Get = async (param)=>{
        const listmap = await import("../APIDatabase/TblExistencias.json");

        const filtmap = listmap.default.filter(c => 
            c.FKProducto.toString().toUpperCase().includes(param.toUpperCase()))
        return filtmap.map(c => (new TblExistencias(c)));
    }
}

export { TblExistencias }