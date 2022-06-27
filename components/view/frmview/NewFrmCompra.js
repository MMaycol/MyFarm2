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
            PK: "",
            detallecompra: [],
            proveedor: "",
            fecha: Date().toString(),
            Total: 0.000,
            IVA: 0.000
        }

        /*
        * Variables para la ediccion de los productos ya seleccionados
          y por si se agrega un producto ya seleccionado anteriromente
          para evitar la repeticion de card
          sieguiente var:
            this.total = 0;
            this.OpA = 0;
            this.OpB = 0;
            this.NewTotal = 0;
            this.keys = 0;
        */
        this.total = 0;
        this.OpA = 0;
        this.OpB = 0;
        this.NewTotal = 0;
        this.keys = 0;

        this.CargarCompras = this.props.route.params.CargarCompras;
    }

    GuardarDetalleCompra = async (DetalleCompra = (new TblDetalleCompra), key, flag) => {

            if(this.state.detallecompra.length > 0) {

            const detallecompras = this.state.detallecompra.map(p => {
                if (p.FKProducto === key) {
                    this.keys = p.FKProducto;
                    
                    this.total = p.SubTotal;
                    p.FKUnidadMedida = DetalleCompra.FKUnidadMedida;

                    if(flag) {
                        p.Cantidad = ( parseFloat(p.Cantidad) + parseFloat(DetalleCompra.Cantidad));
                        p.SubTotal = (parseFloat(p.SubTotal) + parseFloat(DetalleCompra.SubTotal));
                    } else {
                        p.Cantidad = DetalleCompra.Cantidad;
                        p.SubTotal = DetalleCompra.SubTotal;
                    }

                    this.NewTotal = p.SubTotal;
                return p;
                }
                return p;
            });

            console.log(this.keys + " == "+ key);

            if(this.keys == key) {

            this.OpA = this.state.Total - (parseFloat(this.total) + (parseFloat(this.total) * parseFloat("0.15")));
            this.OpB = this.state.IVA - (parseFloat(this.total) * parseFloat("0.15"));
            
            this.OpA = this.OpA + (parseFloat(this.NewTotal) + (parseFloat(this.NewTotal) * parseFloat("0.15")));
            this.OpB = this.OpB + (parseFloat(this.NewTotal) * parseFloat("0.15"));
            
            this.setState({
                detallecompra: detallecompras,
                Total: this.OpA,
                IVA: this.OpB 
            });

              } else {

                this.state.detallecompra.push(DetalleCompra);

                this.setState({
                    detallecompra: this.state.detallecompra,
                    Total:  this.state.Total + parseFloat(DetalleCompra.SubTotal) + (parseFloat(DetalleCompra.SubTotal) * parseFloat("0.15")),
                    IVA: this.state.IVA + parseFloat(DetalleCompra.SubTotal) * parseFloat("0.15")
                });

              }
            
            } else {

                this.state.detallecompra.push(DetalleCompra);

                this.setState({
                    detallecompra: this.state.detallecompra,
                    Total:  this.state.Total + parseFloat(DetalleCompra.SubTotal) + (parseFloat(DetalleCompra.SubTotal) * parseFloat("0.15")),
                    IVA: this.state.IVA + parseFloat(DetalleCompra.SubTotal) * parseFloat("0.15")
                });
            }
      
        
        this.props.navigation.navigate("Nueva Compra");
    }

    EliminarDetalleCompra = async (item) => {

        const delete_item = this.state.detallecompra.filter(i => i.FKProducto !== item.FKProducto);
 
        this.setState({
            detallecompra: delete_item,
            Total: this.state.Total - parseFloat(item.SubTotal) - (parseFloat(item.SubTotal) * parseFloat("0.15")),
            IVA: this.state.IVA - (parseFloat(item.SubTotal) * parseFloat("0.15"))
        });
    }

    FunEditar = async (item) => {
       
        this.props.navigation.navigate("Detalle de Compra", {
            GuardarDetalleCompra: this.GuardarDetalleCompra,
            Datos: item
        });
    
    }

    SeleccionProveedor = async (key, Name) => {
        this.setState({
            PK: key,
            proveedor: Name
        });

        this.Compra.FKProveedor = key;
    }

    Save = async () => {
        try {
            this.Compra.FechaCompra = this.state.fecha;
            this.Compra.Total = this.state.Total;
            this.Compra.IVACompra = this.state.IVA;

            await this.Compra.Save("PKCompra");

            for (let index = 0; index < this.state.detallecompra.length; index++) {
                const detallecompra = this.state.detallecompra[index];
                detallecompra.FKCompra = this.Compra.PKCompra;

                await this.detallecompra.Save("PKDetalleCompra");
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
                    c => <CardDetalleCompraView key = {c.FKProducto} data = {c}
                     EliminarDetalleCompra = {this.EliminarDetalleCompra}  
                     FunEditar = {this.FunEditar}/>
                )
                }

            </ScrollView>

            <View style= {styles.frm}>
                <Text style={styles.Texto}>Descuento:</Text>
                <TextInput style = {styles.InputStyle}
                    placeholder = '0.000'
                    onChangeText = { val => val}/>
                    
            <View style = {styles.box_row}>

            <Text style={styles.Texto}>IVA:</Text>
            <TextInput style = {styles.subitem_2} 
                value = {"C$" + this.state.IVA}/>

            <Text style={styles.Texto}>Total:</Text>
            <TextInput style = {styles.InputStyle}
                onChangeText = {val => this.Compra.Total = val} 
                value = {"C$" + this.state.Total}/>

            </View>
        </View>

            {/** OPCIONES */}
            <Button title = "Guardar" onPress = { async () => {
                const response = await this.Save();
                
                if (response) {
                    await this.CargarCompras();
                    this.setState({
                        PK: "",
                        detallecompra: [],
                        proveedor: "",
                        fecha: Date().toString(),
                        Total: 0.000,
                        IVA: 0.000
                    });

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