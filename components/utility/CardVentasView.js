import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

const CardVentasView = (props) => {
    return (<View style={styles.CardStyle}>
        <Text style={styles.Title}>Ventas del {props.data.FechaFactura}</Text>
        <Text style={styles.Atribute}>Descuento: {props.data.DescuentoVenta}</Text>
        {/*<Text style={styles.Atribute}>Fecha de compra: {props.data.FechaCompra}</Text>*/}
        <Text style={styles.Atribute}>Total: {props.data.TotalVenta}</Text>
        <Text style={styles.Atribute}>IVA: {props.data.IVAVenta}</Text>

        <TouchableOpacity onPress={() => {
                //props.navigation.navigate('FrmCompra');
                props.CargarInfo(props.data)
            }}
            style = {styles.Button} >
            <Text style = {styles.ButtonText}>Ver Detalle</Text>
       </TouchableOpacity>

    </View>);
}

export { CardVentasView }

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
