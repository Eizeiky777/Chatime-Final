import { gql } from 'apollo-boost';

// login auth
const loginQuery = gql`
    query($email: String, $password: String ){
        login(email: $email, password: $password){
            id
            email
        }
    }
`

// get all drinks menu
const getDrinksQuery = gql`
    {
        drinks{
            id
            name
            liquid{
                id
                name
            }
            topping{
                id
                name
            }
            options
        }
    }
`

// add new drink
const addDrinkMutation = gql`
    mutation($name: String!, $liquidId: ID!, $toppingId: ID!, $options: TaskStateEnum!){
        addDrink(name: $name, liquidId: $liquidId, toppingId: $toppingId, options: $options){
            name
            liquid{
                id
                name
            }
            topping{
                id
                name
            }
            options
        }
    }
`

// delete drink
const deleteDrinkMutation = gql`
    mutation($id: ID!){
        deleteDrink(id: $id){
            id
            name
            liquid{
                id
                name
            }
            topping{
                id
                name
            }
            options
        }
    }
`


// get all liquid
const getLiquidsQuery = gql`
    {
        liquids{
            id
            name
        }
    }
`

// get all topping
const getToppingsQuery = gql`
    {
        toppings{
            id
            name
        }
    }
`



export {
    getDrinksQuery, getLiquidsQuery, getToppingsQuery, addDrinkMutation,
    deleteDrinkMutation, loginQuery
};