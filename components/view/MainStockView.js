import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FrmDetalleCompra } from './frmview/FrmDetalleCompra';
import { NewFrmCompra } from './frmview/NewFrmCompra';
import { ProductosView } from './ProductosView';
import {ProveedoresView} from './ProveedoresView';
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
       
      </Stack.Navigator>
  );
  
}