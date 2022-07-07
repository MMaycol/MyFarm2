import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ScrollView, TextInput, Button } from 'react-native';


//Componentes
import { CardProductosView } from '../utility/CardProductosView';

//Models
import { TblProductos } from '../../model/TblProducto';

class ProductosView extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            isLoading: true,
            Dataset: []
        }

        this.TblProductos = new TblProductos();
        this.CargarProductos();
    }

    CargarProductos = async (param = "") => {
        const productos = await this.TblProductos.Get(param);

        this.setState({
            isLoading: false,
            Dataset: productos
        });
    }

    render() {

        return (<ScrollView style = {styles.CardStyles}>
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("Nuevo Producto", { CargarProductos: this.CargarProductos });
            }}
            style = {styles.Button} >
            <Text style = {styles.ButtonText}>Nuevo Producto</Text>
          </TouchableOpacity>

          <TextInput style = {styles.text_input}
            placeholder = 'Buscar productos'
            onChangeText = { val => this.CargarProductos(val)}></TextInput>

            {this.state.isLoading ?
                <ActivityIndicator /> :
                this.state.Dataset.map(
                    c => <CardProductosView key = {c.PKProducto}
                     data = { c } selecct = { false } />
                )}
        </ScrollView> )
    }
}

export { ProductosView }

const styles = StyleSheet.create({
    CardStyles:{
      flex: 5,
      width: "100%",
      backgroundColor: 'white'
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
      }
    
  });