import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

const CardProductosView = (props) => {
    return (<View style = {styles.CardStyle}>
        <Text style = {styles.Title}>Nombre de producto: {props.data.NombreProducto}</Text>
        <Text style = {styles.Atribute}>Descripcion: {props.data.Descripcion}</Text>
        
        <TouchableOpacity onPress={() => {
             props.selecct ? props.SeleccionProducto(props.data.PKProducto, props.data.NombreProducto) : false
            }}

            style = {styles.Button} >
                {
                    props.selecct ? <Text style = {styles.ButtonText}>Seleccionar</Text> : <Text style = {styles.ButtonText}>Mas informacion</Text>
                }
            
       </TouchableOpacity>

    </View>);
}

export { CardProductosView }

const styles = StyleSheet.create({
    CardStyle: {
        justifyContent: "center",
        borderWidth: 2,
        margin: 14,
        padding: 12, 
        borderRadius: 6,
        marginTop: 4,
        marginBottom: 4
    }, Title: {
        color: "back",
        fontSize: 26
    }, Atribute: {
        color: "black",
        fontSize: 16,
        marginBottom: 8
    }, Resumen: {
        color: "black",
        fontSize: 12
    },
    Button: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'black',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'white'
    },
    ButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17
      }
});
