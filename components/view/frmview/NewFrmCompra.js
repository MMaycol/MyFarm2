import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert } from 'react-native';

//Model
import { TblCompra } from '../../../model/TblCompra';
import { TblDetalleCompra } from '../../../model/TblDetalleCompra';
import { CardDetalleCompraView } from '../../utility/CardDetalleCompraView';

class NewFrmCompra extends React.Component {
    constructor(props) {
        super();
        this.props = props;

        this.Compra = new TblCompra();
        this.detallecompra = new TblDetalleCompra();

        this.state = {
            PK: "ID",
            detallecompra: [],
            proveedor: "Proveedor",
            fecha: Date().toString()
        }

        this.CargarCompras = this.props.route.params.CargarCompras;
    }

    GuardarDetalleCompra = async (DetalleCompra) => {
        
        this.state.detallecompra.push(DetalleCompra);

        this.setState({
            detallecompra: this.state.detallecompra
        });
        
        this.props.navigation.navigate("Nueva Compra");
    }

    EliminarDetalleCompra = async (item) => {

    }

    SeleccionProveedor = async (Pk, Name) => {
        this.setState({
            PK: Pk,
            proveedor: Name
        })

        this.Compra.FKProveedor = Pk;
    }

    Save = async () => {
        try {
            this.Compra.FechaCompra = this.state.fecha;

            await this.Compra.Save("PKCompra");

            for (let index = 0; index < this.state.detallecompra.length; index++) {
                const detallecompra = this.state.n[index];
                detallecompra.FKCompra = this.Compra.PKCompra;

                await bloque.Save("PKDetalleCompra");
            }

            return true;
        } catch (error) {
            console.log(error);
            return true;
        }

    }

    render() {
        return <ScrollView style = {styles.CardStyles}>
            <Text style={styles.Title}>Nueva Compra</Text>

            {/** FORMULARIO */}

            <View style = { styles.frm }>
            
            <View style = { styles.box_row }>
            <TextInput style = {styles.InputStyle}
                placeholder='Proveedor'
                value = { this.state.proveedor }
                disabled />

            <TextInput style = {styles.subitem_2}
                placeholder = 'ID'
                value = { this.state.PK }
                disabled />

            <Button title = "+" onPress = { async () => {
                //Event seleccionar proveedor
                this.props.navigation.navigate("Seleccionar Proveedor", {
                    SeleccionProveedor: this.SeleccionProveedor
                });
            }} />
            </View>

            <TextInput style = {styles.InputStyle}
                placeholder = 'Fecha de Compra'
                value = {this.state.fecha}/>
            </View>

            <Button title="Agregar producto" onPress={async () => {
                this.props.navigation.navigate("Detalle de Compra", {
                    GuardarDetalleCompra: this.GuardarDetalleCompra
                });
            }} />

            {/** Detalle */}
            <Text style = {styles.Texto}>Detalle de compra</Text>
            <ScrollView>
                {
                this.state.detallecompra.map(
                    c => <CardDetalleCompraView key = {c.PKDetalleCompra} data = {c}  />
                )
                }
            </ScrollView>

            <View style= {styles.frm}>
            <View style = {styles.box_row}>

            <Text style={styles.Texto}>IVA:</Text>
            <TextInput style = {styles.subitem_2}
                placeholder = '0.000' 
                onChangeText = {val => this.Compra.IVACompra = val} />

            <Text style={styles.Texto}>Total:</Text>
            <TextInput style = {styles.InputStyle}
                placeholder = '0.000' onChangeText = {val => this.Compra.Total = val} />

            </View>
        </View>

            {/** OPCIONES */}
            <Button title = "Guardar" onPress = { async () => {
                const response = await this.Save();
                
                if (response) {
                    await this.CargarCompras(); 
                    this.props.navigation.navigate("Compra");
                } else {
                    Alert.alert("Algo salio mal :(");
                }
            
            }} />

            <Button title="Cancelar" onPress={() => {
                this.props.navigation.navigate("Compra");
            }} />
        </ScrollView>;
    }
}

export { NewFrmCompra }

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
        width: 60,

        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#999"
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
        borderRadius: 4,
        borderColor: "black"
    },
    box_row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});