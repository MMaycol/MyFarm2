import React from 'react';

import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { TblCompra } from '../../model/TblCompra';
import { CardComprasView } from '../utility/CardComprasView';

//Componentes

class CompraView extends React.Component {
    constructor(props) {
        super();
        this.props = props;

        this.state = {
            isLoading: true,
            Dataset: []
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

    render() {

        return (<ScrollView style = {styles.CardStyles}>
          <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("Nueva Compra", { CargarCompras: this.CargarCompras });
            }}
            style = {styles.Button} >
            <Text style = {styles.ButtonText}>Nueva Compra</Text>
       </TouchableOpacity>

            <Text style={styles.Title}>Historial de compras</Text>

            {this.state.isLoading ?
                <ActivityIndicator /> :
                this.state.Dataset.map(
                    c => <CardComprasView key = {c.PKCompra}
                     data = { c } />
                )}

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
      width: "92%",
      margin: 8,
      padding: 10,
      borderRadius: 4,
      elevation: 4,
      border: '3px solid #c6c6c6',
      borderRadius: '10px'
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