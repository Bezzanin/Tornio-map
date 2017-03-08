import Exponent, { Asset, Components } from 'exponent';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import DrawerNavigationExample from './components/DrawerNavigationExample';
import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';
import MapScreen from './components/MapScreen';

import {
  createRouter,
  NavigationProvider,
} from '@exponent/ex-navigation';

const assets = [
  require('./assets/beetle.jpg'),
  require('./assets/cat.gif'),
  require('./assets/colorful-windows.jpg'),
  require('./assets/paintbrush.jpg'),
  require('./assets/space.jpg'),
  require('./assets/sparkles.jpg'),
  require('./assets/torniologo.png'),
  require('./assets/torniohaparanda.png'),
  require('./assets/Tower.jpg')
];

/**
  * This is where we map route names to route components. Any React
  * component can be a route, it only needs to have a static `route`
  * property defined on it, as in HomeScreen below
  */
export const Router = createRouter(() => ({
  home: () => HomeScreen,
  about: () => AboutScreen,
  map: () => MapScreen,
  
}));

class App extends Component {

  state = {
    bootstrapped: false,
  };

  componentDidMount() {
    this._bootstrap();
  }

  _bootstrap = async () => {
    const promises = assets.map(module => Asset.fromModule(module).downloadAsync());
    await Promise.all(promises);
    this.setState({
      bootstrapped: true,
    });
  };

  render() {
    if (!this.state.bootstrapped) {
      return <Components.AppLoading />;
    }

    
    return (
      <NavigationProvider router={Router}>
        <StatusBar barStyle="light-content" />
        <DrawerNavigationExample />
      </NavigationProvider>
    );
  }
}

Exponent.registerRootComponent(App);