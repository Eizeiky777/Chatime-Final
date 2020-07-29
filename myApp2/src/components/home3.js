import React, { Component } from 'react';
//import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements'

// query apollo 
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getDrinksQuery, getLiquidsQuery, getToppingsQuery, deleteDrinkMutation } from '../queries/queries';

// query css
import './home.css';


class Home3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            liquidId: '', liquidName: '',
            toppingId: '', toppingName: '',
            options: '',
            drinkName: ''
        }
    }

    deleteDrinks(e) {

        this.props.deleteDrinkMutation({
            variables: {
                id: e,
            },
            refetchQueries: [{ query: getDrinksQuery }]
        })
    }
    displayLiquid() {
        var data = this.props.getLiquidsQuery;
        if (data.loading) {
            return (
                <li>Loading Liquid</li>
            )
        } else {
            return data.liquids.map((liquid, index) => {
                return (
                    <li key={index}
                        onClick={(e) => { this.setState({ liquidId: liquid.id, liquidName: liquid.name }) }}
                    >
                        {liquid.name}
                    </li>
                )
            })
        }
    }
    displayTopping() {
        var data = this.props.getToppingsQuery;
        if (data.loading) {
            return (
                <li>Loading Topping</li>
            )
        } else {
            return data.toppings.map((topping, index) => {
                return (
                    <li key={index}
                        onClick={(e) => { this.setState({ toppingId: topping.id, toppingName: topping.name }) }}
                    >
                        {topping.name}
                    </li>
                )
            })
        }
    }
    displayDrinks() {
        var data = this.props.getDrinksQuery;
        if (data.loading) {
            return (
                <li>Loading Topping</li>
            )
        } else {
            return data.drinks.map((drink, index) => {
                return (
                    <li style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }} key={index} onClick={(e) => { this.setState({ drinkName: drink.name }) }}>
                        {drink.name}
                        <Icon
                            name='window-close'
                            type='font-awesome'
                            color='#f50'
                            containerStyle={{ marginLeft: 20, marginTop: 5 }}
                            onPress={() => this.deleteDrinks(drink.id)}
                        />
                    </li>
                )
            })
        }
    }

    render() {

        return (
            <div className="Home-container">

                <div id="List-Drink">DELETE DRINK</div>
                <div id="List-Bahan">
                    <div>
                        <span style={{ fontSize: 22 }}>List Drinks </span>
                        <ul className="listAll">
                            {this.displayDrinks()}
                        </ul>
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
    graphql(deleteDrinkMutation, { name: "deleteDrinkMutation" }),
)(Home3);
