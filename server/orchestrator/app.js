import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios'


const APP_SERVICE_URL = "http://localhost:4002";
const USER_SERVICE_URL = "http://localhost:4001/users";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];


const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type User {
    _id:ID
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Movie {
    id:ID
    title: String
    slug: String
    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: Int
    genreId: Int
    authorId: Int
  }

  type Query {
    books: [Book]
    users: [User]
    movies: [Movie]
  }
`

const resolvers = {
    Query: {
        books: () => books,
        users: async () => {
            try {
                const { data } = await axios.get(USER_SERVICE_URL)
                return data
            } catch (error) {
                console.log(error);
            }
        },
        movies: async () => {
            try {
                console.log("MOVIES<<<<<<");
                const { data } = await axios.get(APP_SERVICE_URL + '/customer/movies')
                return data
            } catch (error) {
                console.log(error);
            }
        }
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
})
    .then(({ url }) => {
        console.log(`🚀  Server ready at: ${url}`)
    })
    .catch((err) => {
        console.log(err);
    })