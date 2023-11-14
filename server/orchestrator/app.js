const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const axios = require('axios')
const redis = require('./config/redisConfig')


const APP_SERVICE_URL = "http://localhost:4002";
const USER_SERVICE_URL = "http://localhost:4001/users";

const typeDefs = `#graphql

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
    createdAt: String
    updatedAt: String
  }

  type CastMovie {
    id: ID
    name: String
    profilePict: String
    movieId: Int
    createdAt: String
    updatedAt: String
  }

  type Genre {
    id: Int,
    name: String,
    createdAt: String,
    updatedAt: String
  }

  type DetailMovies {
    id:ID
    title: String
    slug: String
    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: Int
    genreId: Int
    authorId: String
    createdAt: String
    updatedAt: String
    Casts: [CastMovie]
    User: User
    Genre: Genre
  }

  type Query {
    users: [User]
    movies: [Movie]
    detailMovies(id:ID!): DetailMovies
    findUser(_id:ID!):User
  }

  type SuccessMessage {
    message: String
  }

  input Cast {
    name: String
    profilePict: String
  }

  type Mutation {
    createUser(    
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
    ) : SuccessMessage
    deleteUser(_id:String): SuccessMessage
    deleteMovie(id:String): SuccessMessage
    createMovie(
    title: String
    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: Int
    genreId: Int
    authorId: String
    cast: [Cast]
    ): SuccessMessage
    updateMovie(
    id: Int
    title: String
    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: Int
    genreId: Int
    authorId: String
    ): SuccessMessage
  }

`

const resolvers = {
    Query: {
        users: async () => {
            try {
                const cache = await redis.get("users")
                if (cache) {
                    console.log("ada cache");
                    const data = JSON.parse(cache)
                    return data
                } else {
                    console.log("ga ada cache");
                    const { data } = await axios.get(USER_SERVICE_URL)
                    const values = JSON.stringify(data)
                    await redis.set("users", values)
                    return data
                }
            } catch (error) {
                console.log(error);
            }
        },
        movies: async () => {
            try {
                const cache = await redis.get("movies")
                if (cache) {
                    console.log("ada cache");
                    const data = JSON.parse(cache)
                    return data
                } else {
                    console.log("ga ada cache");
                    const { data } = await axios.get(APP_SERVICE_URL + "/user/movies")
                    const values = JSON.stringify(data)
                    await redis.set("movies", values)
                    return data
                }
            } catch (error) {
                console.log(error);
            }
        },
        detailMovies: async (_, args) => {
            try {
                const id = args.id
                const { data } = await axios.get(APP_SERVICE_URL + "/user/movies/" + id)
                const author = await axios.get(USER_SERVICE_URL + "/" + data.authorId)
                data.User = author.data
                return data
            } catch (error) {
                console.log(error);
            }
        },
        findUser: async (_, args) => {
            try {
                const { _id } = args
                const { data } = await axios.get(USER_SERVICE_URL + "/" + _id)
                return data
            } catch (error) {
                console.log(error);
                throw (error)
            }
        },
    },
    Mutation: {
        createUser: async (_, args) => {
            try {
                const { username, email, password, role, phoneNumber, address } = args
                const { data } = await axios.post(USER_SERVICE_URL, {
                    username, email, password, role, phoneNumber, address
                })
                await redis.del("users");
                return { message: "Success Add New User" }
            } catch (error) {
                console.log(error);
            }
        },
        deleteUser: async (_, args) => {
            try {
                const { _id } = args
                const { data } = await axios.delete(USER_SERVICE_URL + "/" + _id);
                if (data.deletedCount === 1) {
                    await redis.del("users");
                    return { message: "Success Delete Users" }
                } else {
                    throw { message: "Failed Delete Users" }
                }
            } catch (error) {
                throw (error)
            }
        },
        deleteMovie: async (_, args) => {
            try {
                let { id } = args
                id = +id
                const { data } = await axios.delete(APP_SERVICE_URL + "/user/movies/" + id);
                if (data.datas === 1) {
                    await redis.del("movies");
                    return { message: "Success Delete Movies" }
                } else {
                    throw { message: "Failed Delete Movies" }
                }
            } catch (error) {
                throw (error)
            }
        },
        createMovie: async (_, args) => {
            try {
                const { title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, cast } = args
                const { data } = await axios.get(USER_SERVICE_URL + "/" + authorId)
                if (!data) throw { message: "author not found" }

                await axios.post(APP_SERVICE_URL + "/user/movies/", {
                    title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, cast
                });

                await redis.del("movies");
                return { message: "Success Add Movies" }
            } catch (error) {
                console.log(error);
                throw (error)
            }
        },
        updateMovie: async (_, args) => {
            try {
                const { id, title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId } = args
                const { data } = await axios.get(USER_SERVICE_URL + "/" + authorId)
                if (!data) throw { message: "author not found" }

                await axios.put(APP_SERVICE_URL + "/user/movies/" + id, {
                    title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId
                });

                await redis.del("movies");
                return { message: "Success Update Movies" }
            } catch (error) {
                console.log(error);
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
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