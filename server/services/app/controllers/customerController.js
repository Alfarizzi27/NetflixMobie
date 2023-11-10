const { User, Movie, Genre, Casts, sequelize } = require('../models')
const { createToken, verifyToken } = require('../helpers/jwt')
const bcrypt = require('bcryptjs')

class CustomerController {
    static async fetchMovie(req, res, next) {
        try {
            const movies = await Movie.findAll()
            res.status(200).json(movies)
        } catch (error) {
            next(error)
        }
    }

    static async detailMovie(req, res, next) {
        try {
            const id = req.params.id
            const detailMovie = await Movie.findOne({
                where: { id }, include: [
                    {
                        model: Casts
                    }
                ]
            })

            if (!detailMovie) {
                throw { name: "Movie not found" }
            }

            res.status(200).json(detailMovie)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async fetchGenre(req, res, next) {
        try {
            const genre = await Genre.findAll()

            res.status(200).json(genre)
        } catch (error) {
            next(error)
        }
    }

    static async createMovie(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { title, synopsis, trailerUrl, rating, genreId, imgUrl, cast } = req.body

            const authorId = req.user.id


            const movies = await Movie.create({ title, synopsis, trailerUrl, rating, genreId, authorId, imgUrl }, { transaction: t })

            // let datasCast = cast.map(el => {
            //     return JSON.parse(el)
            // })

            let datasCast = cast.map(el => {
                el.movieId = movies.id
                el.createdAt = el.updatedAt = new Date()
                return el
            })

            const createCast = await Casts.bulkCreate(datasCast, { transaction: t })

            await t.commit()
            res.status(201).json({ movies, createCast })
        } catch (error) {
            console.log(error);
            await t.rollback()
            next(error)
        }
    }

    static async createGenre(req, res, next) {
        try {
            const name = req.body.name
            const genres = await Genre.create({ name })
            res.status(201).json(genres)
        } catch (error) {
            next(error)
        }
    }

    static async updateMovie(req, res, next) {
        try {
            const id = +req.params.id
            const { title, synopsis, trailerUrl, rating, genreId, imgUrl } = req.body
            const authorId = req.user.id
            const datas = await Movie.update({ title, synopsis, trailerUrl, rating, genreId, authorId, imgUrl },
                {
                    where: { id },
                    // individualHooks: true,
                })
            res.status(200).json("Berhasil Update")
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteMovie(req, res, next) {
        const id = req.params.id
        try {
            const datas = await Movie.destroy({ where: { id } })
            res.status(200).json({ datas })
        } catch (error) {
            next(error)
        }
    }

    static async deleteGenres(req, res, next) {
        const id = req.params.id
        try {
            const datas = await Genre.destroy({ where: { id } })
            res.status(200).json({ datas })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = CustomerController