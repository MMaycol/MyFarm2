import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput } from 'react-native';

//Componentes
import { CardEmpleadosView } from '../utility/CardEmpleadosView';

//Models
import { CatEmpleado } from '../../model/CatEmpleado';

class EmpleadosView extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            isLoading: true,
            Dataset: []
        }


        this.CatEmpleados = new CatEmpleado();
        this.CargarEmpleados();
    }

    CargarEmpleados = async (param = "") => {
        const empleados = await this.CatEmpleados.Get(param);
        
        this.setState({
            isLoading: false,
            Dataset: empleados
        });

    }

    SeleccionEmpleado = async (pk, name) => {
        await this.props.route.params.SeleccionEmpleado(pk, name);
        this.props.navigation.navigate("Nueva Venta");
    }

    render() {

        return (<ScrollView style ={ styles.CardStyles}>
            <TextInput style = {styles.text_input}
            placeholder = 'Buscar Empleados'
            onChangeText = { val => this.CargarEmpleados(val)}></TextInput>

            {this.state.isLoading ?
                <ActivityIndicator /> :
                this.state.Dataset.map(
                    c => <CardEmpleadosView key = {c.PKEmpleado}
                     data = { c } SeleccionEmpleado = { this.SeleccionEmpleado }/>
                )}
        </ScrollView> )
    }
}

export { EmpleadosView }

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