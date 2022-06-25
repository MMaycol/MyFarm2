import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

const CardComprasView = (props) => {
    return (<View style={styles.CardStyle}>
        <Text style={styles.Title}>Compra del {props.data.FechaCompra}</Text>
        <Text style={styles.Atribute}>Descuento: {props.data.Descuento}</Text>
        <Text style={styles.Atribute}>Fecha de compra: {props.data.FechaCompra}</Text>
        <Text style={styles.Atribute}>Total: {props.data.Total}</Text>
        <Text style={styles.Atribute}>IVA: {props.data.IVACompra}</Text>

        <TouchableOpacity onPress={() => {
                //props.navigation.navigate('FrmCompra');
            }}
            style = {styles.Button} >
            <Text style = {styles.ButtonText}>Ver Detalle</Text>
       </TouchableOpacity>

    </View>);
}

export { CardComprasView }

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
