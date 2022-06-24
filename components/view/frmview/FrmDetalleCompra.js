import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { TblDetalleCompra } from '../../../model/TblDetalleCompra';

class FrmDetalleCompra extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.DetalleCompra = new TblDetalleCompra();

        this.state = {
            PK: "ID",
            producto: "Producto",
            precio: "0.000",
            subtotal: "0.000",

            PKU: "ID",
            unidad_de_medida: "Unidad de medida"
        }

        this.GuardarDetalleCompra = this.props.route.params.GuardarDetalleCompra;
    }

    SeleccionProducto = async (Pk, Name) => {
    
        this.setState({
            PK: Pk,
            producto: Name
        });

        this.DetalleCompra.FKProducto = Pk.toString();
    }

    SeleccionUnit = async (Pk, Name) => {
        this.setState({
            PKU: Pk,
            unidad_de_medida: Name
        });

        this.DetalleCompra.FKUnidadMedida = Pk.toString();
    }

    SubTotal = async (val) =>  {
        this.setState({
            subtotal: (val * this.state.precio).toString()
        });
        
        this.DetalleCompra.Cantidad = val.toString();
        this.DetalleCompra.SubTotal = this.state.subtotal;
    }

    render() {
        return <View style = {styles.CardStyles}>
            <Text style={styles.Title}>Detalle Compra</Text>

            {/** FORMULARIO */}         

            <View style = { styles.frm }>

            <View style = { styles.box_row }>
            <TextInput style = {styles.subitem_1}
                placeholder='Producto'
                value= {this.state.producto}
                disabled />

            <TextInput style = {styles.subitem_2}
                placeholder = 'ID'
                value= {this.state.PK}
                disabled />
            
            <Button title = "+" onPress= { async () => {
                //Event seleccionar producto
                this.props.navigation.navigate("Seleccionar Producto", {
                    SeleccionProducto: this.SeleccionProducto ,
                    selecct: true
                });
            }} />
            </View>

            <View style = {styles.box_row}>
            <Text style={styles.Texto}>Precio:</Text>
            <TextInput style = {styles.InputStyle}
                placeholder = '0.000'
                onChangeText = {val => this.setState({precio: val})} />
            </View>

            <View style = {styles.box_row}>
            <TextInput style = {styles.subitem_1}
                placeholder = 'Unida de medida'
                value= {this.state.unidad_de_medida}
                disabled/>
                <TextInput style = {styles.subitem_2}
                placeholder='ID'
                value={this.state.PKU} 
                disabled />
                <Button title = "+" onPress= { async () => {
                //Event seleccionar unidad de medida
                this.props.navigation.navigate("Seleccionar Unit", {
                    SeleccionUnit: this.SeleccionUnit
                });
            }} />
            </View>

            <View style = {styles.box_row}>
            <Text style = {styles.Texto}>Cantidad:</Text>
            <TextInput style = {styles.InputStyle}
                placeholder = '0'
                onChangeText = {val => this.SubTotal(val)}
                 />
            </View>

            <View style = {styles.box_row}>
            <Text style = {styles.Texto}>SubTotal:</Text>
            <TextInput style = {styles.InputStyle}
                placeholder = '0.000'
                value= {this.state.subtotal} />
            </View>

            </View>

            {/** OPCIONES */}
            <View style = { styles.frm }>
            <Button style = {{margin: 4}} title="Agregar producto" onPress={async () => {
                 this.GuardarDetalleCompra(this.DetalleCompra); 
            }} />
            
            <Button style = {{margin: 4}} title="Cancelar" onPress={() => {
                this.props.navigation.navigate("Nueva Compra");
            }} />
            </View>
        </View>;
    }

}

export { FrmDetalleCompra }

const styles = StyleSheet.create({
    CardStyles:{
        flex: 5,
        width: "100%",
        padding: 4,
        backgroundColor: 'white'
      },
    Title: {
        fontSize: 26
    },
    Texto: {
        fontSize: 15,
        padding: 4,
        margin: 2
    },
    InputStyle: {
        marginBottom: 4,
        marginTop: 4,
        flex: 1,
        padding: 4,
        margin: 2,
        
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#999"
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        padding: 4,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 8,
        marginRight: 8,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#999"
    },
    subitem_1: {
        flex: 1,
        padding: 4,
        margin: 2,
        backgroundColor: '#e0e0e0'
    },
    subitem_2: {
        padding: 4,
        margin: 2,
        width: 30,
        backgroundColor: '#e0e0e0'
    },
    frm: {
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 4,
        marginRight: 4,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#999"
    },
    box_row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});