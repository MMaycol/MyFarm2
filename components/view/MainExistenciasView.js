import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Views 
import { ExistenciasView } from './ExistenciasView';

const Stack = createNativeStackNavigator();

export default function MainExistenciasView() {

  return (
      <Stack.Navigator screenOptions = { {
      headerShown: false 
    }}>
       <Stack.Screen name="ExistenciasView" component={ExistenciasView} />
       
       {/*
        <Stack.Screen name="MatriculadosView" component={MatriculadosView} />
       <Stack.Screen name="DetalleCursoView" component={DetalleCursoView} />
      */}

      </Stack.Navigator>
  );
  
}