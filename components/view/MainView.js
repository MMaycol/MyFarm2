import { StyleSheet, Text, View, Button} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Vistas
import MainStockView from './MainStockView';
import { CompraView } from './CompraView';

const Tab = createBottomTabNavigator();

const MainView = (props) => {

        return (
    <Tab.Navigator>
       <Tab.Screen name="Stock" component = {MainStockView} /> 
      <Tab.Screen name="Compra" component={CompraView} />
    </Tab.Navigator>
        );
}

export { MainView }