import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

const CardProveedorView = (props) => {

    return (<View style = {styles.CardStyle}>
        <Text style = {styles.Title}>Nombre de proveedor: {props.data.NombreProveedor}</Text>
        <Text style = {styles.Atribute}>Telefono: {props.data.TelefonoProveedor}</Text>
        <Text style = {styles.Atribute}>Direccion: {props.data.DireccionProveedor}</Text>
        
        <TouchableOpacity onPress={() => {
            props.SeleccionProveedor(props.data.PKProveedor, props.data.NombreProveedor);
            }}

            style = {styles.Button} >
            <Text style = {styles.ButtonText}>Seleccionar</Text>
       </TouchableOpacity>

    </View>);
}

export { CardProveedorView }

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
