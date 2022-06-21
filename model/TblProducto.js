import { Entity } from "../model/core/Entity.js";
//import { TblBloqueCurso } from "./TblBloqueCurso.js";

class TblProductos extends Entity {
    
    constructor(props) {
        super();
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }

    PKProducto = 1
    FKCategoria = 1
    FKMarca = 1
    NombreProducto = "Purina Chicken"
    DescripcionProducto = "Purina de engorde"
    EstadoProducto = true

   /*
    TblBloqueCurso = {
        val: this,
        async get(){
            const bloques = new TblBloqueCurso();
            return await bloques.GetByProps("IdCurso", this.val.IdCurso)
        },
        set(newValue) {
            this.val =  newValue;
        }
    };
    */

    /*
    Get = async (param)=>{
        const listmap = await import("../APIDatabase/TblExistencias.json");

        const filtmap = listmap.default.filter(c => 
            c.FKProducto.toString().toUpperCase().includes(param.toUpperCase()))
        return filtmap.map(c => (new TblExistencias(c)));
    }
    */
}

export { TblProductos }