import { StyleSheet, Text, View, Button} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainView = (props) => {

        return (
    <Tab.Navigator>
      {/* <Tab.Screen name="MainCursosView" component={MainCursosView} /> */}
      {/* <Tab.Screen name="UsuariosView" component={UsuariosView} /> */}
    </Tab.Navigator>
        );
}

export { MainView }