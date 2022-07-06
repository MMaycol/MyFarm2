import { Entity } from "./core/Entity";

class CatEmpleado extends Entity {
    constructor(obj = {}) {
        super();
        for (const prop in obj) {
            this[prop] = obj[prop];
        }
    }
    
    ApiMethods = {
        Get: "CatEmpleado",
    }

    PKEmpleado = 2
    NombreEmpleado = " Emilio Guevara"
    DireccionEmpleado = "Iglesia Catolica 50vras al este.Los Rincones,Masatepe."
    TelefonoEmpleado = 84657348
    EmailEmpleado = "MarcusLp@gmail.com"
    PasswordEmpleado = "1234"
}

export { CatEmpleado }