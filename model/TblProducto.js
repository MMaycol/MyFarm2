import { Entity } from "../model/core/Entity.js";
//import { TblBloqueCurso } from "./TblBloqueCurso.js";

class TblProductos extends Entity {
    
    constructor(props) {
        super();
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }

    ApiMethods = {
        Get: "TblProducto",
    }

        PKProducto = "1"
        FKCategoria = "1"
        FKMarca ="1"
        NombreProducto ="Producto 1"
        Descripcion = "desc"
        EstadoProducto ="1"


}

export { TblProductos }