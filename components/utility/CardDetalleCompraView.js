import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { TblDetalleCompra } from '../../model/TblDetalleCompra.js';

//Componentes

class CardDetalleCompraView extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        
        this.state = {
            isLoading: true,
            Dataset: []
        }
     this.CargarProducto(this.props.data)
    }

    CargarProducto = async (e = (new TblDetalleCompra())) => {
        const c = await e.TblProductos.get();
    
        this.setState({
            Dataset: c
        });
    }

    render() {

        return (<View>
             {
            this.state.Dataset.map(m => 
                <Text key = {m.PKProducto} style = {styles.Atribute}>Nombre de producto: {m.NombreProducto}</Text> )
             }
            <Text>1</Text>
        </View>)
    }
}

export { CardDetalleCompraView }

const styles = StyleSheet.create({
    CardStyles:{
      flex: 5,
      width: "100%",
      backgroundColor: 'white'
        },
        Atribute: {
            color: "black",
            fontSize: 16,
            marginBottom: 8
        },
       text_input: {
        height: 50,
        margin: 12,
        fontSize: 20,
        padding: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 10
      },
    
  });