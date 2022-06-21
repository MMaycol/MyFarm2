class Entity {
    constructor(props){
        for(const prop in props) {
            this[prop] = props[prop];
        }
    }

    ApiRoute = "";
    ApiMethods = {
        Get: this.__proto__.constructor.name,
        Set: "ApiSet",
        Update: "ApiUpdate"
    }

    Get = async (param = "") => {
        let Data = await import("../../APIDatabase/" + this.ApiMethods.Get + ".json");

        Data = Data.default.filter(ent => {
            let flag = false;

            for(const prop in ent) {
                if(ent[prop].toUpperCase().toString().includes(param.toUpperCase())) {
                    flag = true;
                }
            }

            return flag;
        });

        return Data.map(ent => new this.constructor(ent));
    }

    GetByProps = async (paramName, paramValue) => {
        let Data = await import("../../APIDatabase/" + this.ApiMethods.Get + ".json");

        Data = Data.default.filter(ent =>
             ent[paramName].toString().includes(paramValue.toString()));

        return Data.map(l => new this.constructor(l));
    }

    FindByProps = async (paramName, paramValue) => {
        let Data = await import("../../APIDatabase/" + this.ApiMethods.Get + ".json");

        const FindObject = Data.default.find(ent => ent[paramName].includes(paramValue));
        
        if(FindObject) {
            
            return (new this.constructor(FindObject));
        }
        
    }

 ////end clase
}

export { Entity }