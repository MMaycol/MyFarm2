import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { BottomSheet } from 'react-native-btr';

import { CardProductosView } from '../../utility/CardProductosView';

import { TblDetalleCompra } from '../../../model/TblDetalleCompra';
import { TblProductos } from '../../../model/TblProducto';
import { CatUnidadMedida } from '../../../model/CatUnidadMedida';
import { CardUnidadMedidaView } from '../../utility/CardUnidadMedidaView';

class FrmDetalleCompra extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.DetalleCompra = new TblDetalleCompra();

        this.state = {
            options: "",
            visible: false,
            productos: [],
            unit: [],
            PK: "",
            producto: "",
            precio: "",
            subtotal: "0.000",
            cantidad: "",
            PKU: "",
            unidad_de_medida: ""
        }

        this.TblProductos = new TblProductos();
        this.CatUnidadMedida = new CatUnidadMedida();

        this.NombreProducto = "";
        this.NUnidadMedida = "";

        this.GuardarDetalleCompra = this.props.route.params.GuardarDetalleCompra;
        this.Editar(this.props.route.params.Datos ?? null)
        this.flag = true;

        this.CargarProductos();
        this.CargarUnit();
    }

    CargarProductos = async (param = "") => {
        const productos = await this.TblProductos.Get(param);

        this.setState({
            productos: productos
        });
    }

    CargarUnit = async (param = "") => {
        const unit = await this.CatUnidadMedida.Get(param);

        this.setState({
            unit: unit
        });

    }

    Editar = async (obj = (new TblDetalleCompra())) => {
      
        if(obj != null) {
            const a = await obj.TblProductos.get();
            const b = await obj.CatUnidadMedia.get();

            const NameProduct = a.filter(i => i.PKProducto == obj.FKProducto);
            const NameUnit = b.filter(i => i.PKUnidadMedida == obj.FKUnidadMedida);
            
            NameProduct.forEach(element => {
                this.NombreProducto = element.NombreProducto;
            });
            
            NameUnit.forEach(element => {
                this.NUnidadMedida = element.NombreUnidadMedida;
            });

            this.setState({
                PK: obj.FKProducto,
                producto: this.NombreProducto,
                precio: (parseFloat(obj.SubTotal) / parseFloat(obj.Cantidad)).toString(),
                subtotal: obj.SubTotal,
                cantidad: obj.Cantidad,
                PKU: obj.FKUnidadMedida,
                unidad_de_medida: this.NUnidadMedida 

            });

            this.DetalleCompra.FKProducto = obj.FKProducto;
            this.DetalleCompra.FKUnidadMedida = obj.FKUnidadMedida;
            this.DetalleCompra.Cantidad = obj.Cantidad;
            this.DetalleCompra.SubTotal = obj.SubTotal;
            
            this.flag = false;
        }
       
    }

    SeleccionProducto = async (Pk, Name) => {
    
        this.setState({
            visible: !this.state.visible,
            PK: Pk,
            producto: Name
        });

        this.DetalleCompra.FKProducto = Pk.toString();
    }

    SeleccionUnit = async (Pk, Name) => {
        this.setState({
            visible: !this.state.visible,
            PKU: Pk,
            unidad_de_medida: Name
        });

        this.DetalleCompra.FKUnidadMedida = Pk.toString();
    }

    SubTotal = async (val) =>  {
        this.setState({
            subtotal: (val * this.state.precio).toString(),
            cantidad: val
        });
        
        this.DetalleCompra.Cantidad = val.toString();
        this.DetalleCompra.SubTotal = this.state.subtotal;
    }

    toggleBottomNavigationView = (param = "") => {
        this.setState({
          options: param,
          visible: !this.state.visible
        })
      }

    render() {
        return <View style = {styles.CardStyles}>
            <Text style={styles.Title}>Detalle Compra</Text>

            {/** FORMULARIO */}         

            <View style = { styles.frm }>

            <View style = { styles.box_row }>
            <TextInput style = {styles.InputStyle}
                placeholder = 'Producto'
                value = {this.state.producto}
                disabled />

            <TextInput style = {styles.subitem_2}
                placeholder = 'ID'
                value= {this.state.PK}
                disabled />
            
            <Button color = {'#000'} title = "+" onPress= { async () => {
                //Event seleccionar producto
                this.toggleBottomNavigationView("producto");
            }} />
            </View>

            <View style = {styles.box_row}>
            <Text style={styles.Texto}>Precio:</Text>
            <TextInput style = {styles.InputStyle}
                placeholder = 'C$0.000'
                onChangeText = {val => this.setState({precio: val})} 
                value = {this.state.precio}
                editable={true}/>
            </View>

            <View style = {styles.box_row}>
            <TextInput style = {styles.InputStyle}
                placeholder = 'Unida de medida'
                value = {this.state.unidad_de_medida}
                disabled/>
                <TextInput style = {styles.subitem_2}
                placeholder='ID'
                value={this.state.PKU} 
                disabled />
                <Button color={'#000'} title = "+" onPress= { async () => {
                //Event seleccionar unidad de medida
                this.toggleBottomNavigationView("unit");
            }} />
            </View>

            <View style = {styles.box_row}>
            <Text style = {styles.Texto}>Cantidad:</Text>
            <TextInput style = {styles.InputStyle}
                placeholder = '0'
                onChangeText = {val => this.SubTotal(val)}
                value = {this.state.cantidad}
                editable={true}/>
            </View>

            <View style = {styles.box_row}>
            <Text style = {styles.Texto}>SubTotal:</Text>
            <TextInput style = {styles.InputStyle}
                value= { "C$" + this.state.subtotal} />
            </View>

            </View>

            {/** OPCIONES */}
            <View style = { styles.frm }>
            <Button color={'#000'} style = {{margin: 4}} title="Agregar producto" onPress={async () => {
                 this.DetalleCompra.SubTotal = this.state.subtotal;
                 this.GuardarDetalleCompra(this.DetalleCompra, this.state.PK, this.flag); 
            }} />
            
            <Button color={'red'} style = {{margin: 4}} title="Cancelar" onPress={() => {
                this.props.navigation.navigate("Nueva Compra");
            }} />
            </View>

            <BottomSheet
                    visible = {this.state.visible}
                    onBackButtonPress = {this.toggleBottomNavigationView}
                    onBackdropPress = {this.toggleBottomNavigationView}>

                <ScrollView style = {styles.bottomNavigationView}>
                    <View style = {styles.CardStyle}>
                     <Text style = {styles.Title}>Seleccionar producto</Text>
                     <Button color = {'#000'} onPress = {this.toggleBottomNavigationView} title = 'Regresar'></Button>

                    {
                    this.state.options == "producto"?
                     <TextInput style = {styles.text_input}
                                placeholder = 'Buscar productos'
                                onChangeText = { val => this.CargarProductos(val)}></TextInput> 
                                : false
                    }
                    {
                    this.state.options == "unit"?
                    <TextInput style = {styles.text_input}
                                placeholder = 'Buscar unidad de medida'
                                onChangeText = { val => this.CargarProductos(val)}></TextInput>  
                                : false
                    }
                    
                    {
                    this.state.options == "producto"?
                    this.state.productos.map(
                    c => <CardProductosView key = {c.PKProducto}
                     data = { c } SeleccionProducto = { this.SeleccionProducto } selecct = { true } />
                    ) : false
                    }

                    {
                    this.state.options == "unit"?
                    this.state.unit.map(
                        c => <CardUnidadMedidaView key = {c.PKUnidadMedida}
                         data = { c } SeleccionUnit = { this.SeleccionUnit } />
                    ) : false
                    }

                    </View>

                        </ScrollView>
                    </BottomSheet>
        </View>;
    }

}

export { FrmDetalleCompra }

const styles = StyleSheet.create({
    CardStyles:{
        flex: 5,
        width: "100%",
        padding: 4,
        backgroundColor: 'white'
      },
    Title: {
        fontSize: 26
    },
    Texto: {
        fontSize: 15,
        padding: 4,
        margin: 2
    },
    InputStyle: {
        marginBottom: 4,
        marginTop: 4,
        flex: 1,
        padding: 4,
        margin: 2,
        
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#999"
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        padding: 4,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 8,
        marginRight: 8,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#999"
    },

    subitem_2: {
        padding: 4,
        margin: 2,
        width: 30,
        
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#999"
    },
    frm: {
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 4,
        marginRight: 4,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#999"
    },
    box_row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
       
      },
      CardStyle: {
        margin: 8
    },
    text_input: {
            height: 50,
            margin: 12,
            fontSize: 20,
            padding: 8,
            backgroundColor: '#e0e0e0',
            borderRadius: 10
          }
});