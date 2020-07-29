const graphql = require('graphql');
const _ = require('lodash');

// connect models where monggo database exist
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


// dummy datas
// var books = [{
//     name: 'name of the wind',
//     genre: 'Fantasy',
//     id: '1',
//     authorId: '1'
// }, {
//     name: 'name of the wind 2',
//     genre: 'Fantasy',
//     id: '2',
//     authorId: '2'
// }, {
//     name: 'name of the wind 3',
//     genre: 'Drama',
//     id: '3',
//     authorId: '3'
// }, {
//     name: 'Legend of Zelda by Patrick',
//     genre: 'Cartoon',
//     id: '4',
//     authorId: '1'
// }, {
//     name: 'Harry Potter by Spongebob',
//     genre: 'Cartoon',
//     id: '4',
//     authorId: '2'
// }];
// var authors = [{
//     name: 'Patrick',
//     age: 44,
//     id: '1'
// }, {
//     name: 'Spongebob 2',
//     age: 442,
//     id: '2'
// }, {
//     name: 'Mr. Crab 3',
//     age: 443,
//     id: '3'
// }]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // parent === key variable in Book itself
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({
                    authorId: parent.id
                });
            }
        }
    })
});

/////////////////////////////////////////////////////////////

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

                return book.save();
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});