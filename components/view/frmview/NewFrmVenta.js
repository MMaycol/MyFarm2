import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert } from 'react-native';

//Model
import { TblVenta } from '../../../model/TblVenta';
import { TblDetalleVenta} from '../../../model/TblDetalleVenta';
import { CardDetalleVentaView } from '../../utility/CardDetalleVentaView';

class NewFrmVenta extends React.Component {
    constructor(props) {
        super();
        this.props = props;

        this.Venta = new TblVenta();
        this.detalleventa = new TblDetalleVenta();
       
        this.state = {
            PK: "",
            detalleventa: [],
            empleado: "",
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

        this.CargarVentas = this.props.route.params.CargarVentas;
    }

    GuardarDetalleVenta = async (DetalleVenta = (new TblDetalleVenta), key, flag) => {

            if(this.state.detalleventa.length > 0) {

            const detalleventas = this.state.detalleventa.map(p => {
                if (p.FKProducto === key) {
                    this.keys = p.FKProducto;
                    
                    this.total = p.SubTotal;
                    p.FKUnidadMedida = DetalleVenta.FKUnidadMedida;

                    if(flag) {
                        p.Cantidad = ( parseFloat(p.Cantidad) + parseFloat(DetalleVenta.Cantidad));
                        p.SubTotal = (parseFloat(p.SubTotal) + parseFloat(DetalleVenta.SubTotal));
                    } else {
                        p.Cantidad = DetalleVenta.Cantidad;
                        p.SubTotal = DetalleVenta.SubTotal;
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
                detalleventa: detalleventas,
                Total: this.OpA,
                IVA: this.OpB 
            });

              } else {

                this.state.detalleventa.push(DetalleVenta);

                this.setState({
                    detalleventa: this.state.detalleventa,
                    Total:  this.state.Total + parseFloat(DetalleVenta.SubTotal) + (parseFloat(DetalleVenta.SubTotal) * parseFloat("0.15")),
                    IVA: this.state.IVA + parseFloat(DetalleVenta.SubTotal) * parseFloat("0.15")
                });

              }
            
            } else {

                this.state.detalleventa.push(DetalleVenta);

                this.setState({
                    detalleventa: this.state.detalleventa,
                    Total:  this.state.Total + parseFloat(DetalleVenta.SubTotal) + (parseFloat(DetalleVenta.SubTotal) * parseFloat("0.15")),
                    IVA: this.state.IVA + parseFloat(DetalleVenta.SubTotal) * parseFloat("0.15")
                });
            }
      
        
        this.props.navigation.navigate("Nueva Venta");
    }

    EliminarDetalleVenta = async (item) => {

        const delete_item = this.state.detalleVenta.filter(i => i.FKProducto !== item.FKProducto);
 
        this.setState({
            detalleventa: delete_item,
            Total: this.state.Total - parseFloat(item.SubTotal) - (parseFloat(item.SubTotal) * parseFloat("0.15")),
            IVA: this.state.IVA - (parseFloat(item.SubTotal) * parseFloat("0.15"))
        });
    }

    FunEditar = async (item) => {
       
        this.props.navigation.navigate("Detalle de Venta", {
            GuardarDetalleVenta: this.GuardarDetalleVenta,
            Datos: item
        });
    
    }

    SeleccionEmpleado = async (key, Name) => {
        this.setState({
            PK: key,
            empleado: Name
        });

        this.Venta.FKEmpleado = key;
    }

    Save = async () => {
        try {
            this.Venta.FechaFactura = this.state.fecha;
            this.Venta.TotalVenta = this.state.Total;
            this.Venta.IVAVenta = this.state.IVA;

            await this.Venta.Save("PKVenta");

            for (let index = 0; index < this.state.detalleventa.length; index++) {
                const detalleventa = this.state.detalleventa[index];
                detalleventa.FKVenta= this.Venta.PKVenta;

                await detalleventa.Save("PKDetalleVenta");
            }

            return true;
        } catch (error) {
            console.log(error);
            return true;
        }

    }

    render() {
        return <ScrollView style = {styles.CardStyles}>
            <Text style={styles.Title}>Nueva Venta</Text>

            {/** FORMULARIO */}

            <View style = { styles.frm }>
            
            <View style = { styles.box_row }>
            <TextInput style = {styles.InputStyle}
                placeholder='Empleado'
                value = { this.state.empleado }
                disabled />

            <TextInput style = {styles.subitem_2}
                placeholder = 'ID'
                value = { this.state.PK }
                disabled />

            <Button color={'#000'} title = "+" onPress = { async () => {
                //Event seleccionar proveedor
                this.props.navigation.navigate("Seleccionar Empleado", {
                    SeleccionEmpleado: this.SeleccionEmpleado
                });
            }} />
            </View>
            
            <TextInput style = {styles.InputStyle}
                placeholder = 'Fecha de Venta'
                value = {this.state.fecha}/>
            </View>

            <Button color={'#000'} title="Agregar producto" onPress={async () => {
                this.props.navigation.navigate("Detalle de Venta", {
                    GuardarDetalleVenta: this.GuardarDetalleVenta
                });
            }} />

            {/** Detalle */}
            <Text style = {styles.Texto}>Detalle de Venta</Text>
            <ScrollView>
            
                {
                this.state.detalleventa.map(
                    c => <CardDetalleVentaView key = {c.FKProducto} data = {c}
                     EliminarDetalleVenta = {this.EliminarDetalleVenta}  
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
                onChangeText = {val => this.Venta.Total = val} 
                value = {"C$" + this.state.Total}/>

            </View>
        </View>

            {/** OPCIONES */}
            <Button color={'#000'} title = "Guardar" onPress = { async () => {
                const response = await this.Save();
                
                if (response) {
                    await this.CargarVentas();
                    this.setState({
                        PK: "",
                        detalleventa: [],
                        empleado: "",
                        fecha: Date().toString(),
                        Total: 0.000,
                        IVA: 0.000
                    });

                    this.props.navigation.navigate("Venta");
                } else {
                    Alert.alert("Algo salio mal :(");
                }
            
            }} />

            <Button color={'red'} title="Cancelar" onPress={() => {
                this.props.navigation.navigate("Venta");
            }} />
        </ScrollView>;
    }
}

export { NewFrmVenta }

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