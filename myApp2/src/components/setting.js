import React, { Component } from 'react';
//import { ListItem } from 'react-native-elements';

// query apollo 
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getDrinksQuery, getLiquidsQuery, getToppingsQuery, addDrinkMutation } from '../queries/queries';

// query css
import './home.css';


class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: '#b768a2'
        }
    }

    submitForm(e) {
        e.preventDefault();
        //console.log(this.state.color)
        localStorage.setItem("theme", this.state.color);
        this.props.set(this.state.color);

    }

    render() {

        return (
            <div className="Home-container">
                <div id="List-Drink">SETTING</div>
                <div id="List-Bahan">
                    <div>
                        <form onSubmit={this.submitForm.bind(this)} style={{ display: 'flex', justifyContent: "space-between", padding: 20 }}>
                            <div className="field" style={{ paddingRight: 20 }}>
                                <label style={{ paddingRight: 20 }}>Input your favorite color</label>
                                <input
                                    type="text"
                                    onChange={(e) => this.setState({ color: e.target.value })}
                                    value={this.state.color}
                                />
                            </div>
                            <button>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default compose(
    graphql(getDrinksQuery, { name: "getDrinksQuery" }),
    graphql(getLiquidsQuery, { name: "getLiquidsQuery" }),
    graphql(getToppingsQuery, { name: "getToppingsQuery" }),
    graphql(addDrinkMutation, { name: "addDrinkMutation" }),
)(Setting);
