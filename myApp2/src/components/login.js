import React, { Component } from 'react';
//import { ListItem } from 'react-native-elements';

// query apollo 
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getDrinksQuery, getLiquidsQuery, getToppingsQuery } from '../queries/queries';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            password: ''
        }
    }

    submitForm() {
        // console.log(this.state.mail)
        this.props.setLogin(this.state.mail, this.state.password)

    }

    render() {
        return (
            <div>
                <h1>LOGIN</h1>

                <Input
                    placeholder='input your mail'
                    leftIcon={
                        <Icon
                            name='envelope'
                            size={24}
                            color='black'
                        />
                    }
                    onChange={(e) => this.setState({ mail: e.target.value })}
                />

                <Input
                    placeholder='input your password'
                    leftIcon={
                        <Icon
                            name='key'
                            size={24}
                            color='black'
                        />
                    }
                    onChange={(e) => this.setState({ password: e.target.value })}
                />
                <Button
                    title="LOGIN"
                    onPress={() => this.submitForm()}
                />
            </div>
        )
    }
}

export default compose(
    graphql(getDrinksQuery, { name: "getDrinksQuery" }),
    graphql(getLiquidsQuery, { name: "getLiquidsQuery" }),
    graphql(getToppingsQuery, { name: "getToppingsQuery" }),
)(Login);
