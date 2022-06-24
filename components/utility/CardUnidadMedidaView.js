import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

const CardUnidadMedidaView = (props) => {
    return (<View style = {styles.CardStyle}>
        <Text style = {styles.Title}>Unidad de medida: {props.data.NombreUnidadMedida}</Text>
        <Text style = {styles.Atribute}>Abreviacion: {props.data.Abreviacion}</Text>
        <Text style = {styles.Atribute}>Equivalencia: {props.data.Equivalencia}</Text>
        
        <TouchableOpacity onPress={() => {
             props.SeleccionUnit(props.data.PKUnidadMedida, props.data.NombreUnidadMedida);
            }}

            style = {styles.Button} >
             <Text style = {styles.ButtonText}>Seleccionar</Text>
       </TouchableOpacity>

    </View>);
}

export { CardUnidadMedidaView }

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
