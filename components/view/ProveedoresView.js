import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput } from 'react-native';

//Componentes
import { CardProveedorView } from '../utility/CardProveedoresView';

//Models
import { CatProveedor } from '../../model/CatProveedor';

class ProveedoresView extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            isLoading: true,
            Dataset: []
        }

        this.CatProveedores = new CatProveedor();
        this.CargarProveedores();
    }

    CargarProveedores = async (param = "") => {
        const proveedores = await this.CatProveedores.Get(param);
        console.log(proveedores);
        this.setState({
            isLoading: false,
            Dataset: proveedores
        });

    }

    SeleccionProveedor = async (pk, name) => {
        await this.props.route.params.SeleccionProveedor(pk, name);
        this.props.navigation.navigate("Nueva Compra");
    }

    render() {

        return (<ScrollView style ={ styles.CardStyles}>
            <TextInput style = {styles.text_input}
            placeholder = 'Buscar proveedores'
            onChangeText = { val => this.CargarProveedores(val)}></TextInput>

            {this.state.isLoading ?
                <ActivityIndicator /> :
                this.state.Dataset.map(
                    c => <CardProveedorView key = {c.PKProveedor}
                     data = { c } SeleccionProveedor = { this.SeleccionProveedor }/>
                )}
        </ScrollView> )
    }
}

export { ProveedoresView }

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