import { StyleSheet, Text, View, Button} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Vistas
import MainExistenciasView from './MainExistenciasView';

const Tab = createBottomTabNavigator();

const MainView = (props) => {

        return (
    <Tab.Navigator>
       <Tab.Screen name="Existencias" component = {MainExistenciasView} /> 
      {/* <Tab.Screen name="UsuariosView" component={UsuariosView} /> */}
    </Tab.Navigator>
        );
}

export { MainView }