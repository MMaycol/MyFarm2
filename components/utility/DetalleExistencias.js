import React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
//Model

class DetalleExistencias extends React.Component {
    constructor(props) {
        super();

        this.data = props.data;
        this.state = {
            Dataset: []
        }

        this.CargarProducto(this.data);
    }

    render() {
      
        return(<View style={styles.CardStyle}>
       <Text style={styles.Title}>Detalle</Text>
        {
            this.state.Dataset.map(m => 
                <Text style={styles.Atribute}>Nombre de producto: {m.NombreProducto}</Text> )
        }
        <Text style={styles.Atribute}>Existencias: {this.data.Existencias}</Text>
        <Text style={styles.Atribute}>Codigo: {this.data.PKExistencias}</Text>
       <Button title = "Ver Mas" onPress={() => { 				
            	/* props.CargarBloques(props.data) */
            				}}
        			> </Button>
     </View>)

     
    }
    
     CargarProducto = async (e = (new TblExistencias())) => {
        const d = await e.TblProductos.get();
    
        this.setState({
            Dataset: d
        });
    }
}

export { DetalleExistencias }

const styles = StyleSheet.create({
    CardStyle: {
        justifyContent: "center",
        backgroundColor: 'black',
        margin: 14,
        padding: 12, 
        borderRadius: 6,
        marginTop: 4,
        marginBottom: 4
    }, Title: {
        color: "white",
        fontSize: 26
    }, Atribute: {
        color: "white",
        fontSize: 16,
        marginBottom: 8
    }, Resumen: {
        color: "white",
        fontSize: 12
    }
});