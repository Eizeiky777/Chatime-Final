// import { createDrawerNavigator, createAppContainer } from 'react-navigation'

import React, { Component } from 'react';
import { Overlay, Text } from 'react-native-elements';

// components 
// import Home from '../components/home';
// import Home2 from '../components/home2';

class Navigator extends Component {


    render() {

        let { modalVisible } = this.props;

        return (
            <Overlay
                isVisible={modalVisible}
                onBackdropPress={() => this.setState({ isVisible: false })}
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                overlayBackgroundColor="red"
                width="auto"
                height="auto"
            >
                <Text>Hello from Overlay!</Text>
            </Overlay>
        )
    }
}

export default Navigator;
