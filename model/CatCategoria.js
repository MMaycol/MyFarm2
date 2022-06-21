import { Entity } from "./core/Entity";

class CatCategoria extends Entity {
    constructor(props) {
        super();
    
        for(const prop in props) {
            this[prop] = props[prop];
        }
      }

      PKCategoria = 1 
      NombreCategoria = "Categoria 1"
      Estado = true

}

export { CatCategoria }