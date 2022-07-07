import React from 'react';

import { StyleSheet, Button, Text, View, ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';

import { TblVenta } from '../../model/TblVenta';
import { TblDetalleVenta } from '../../model/TblDetalleVenta';
import { CardVentasView } from '../utility/CardVentasView';

//Componentes

class VentaView extends React.Component {
    constructor(props) {
        super();
        this.props = props;

        this.state = {
            fecha_venta: "",
            iva_venta: "",
            total_venta: "",
            visible: false,
            isLoading: true,
            Dataset: [],
            productos: [],
            unidadmedida: [],
            empleado: [],
            detalleventa: []
        }

       this.TblVenta =  new TblVenta();
       this.CargarVentas();
    }

    CargarVentas = async (param = "") => {
      const venta = await this.TblVenta.Get(param);

      this.setState({
          isLoading: false,
          Dataset: venta
      });

  }

  CargarInfo = async (param = (new TblVenta())) => {

    this.setState({
      productos: []
    });

    const empleado = await param.CatEmpleado.get();
    const detalleventa = await param.TblDetalleVenta.get();

    detalleventa.map(c => {
      this.Filt1(c)
    })

    this.setState({
      fecha_venta: param.FechaFactura,
      iva_venta: param.IVAVenta,
      total_venta: param.TotalVenta,
      visible: true,
      empleado: empleado,
      detalleventa: detalleventa
    });

    console.log(this.state.detalleventa);
}

Filt1  = async (param = (new TblDetalleVenta()))=>{
    const rs = await param.TblProductos.get();

    rs.map(c => {
      this.Filt2(c)
    });
  }
  
  Filt2 = async (param) => {
    this.state.productos.push(param);
    this.setState({
      productos: this.state.productos
  });
  }

  toggleBottomNavigationView = () => {
    this.setState({
      visible: false
    })
  }

    render() {

        return (<ScrollView style = {styles.CardStyles}>
          <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("Nueva Venta", { CargarVentas: this.CargarVentas });
            }}
            style = {styles.Button} >
            <Text style = {styles.ButtonText}>Nueva Venta</Text>
          </TouchableOpacity>

       <TextInput style = {styles.text_input}
            placeholder = 'Buscar Venta'
            onChangeText = { val => this.CargarVentas(val)}></TextInput>

            <Text style={styles.Title}>Historial de Ventas</Text>

            {this.state.isLoading ?
                <ActivityIndicator /> :
                this.state.Dataset.map(
                    c => <CardVentasView key = {c.PKVenta}
                     data = { c } CargarInfo = {this.CargarInfo} />
                )}

        
          <BottomSheet
                    visible = {this.state.visible}
                    onBackButtonPress={this.toggleBottomNavigationView}
                    onBackdropPress = {this.toggleBottomNavigationView}>

                    <ScrollView style = {styles.bottomNavigationView}>

                     <View style = {styles.CardStyle}>
                     <Text style = {styles.Title}>Detalle de Venta</Text>
                     <Button color = {'#000'} onPress = {this.toggleBottomNavigationView} title = 'Regresar'></Button>

                        <View style = {{margin: 8}}>
                        <View style = {{padding: 4, borderWidth: 1, borderColor: '#000'}}>
                        {
                        this.state.empleado.map(p => {
                                return (<View key = {p.PKEmpleado}>
                                <Text style = {styles.Atribute}>Empleado: {p.NombreEmpleado} </Text>
                                </View>)
                            })
                        }

                        <Text style = {styles.Atribute}>Fecha Venta: {this.state.fecha_venta} </Text>
                        <Text style = {styles.Atribute}>Iva: {this.state.iva_venta} </Text>
                        <Text style = {styles.Atribute}>Total: {this.state.total_venta} </Text>
                        </View>
                        <Text style = {styles.Title}>Productos</Text>
                        {
                            this.state.productos.map((c, index)=> {
                                return (<View style = {{
                                    padding: 4,
                                    borderWidth: 2,
                                     borderColor: '#000',
                                      borderRadius: 4,
                                      margin: 2}} key = {c.PKProducto}>
                                    <Text style = {styles.Atribute}>Nombre de producto: {c.NombreProducto} </Text>
                                    <Text style = {styles.Atribute}>Cantidad: {this.state.detalleventa[index].Cantidad} </Text>
                                    <Text style = {styles.Atribute}>SubTotal: {this.state.detalleventa[index].SubTotal} </Text>
                                   
                                </View>)
                            })
                        }
                        </View>
                    </View>
                        </ScrollView>
                    </BottomSheet>

        </ScrollView> )
    }
}

export { VentaView }

const styles = StyleSheet.create({
    CardStyles:{
      flex: 5,
      width: "100%",
      backgroundColor: 'white'
    },
    Title: {
        marginLeft: 4,
        padding: 8,
        color: "black",
        fontSize: 30,
        justifyContent: 'center'
    },
    text_input: {
            height: 50,
            margin: 12,
            fontSize: 20,
            padding: 8,
            backgroundColor: '#e0e0e0',
            borderRadius: 10
          },
    Button: {
        marginRight: 14,
        marginLeft: 14,
        marginTop: 24,
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
        fontSize: 19
      },
      bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
       
      },
      CardStyle: {
        padding: 10,
        margin: 4
    },
      Atribute: {
        color: "#000",
        fontSize: 20
    }
    
  });