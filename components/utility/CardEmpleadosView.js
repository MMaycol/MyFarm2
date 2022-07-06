import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

const CardEmpleadosView = (props) => {

    return (<View style = {styles.CardStyle}>
        <Text style = {styles.Title}>Nombre de Empleado: {props.data.NombreEmpleado}</Text>
        <Text style = {styles.Atribute}>Telefono: {props.data.TelefonoEmpleado}</Text>
        <Text style = {styles.Atribute}>Direccion: {props.data.DireccionEmpleado}</Text>
        
        <TouchableOpacity onPress={() => {
            props.SeleccionEmpleado(props.data.PKEmpleado, props.data.NombreEmpleado);
            }}

            style = {styles.Button} >
            <Text style = {styles.ButtonText}>Seleccionar</Text>
       </TouchableOpacity>

    </View>);
}

export { CardEmpleadosView }

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
