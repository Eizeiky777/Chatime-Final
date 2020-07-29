const graphql = require('graphql');
const _ = require('lodash');

// connect models where monggo database exist
const User = require('../models/user');
const Liquid = require('../models/liquid');
const Topping = require('../models/topping');
const Drink = require('../models/drink');

// enum
const chatimeEnum = require('./enum');

// graphql menus
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;



const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    })
});

const LiquidType = new GraphQLObjectType({
    name: 'Liquid',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        }
    })
});

const ToppingType = new GraphQLObjectType({
    name: 'Topping',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        }
    })
});

// DRINK the main dish kwwkk
////////////////////////////////////////////////////////////

const DrinkType = new GraphQLObjectType({
    name: 'Drink',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        liquid: {
            type: LiquidType,
            resolve(parent, args) {

                return Liquid.findById(parent.liquidId);
            }
        },
        topping: {
            type: ToppingType,
            resolve(parent, args) {

                return Topping.findById(parent.toppingId);
            }
        },
        options: {
            type: chatimeEnum
        }
    })
});

/////////////////////////////////////////////////////////////

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: UserType,
            args: {
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return User.findOne({
                    $or: [
                        { email: args.email },
                        { password: args.password }
                    ]
                }
                );
            }
        },
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({})
            }
        },
        liquid: {
            type: LiquidType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Liquid.findById(args.id);
            }
        },
        liquids: {
            type: new GraphQLList(LiquidType),
            resolve(parent, args) {
                return Liquid.find({})
            }
        },
        topping: {
            type: ToppingType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Topping.findById(args.id);
            }
        },
        toppings: {
            type: new GraphQLList(ToppingType),
            resolve(parent, args) {
                return Topping.find({})
            }
        },
        drink: {
            type: DrinkType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Drink.findById(args.id);
            }
        },
        drinkByLiquids: {
            type: new GraphQLList(DrinkType),
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Drink.find({ liquidId: args.id })
            }
        },
        drinks: {
            type: new GraphQLList(DrinkType),
            resolve(parent, args) {
                return Drink.find({})
            }
        },
    }
});


// Mutation 
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let user = new User({
                    email: args.email,
                    password: args.password
                });
                return user.save();
            }
        },
        addLiquid: {
            type: LiquidType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let liquid = new Liquid({
                    name: args.name
                });
                return liquid.save();
            }
        },
        addTopping: {
            type: ToppingType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let topping = new Topping({
                    name: args.name
                });
                return topping.save();
            }
        },
        addDrink: {
            type: DrinkType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                liquidId: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                toppingId: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                options: {
                    type: new GraphQLNonNull(chatimeEnum)
                }
            },
            resolve(parent, args) {
                //console.log(args)
                let drink = new Drink({
                    name: args.name,
                    liquidId: args.liquidId,
                    toppingId: args.toppingId,
                    options: args.options
                });
                return drink.save();
            }
        },
        deleteDrink: {
            type: DrinkType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Drink.findOneAndDelete({ _id: args.id });
            }
        },
        updateDrink: {
            type: DrinkType,
            args: {
                id: {
                    type: GraphQLID
                },
                name: {
                    type: GraphQLString
                },
                liquidId: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                toppingId: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                options: {
                    type: new GraphQLNonNull(chatimeEnum)
                }
            },
            resolve(parent, args) {

                return Drink.findOneAndUpdate({ _id: args.id }, {
                    name: args.name,
                    liquidId: args.liquidId,
                    toppingId: args.toppingId,
                    options: args.options
                });
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
