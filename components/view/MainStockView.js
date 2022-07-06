import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FrmDetalleCompra } from './frmview/FrmDetalleCompra';
import { NewFrmCompra } from './frmview/NewFrmCompra';
import { FrmDetalleVenta } from './frmview/FrmDetalleVenta';
import { NewFrmVenta } from './frmview/NewFrmVenta';
import { ProductosView } from './ProductosView';
import { ProductosVentaView } from './ProductosVentaView';
import { EmpleadosView } from './EmpleadosView';
import {ProveedoresView} from './ProveedoresView';
import {MedidaView} from './MedidaView';
import {UnidadMedidaView} from './UnidadMedidaView';

//Views 
import { StockView } from './StockView';
import { CardProductosView } from '../utility/CardProductosView';



const Stack = createNativeStackNavigator();

export default function MainStockView() {

  return (
      <Stack.Navigator screenOptions = { {
      headerShown: false 
    }}>
       <Stack.Screen name="Stock" component = {StockView} />
       <Stack.Screen name="Detalle de Compra" component = {FrmDetalleCompra} />
       <Stack.Screen name="Nueva Compra" component = {NewFrmCompra} />
       <Stack.Screen name="Seleccionar Producto" component = {ProductosView} />
       <Stack.Screen name="Seleccionar Proveedor" component = {ProveedoresView} />
       <Stack.Screen name="Seleccionar Unit" component = {UnidadMedidaView} />
       <Stack.Screen name="Seleccionar Medida" component = {MedidaView} />
       <Stack.Screen name="Detalle de Venta" component = {FrmDetalleVenta} />
       <Stack.Screen name="Nueva Venta" component = {NewFrmVenta} />
       <Stack.Screen name="Seleccionar Empleado" component = {EmpleadosView} />
       <Stack.Screen name="Seleccionar ProductoVenta" component = {ProductosVentaView} />


      </Stack.Navigator>
  );
  
}