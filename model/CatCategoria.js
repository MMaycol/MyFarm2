import { Entity } from "./core/Entity";

class CatCategoria extends Entity {
    constructor(props) {
        super();
    
        for(const prop in props) {
            this[prop] = props[prop];
        }
      }

      ApiMethods = {
        Get: "CatCategorias",
     } 

    PKCategoria = 1
    NombreCategoria = "Categoria 1"
    DetalleCategoria = "Detalle"
    EstadoCategoria = true

}

export { CatCategoria }