import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput } from 'react-native';

//Componentes
import { CatUnidadMedida } from '../../model/CatUnidadMedida';

//Models
import { CardUnidadMedidaView } from '../utility/CardUnidadMedidaView';

class UnidadMedidaView extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            isLoading: true,
            Dataset: []
        }

        this.CatUnidadMedida = new CatUnidadMedida();
        this.Cargar();
    }

    Cargar = async (param = "") => {
        const unit = await this.CatUnidadMedida.Get(param);

        this.setState({
            isLoading: false,
            Dataset: unit
        });

    }

    SeleccionUnit = async (pk, name) => {
        await this.props.route.params.SeleccionUnit(pk, name);
        this.props.navigation.navigate("Detalle de Compra");
    }

    render() {

        return (<ScrollView style={styles.CardStyles}>
            <TextInput style = {styles.text_input}
            placeholder = 'Buscar unidad de medida'
            onChangeText = { val => this.Cargar(val)}></TextInput>

            {this.state.isLoading ?
                <ActivityIndicator /> :
                this.state.Dataset.map(
                    c => <CardUnidadMedidaView key = {c.PKUnidadMedida}
                     data = { c } SeleccionUnit = { this.SeleccionUnit } />
                )}
        </ScrollView> )
    }
}

export { UnidadMedidaView }

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