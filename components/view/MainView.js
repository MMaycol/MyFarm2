import { StyleSheet, Text, View, Button} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Vistas
import MainStockView from './MainStockView';
import { CompraView } from './CompraView';
import { VentaView } from './VentaView';
import { ProductosView } from './ProductosView';

const Tab = createBottomTabNavigator();

const MainView = (props) => {

        return (
    <Tab.Navigator>
      <Tab.Screen name="Stock" component = { MainStockView } />
       <Tab.Screen name="Productos" component = { ProductosView } />
      <Tab.Screen name="Compra" component = { CompraView } />
      <Tab.Screen name="Venta" component = { VentaView } />
       
      
    </Tab.Navigator>
        );
}

export { MainView }