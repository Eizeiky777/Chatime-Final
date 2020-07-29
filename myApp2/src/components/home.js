import React, { Component } from 'react';
import { ListItem, SearchBar } from 'react-native-elements';

// query apollo 
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getDrinksQuery, loginQuery } from '../queries/queries';

// query css
import './home.css';


class Home extends Component {

    state = {
        search: '',
        sort: [],
        show: true
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    result = (e) => {
        e.preventDefault();

        if (e.key === 'Enter') {
            var x = this.state.search;
            this.setState({ show: !this.state.show });
            let res = this.props.getDrinksQuery

            if (res.loading) {
                return (
                    <div>Loading menu</div>
                )
            } else {
                var data_filter = res.drinks.filter(element => element.liquid.name === x)

                // console.log(data_filter)
                this.setState({ sort: data_filter })
            }
        }
    };

    displayDrinks() {
        var data = this.props.getDrinksQuery;
        if (data.loading) {
            return (
                <div>Loading menu</div>
            )
        } else {
            return data.drinks.map((l, i) => (
                <ListItem
                    key={i}
                    title={l.name}
                    subtitle={l.liquid.name}
                    bottomDivider
                />
            ))
        }
    }

    displaySortDrinks(e) {
        return e.map((l, i) => (
            <ListItem
                key={i}
                title={l.name}
                subtitle={l.liquid.name}
                bottomDivider
            />
        ))
    }

    changeURL = (e) => {

        window.history.replaceState(null, "New Page Title", `/${e}`)
        window.location.reload(false);
    }


    render() {
        console.log(this.props.mail)
        console.log(this.props.loginQuery)
        return (
            <div className="Home-container">
                <div>
                    <div id="List-Drink">LIST DRINK</div>
                    <div id="Crud-Drink">
                        <span onClick={() => { this.changeURL("add") }}   >ADD DRINK</span>
                        <span onClick={() => { this.changeURL("delete") }}>DELETE DRINK</span>
                        <span onClick={() => { this.changeURL("update") }}>UPDATE DRINK</span>
                        <span onClick={() => { this.changeURL("setting") }}>SETTING</span>
                    </div>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        onKeyPress={this.result.bind(this)}
                        value={this.state.search}
                        containerStyle={{ backgroundColor: `${this.props.theme}` }}
                        inputContainerStyle={{ backgroundColor: "#eee" }}
                        inputStyle={{ color: "black" }}
                    />
                </div>

                {this.state.show ? this.displayDrinks() : this.displaySortDrinks(this.state.sort)}
            </div>
        );
    }
}


export default compose(
    graphql(getDrinksQuery, { name: "getDrinksQuery" }),
    graphql(loginQuery, {
        name: "loginQuery", options: (props) => {
            return {
                variables: {
                    email: props.mail,
                    password: props.password
                }
            }
        }
    })
)(Home);

