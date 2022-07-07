import React from 'react';

import { StyleSheet, Button, Text, View, ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';

import { TblCompra } from '../../model/TblCompra';
import { TblDetalleCompra } from '../../model/TblDetalleCompra';
import { CardComprasView } from '../utility/CardComprasView';

//Componentes

class CompraView extends React.Component {
    constructor(props) {
        super();
        this.props = props;

        this.state = {
            fecha_compra: "",
            iva_compra: "",
            total_compra: "",
            visible: false,
            isLoading: true,
            Dataset: [],
            productos: [],
            unidadmedida: [],
            proveedor: [],
            detallecompra: []
        }

       this.TblCompra =  new TblCompra();
       this.CargarCompras();
    }

    CargarCompras = async (param = "") => {
      const compra = await this.TblCompra.Get(param);

      this.setState({
          isLoading: false,
          Dataset: compra
      });

  }

  CargarInfo = async (param = (new TblCompra())) => {

    this.setState({
      productos: []
    })
  
    const proveedor = await param.CatProveedor.get();
    const detallecompra = await param.TblDetalleCompra.get();

    detallecompra.map(c => {
      this.Filt1(c)
    })

    this.setState({
      fecha_compra: param.FechaCompra,
      iva_compra: param.IVACompra,
      total_compra: param.Total,
      visible: true,
      proveedor: proveedor,
      detallecompra: detallecompra
    });

}

Filt1  = async (param = (new TblDetalleCompra()))=>{
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
                this.props.navigation.navigate("Nueva Compra", { CargarCompras: this.CargarCompras });
            }}
            style = {styles.Button} >
            <Text style = {styles.ButtonText}>Nueva Compra</Text>
          </TouchableOpacity>

       <TextInput style = {styles.text_input}
            placeholder = 'Buscar compra'
            onChangeText = { val => this.CargarCompras(val)}></TextInput>

            <Text style={styles.Title}>Historial de compras</Text>

            {this.state.isLoading ?
                <ActivityIndicator /> :
                this.state.Dataset.map(
                    c => <CardComprasView key = {c.PKCompra}
                     data = { c } CargarInfo = {this.CargarInfo} />
                )}

        
          <BottomSheet
                    visible = {this.state.visible}
                    onBackButtonPress={this.toggleBottomNavigationView}
                    onBackdropPress = {this.toggleBottomNavigationView}>

                    <ScrollView style = {styles.bottomNavigationView}>

                     <View style = {styles.CardStyle}>
                     <Text style = {styles.Title}>Detalle de Compra</Text>
                     <Button color = {'#000'} onPress = {this.toggleBottomNavigationView} title = 'Regresar'></Button>

                        <View style = {{margin: 8}}>
                        <View style = {{padding: 4, borderWidth: 1, borderColor: '#000'}}>
                        {
                        this.state.proveedor.map(p => {
                                return (<View key = {p.PKProveedor}>
                                <Text style = {styles.Atribute}>Proveedor: {p.NombreProveedor} </Text>
                                </View>)
                            })
                        }

                        <Text style = {styles.Atribute}>Fecha compra: {this.state.fecha_compra} </Text>
                        <Text style = {styles.Atribute}>Iva: {this.state.iva_compra} </Text>
                        <Text style = {styles.Atribute}>Total: {this.state.total_compra} </Text>
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
                                    <Text style = {styles.Atribute}>Cantidad: {this.state.detallecompra[index].Cantidad} </Text>
                                    <Text style = {styles.Atribute}>SubTotal: {this.state.detallecompra[index].SubTotal} </Text>
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

export { CompraView }

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