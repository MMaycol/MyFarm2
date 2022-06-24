import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { TblDetalleCompra } from '../../model/TblDetalleCompra.js';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

//Componentes

class CardDetalleCompraView extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        
        this.state = {
            isLoading: true,
            Dataset: [],
            HeadTable: ['Nombre de producto', 'Cantida', 'Subtotal'],
            DataTable: [
              ['1', '2', '3', '4', '5'],
              ['a', 'b', 'c', 'd', 'e'],
              ['1', '2', '3', '4', '5'],
              ['a', 'b', 'c', 'd', 'e'],
              ['1', '2', '3', '4', '5']
            ]
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
            <Table borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}>
           <Row data = {this.state.HeadTable} style = {styles_table.HeadStyle} textStyle = {styles_table.TableText}/>
           <Rows data = {this.state.DataTable} textStyle = {styles_table.TableText}/>
           </Table>
             {
            this.state.Dataset.map(m => 
                <Text key = {m.PKProducto} style = {styles.Atribute}>Nombre de producto: {m.NombreProducto}</Text> )
             }
            
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

  const styles_table = StyleSheet.create({
    container: { 
      flex: 1,
      padding: 18,
      paddingTop: 35,
      backgroundColor: '#ffffff' 
    },
    HeadStyle: { 
      height: 50,
      alignContent: "center",
      backgroundColor: '#ffe0f0'
    },
    TableText: { 
      margin: 10
    }
  });