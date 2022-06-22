import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { TblProductoBodega } from '../../model/TblProductoBodega.js';

//Componentes
import { DetalleStock } from '../utility/DetalleStock.js';

class StockView extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            isLoading: true,
            Dataset: []
        }

        this.TblProductoBodega = new TblProductoBodega();
        this.CargarStock();
    }

    CargarStock = async (param = "") => {
        const stock = await this.TblProductoBodega.Get(param);

        this.setState({
            isLoading: false,
            Dataset: stock
        });

    }


    render() {

        return (<ScrollView style={styles.CardStyles}>
            <TextInput style={styles.text_input}
            placeholder='Buscar por codigo'
            onChangeText={ val => this.CargarStock(val)}></TextInput>

            {this.state.isLoading ?
                <ActivityIndicator /> :
                this.state.Dataset.map(
                    c => <DetalleStock key = {c.FKProducto}
                     data = { c } />
                )}
        </ScrollView> )
    }
}

export { StockView }

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
    
  });