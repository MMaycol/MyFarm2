import { Entity } from "./core/Entity";

class CatProveedor extends Entity {
    constructor(obj = {}) {
        super();
        for (const prop in obj) {
            this[prop] = obj[prop];
        }
    }
    
    ApiMethods = {
        Get: "CatProveedor",
    }

    PKProveedor = 1 
    NombreProveedor = "Granja SA" 
    TelefonoProveedor = 22232824 
    DireccionProveedor  ="Direccion pendiente" 
    EmailProveedor  ="Contact@migranjasa.com" 
    EstadoProveedor = true

}

export { CatProveedor }