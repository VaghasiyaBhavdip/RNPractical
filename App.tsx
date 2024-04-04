
import * as React from 'react';
import { View, Text, LogBox } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontsFamily } from './src/utility/util';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Login from './src/screen/Login';
import Registation from './src/screen/Registation';
import Deshbord from './src/screen/Deshbord';



const Stack = createNativeStackNavigator();
export type UserData = {
  CompanyName: string,
  PersonName: string,
  MobileNumber: string,
  LandlineNo: string,
  LicenseNo: string
  PrimaryEmail: string,
  SecondaryEmail: string
};
export type RootStackParamList = {
  ManageByAgent: { user: UserData };
  AddManageAgent: undefined;
};

LogBox.ignoreAllLogs()
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Registation" component={Registation} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Deshbord" component={Deshbord} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;