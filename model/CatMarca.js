import { Entity } from "./core/Entity";

class CatMarca extends Entity {
    constructor(props) {
        super();
    
        for(const prop in props) {
            this[prop] = props[prop];
        }
      }
 
        PKMarcaProductos = 2
        NombreMarca = "Marca 1"
        DetalleMarca = "Detalle 1"
        EstadoMarca = true

}

export { CatMarca }