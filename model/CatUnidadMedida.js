import { Entity } from "./core/Entity";

class CatUnidadMedida extends Entity {
    constructor(props) {
        super();
    
        for(const prop in props) {
            this[prop] = props[prop];
        }
      }
 
       PKUnidadMedida = "1"
       NombreUnidadMedida = "Quintal DogPets"
       Abreviacion = "QDP"
       Equivalencia  ="100"
       Estado = "1"

}

export { CatUnidadMedida }