import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, TextInput } from 'react-native';

//Componentes
import { TblDetalleVenta } from '../../model/TblDetalleVenta';

class CardDetalleVentaView extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        
        this.state = {
            isLoading: true,
            Dataset: []
        }
     this.CargarProducto(this.props.data)
     this.EliminarDetalleVenta = this.props.EliminarDetalleVenta;
     this.Editar = this.props.FunEditar;
    }

    CargarProducto = async (e = (new TblProductoBodega())) => {
      const list = await e.TblProductos.get();
      const result = list.filter(i => i.PKProducto == e.FKProducto);

      this.setState({
          Dataset: result
      });
  }

    render() {

        return (<View style={styles.CardStyles}>
             {
            this.state.Dataset.map(m => 
                <Text key = {m.PKProducto} style = {styles.Atribute}>Nombre de producto: {m.NombreProducto}</Text> ) }
            <Text style= {styles.Atribute}>Cantidad: {this.props.data.Cantidad}</Text>
            <Text style= {styles.Atribute}>SubTotal: {this.props.data.SubTotal}</Text>
          <View style = {styles.box_row}>
            <TouchableOpacity onPress={() => {
                this.props.FunEditar(this.props.data);
                }} style = {styles.Button1} >
            <Text style = {styles.ButtonText}>Editar</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                this.EliminarDetalleVenta(this.props.data);
              }} style = {styles.Button2} >
          <Text style = {styles.ButtonText}>Eliminar</Text> 
          </TouchableOpacity>
            </View>
        </View>)
    }
}

export { CardDetalleVentaView }

const styles = StyleSheet.create({
    CardStyles:{
      justifyContent: "center",
      borderWidth: 1,
      margin: 8,
      padding: 8, 
      borderRadius: 6,
      marginTop: 4,
      marginBottom: 4
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
      Button1: {
        flex: 1,
        marginTop: 4,
        paddingTop: 4,
        paddingBottom: 10,
        backgroundColor: 'green',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'white'
    },
    Button2: {
      flex: 1,
      marginTop: 4,
      paddingTop: 4,
      paddingBottom: 10,
      backgroundColor: 'red',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white'
  },
  ButtonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 17
      },
      box_row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
    
  });