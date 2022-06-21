import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Views 
import { StockView } from './StockView';

const Stack = createNativeStackNavigator();

export default function MainStockView() {

  return (
      <Stack.Navigator screenOptions = { {
      headerShown: false 
    }}>
       <Stack.Screen name="Stock" component={StockView} />
       
       {/*
        <Stack.Screen name="MatriculadosView" component={MatriculadosView} />
       <Stack.Screen name="DetalleCursoView" component={DetalleCursoView} />
      */}

      </Stack.Navigator>
  );
  
}