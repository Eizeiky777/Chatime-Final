const express = require('express');
const {
    graphqlHTTP
} = require('express-graphql');
const schema = require('./schema/schema');
const schemaChatime = require('./schema/schemaChatime');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross origin request
app.use(cors());

// connect to mongoose DataBase
mongoose.connect('mongodb+srv://ekky:matahari888@testgraphql1.xpcam.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useFindAndModify', false);
mongoose.connection.once('open', () => {
    console.log('connected to mongoose databases...');
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use('/graphqlChatime', graphqlHTTP({
    schema: schemaChatime,
    graphiql: true
}));


app.listen(4000, () => {
    console.log('listening host 4000');
});