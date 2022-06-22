import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert } from 'react-native';

//Model
import { TblCompra } from '../../../model/TblCompra';
import { TblDetalleCompra } from '../../../model/TblDetalleCompra';

class NewFrmCompra extends React.Component {
    constructor(props) {
        super();
        this.props = props;

        this.Compra = new TblCompra();
        this.detallecompra = new TblDetalleCompra();

        this.state = {
            detallecompra: []
        }

        this.CargarCompras = this.props.route.params.CargarCompras;
    }

    GuardarDetalleCompra = async (DetalleCompra = (new TblDetalleCompra())) => {
        this.state.detallecompra.push(DetalleCompra);
        this.setState({
            detallecompra: this.state.detallecompra
        });

        //this.props.navigation.navigate("NewFrmCompra");
    }

    Save = async () => {
        try {
            await this.Compra.Save("PKCompra");

            for (let index = 0; index < this.state.detallecompra.length; index++) {
                const detallecompra = this.state.n[index];
                detallecompra.PKCompra = this.Compra.PKCompra;

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

            <View style = { styles.box }>
            <TextInput style = {styles.subitem_1}
                placeholder='Proveedor'
                disabled />

            <TextInput style = {styles.subitem_2}
                placeholder = 'ID'
                onChangeText = { val => this.Compra.FKProveedor = val }
                disabled />
            
            <Button title = "..." onPress= { async () => {
                //Event seleccionar proveedor
            }} />

            </View>

            {/* BOX PRODUCT */}
            <View style = { styles.frm }>

            <View style = { styles.box_row }>
            <TextInput style = {styles.subitem_1}
                placeholder='Nombre de Producto'
                disabled />

            <TextInput style = {styles.subitem_2}
                placeholder='ID'
                onChangeText = { val => this.detallecompra.FKProducto = val } 
                disabled />
            
            <Button title = "..." onPress= { async () => {
                //Event seleccionar producto
            }} />
            </View>

            <View style={styles.box_row}>
            <Text style={styles.Texto}>Cantidad:</Text>
            <TextInput style = {styles.InputStyle}
                placeholder='0'
                onChangeText={val => this.detallecompra.Cantidad = val} />
            </View>

            <View style={styles.box_row}>
            <TextInput style = {styles.subitem_1}
                placeholder='Unida de medida'
                onChangeText = { val => this.detallecompra.Cantidad = val } 
                disabled/>

                <Button title = "..." onPress= { async () => {
                //Event seleccionar unidad de medida
            }} />
            </View>

            <View style={styles.box_row}>
            <Text style={styles.Texto}>Precio:</Text>
            <TextInput style = {styles.InputStyle}
                placeholder='0.000'
                onChangeText={val => this.detallecompra.Cantidad = val} />
            </View>

            <Button title = "Agregar" onPress= { async () => {
                //Event agregar
            }} />

            </View>

            <TextInput style={styles.InputStyle}
                placeholder='Fecha'
                onChangeText={val => this.Curso.FechaInicio = val} />

            {/** Detalle */}
            <Text style = {styles.Texto}>Detalle de compra</Text>
            <ScrollView>
                {this.state.detallecompra.map(p => {
                    return (<View>
                        <Text>{ p.PKCompra }</Text>
                    </View>)
                })}
            </ScrollView>

            {/** OPCIONES */}
            <Button title = "Guardar" onPress = { async () => {
                const response = await this.Save();
                
                if (response) {
                    console.log(this.props.route.params);
                    await this.CargarCompra(); 
                    this.props.navigation.navigate("Compras");
                } else {
                    Alert.alert("Algo salio mal :(");
                }
            
            }} />

            <Button title="Cancelar" onPress={() => {
                console.log("Estamos aqui");
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
        width: 30,
        backgroundColor: '#e0e0e0'
    },
    frm: {
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 8,
        marginRight: 8,
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