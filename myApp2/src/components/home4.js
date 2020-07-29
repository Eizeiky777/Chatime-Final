import React, { Component } from 'react';
//import { ListItem } from 'react-native-elements';

// query apollo 
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getDrinksQuery, getLiquidsQuery, getToppingsQuery, addDrinkMutation } from '../queries/queries';

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
                    <li key={index} onClick={(e) => { this.setState({ drinkName: drink.name }) }}>{drink.name}</li>
                )
            })
        }
    }

    submitForm(e) {
        e.preventDefault();
        //console.log(this.state);

        this.props.addDrinkMutation({
            variables: {
                name: this.state.drinkName,
                liquidId: this.state.liquidId,
                toppingId: this.state.toppingId,
                options: this.state.options
            },
            refetchQueries: [{ query: getDrinksQuery }, { query: getLiquidsQuery }, { query: getToppingsQuery }]
        })
    }



    render() {

        return (
            <div className="Home-container">
                <div id="List-Drink">UPDATE DRINK</div>
                <div id="List-Bahan">
                    <div>
                        <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                            <div className="field">
                                <label>Name</label>
                                <input type="text" onChange={(e) => this.setState({ drinkName: e.target.value })}
                                    value={this.state.drinkName}
                                />
                            </div>
                            <div className="field">
                                <label>Liquid</label>
                                <input type="text" onChange={(e) => this.setState({ liquidId: e.target.value })}
                                    value={this.state.liquidName}
                                />
                            </div>
                            <div className="field">
                                <label>Topping</label>
                                <input type="text" onChange={(e) => this.setState({ toppingId: e.target.value })}
                                    value={this.state.toppingName}
                                />
                            </div>
                            <div className="field">
                                <label>Options</label>
                                <select onChange={(e) => this.setState({ options: e.target.value })}>
                                    <option>Select options</option>
                                    <option value="ICE">ICE</option>
                                    <option value="LESS_ICE">LESS_ICE</option>
                                    <option value="NO_ICE">NO_ICE</option>
                                    <option value="SUGAR">SUGAR</option>
                                </select>
                            </div>
                            <button>Add</button>
                        </form>
                    </div>
                    <div>
                        <span style={{ fontSize: 12 }}>Liquids Ready </span>
                        <ul className="listAll">
                            {this.displayLiquid()}
                        </ul>
                    </div>
                    <div>
                        <span style={{ fontSize: 12 }}>Toppings Ready </span>
                        <ul className="listAll">
                            {this.displayTopping()}
                        </ul>
                    </div>
                    <div>
                        <span style={{ fontSize: 12 }}>Drinks Ready </span>
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
    graphql(addDrinkMutation, { name: "addDrinkMutation" }),
)(Home3);
