/* import { createServer } from 'node:http'

const server = createServer((req, res) => {
    res.write('Hello World')
    
    return res.end()
})

server.listen(3333)

 POST localhost:3333/videos
 DELETE localhost:3333/videos/1 */

 import { fastify } from "fastify"
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from "./database-postgres.js"

 const server = fastify()
// GET, POST, PUT, DELETE, PATCH, 
// POST http://localhost:3333/videos
// const database = new DatabaseMemory()
 const database = new DatabasePostgres()       

 server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body
    
    await database.create({
        title,
        description,
        duration,
    })
    return reply.status(201).send() 
 })
 
 // GET http:localhost:3333/videos
 server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)

    return videos
 })

// Route Parameter
// PUT/DELETE http:localhost:3333/videos/id

 server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body
    
    await database.update(videoId, {
        title,
        description,
        duration,                
    })

    return reply.status(204).send()
 })

 server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
   
    await database.delete(videoId)

    return reply.status(204).send()
 })
 
 server.listen({
   host: '0.0.0.0',
   port: process.env.PORT ?? 3333,
 })
