import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewFrmCompra } from './frmview/NewFrmCompra';

//Views 
import { StockView } from './StockView';

const Stack = createNativeStackNavigator();

export default function MainStockView() {

  return (
      <Stack.Navigator screenOptions = { {
      headerShown: false 
    }}>
       <Stack.Screen name="Stock" component = {StockView} />
       <Stack.Screen name="Nueva Compra" component = {NewFrmCompra} />
       
       {/*
        <Stack.Screen name="MatriculadosView" component={MatriculadosView} />
       <Stack.Screen name="DetalleCursoView" component={DetalleCursoView} />
      */}

      </Stack.Navigator>
  );
  
}