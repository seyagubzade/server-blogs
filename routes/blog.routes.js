const express = require('express')
const { v4: uuidv4 } = require('uuid');
const Blog = require("../models/blog.model")

const blogs = [
    {
        id: uuidv4(),
        title: "Global Warming",
        description: "lorem ipsum",
        createdAt: "12.1.12",
        modifiedAt: "12.1.15",
        author: {
            name: "Jane",
            surname: "Lorem"
        }
    },
    {
        id: uuidv4(),
        title: "War is over",
        description: "lorem ipsum",
        createdAt: "12.1.12",
        modifiedAt: "12.1.15",
        author: {
            name: "Chris",
            surname: "Green"
        }
    },
]

const router = express.Router()

// getAll
router.get('/', (request, response) => {
    response.status(200).send(blogs)
})

// getById
router.get('/:id', (request, response) => {
    const { id } = request.params
    const target = blogs.find((blog) => blog.id == id)
    if (target) {
        response.status(200).send(target)
    }
    else {
        response.status(404).send('Not Found')
    }

})

// addNew
router.post('/', (request, response) => {
    const { title, description, createdAt, modifiedAt, author } = request.body;
    const { name, surname } = author;
    const createdTimeAndDate = new Date().toString().slice(4, 21)
    const newBlog = new Blog(uuidv4(), title, description, createdTimeAndDate, createdTimeAndDate, { name, surname });

    blogs.push(newBlog);
    response.status(201).send(newBlog)
})

// deleteById
router.delete('/:id', (request, response) => {
    const { id } = request.params;
    const target = blogs.find((blog) => blog.id == id)
    if (target) {
        const indexOfTarget = blogs.indexOf(target);
        blogs.splice(indexOfTarget, 1)
        response.status(203).send(`Blog deleted, id: ${id}`)
    } else {
        response.status(404).send("Not Found")
    }
})


// updateById
router.put('/:id', (request, response) => {
    const { id } = request.params;
    let target = blogs.find((blog)=>blog.id == id);
    const modifiedTimeAndDate = new Date().toString().slice(4, 21)
    if(target){
        const indexOfTarget = blogs.indexOf(target)
        target = { ...target, ...request.body, modifiedAt: modifiedTimeAndDate }
        blogs[indexOfTarget] = target
        response.status(200).send(blogs)
    }else{
        response.status(404).send("Not Found")
    }
})

module.exports = router