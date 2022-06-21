import { Entity } from "./core/Entity";

class CatMarca extends Entity {
    constructor(props) {
        super();
    
        for(const prop in props) {
            this[prop] = props[prop];
        }
      }
 
      NombreMarca = "Marca 1"
      DetalleMarca = "Alimento seco"
      EstadoMarca = true

}

export { CatMarca }