import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput } from 'react-native';

//Model
import {TblExistencias} from  '../../model/TblExistencias.js'

//Componentes
import { DetalleExistencias } from '../utility/DetalleExistencias.js';

class ExistenciasView extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            isLoading: true,
            Dataset: []
        }

        this.Existencias = new TblExistencias();
        this.CargarExistencias();
    }

    CargarExistencias = async (param = "") => {
        const exist = await this.Existencias.Get(param);

        this.setState({
            isLoading: false,
            Dataset: exist
        });

    }


    render() {

        return (<ScrollView style={styles.CardStyles}>
            <TextInput style={styles.text_input}
            placeholder='Buscar por codigo'
            onChangeText={ val => this.CargarExistencias(val)}></TextInput>

            {this.state.isLoading ?
                <ActivityIndicator /> :
                this.state.Dataset.map(
                    c => <DetalleExistencias
                     data = { c } />
                )}
        </ScrollView> )
    }
}

export { ExistenciasView }

const styles = StyleSheet.create({
    CardStyles:{
      flex: 5,
     width: "100%",
      backgroundColor: 'white'
        },
    text_input: {
      width: "92%",
      margin: 8,
      padding: 10,
      borderRadius: 4,
      elevation: 4,
      border: '3px solid #c6c6c6',
      borderRadius: '10px'
    }
    
  });