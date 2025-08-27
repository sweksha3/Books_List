const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Book = require('./models/Books')
const PORT = 5001
const cors = require('cors')
// cors is used to connect backend and frontend as frontend is running on localhost:5173 and backend is running on localhost:5001

// middleware
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/newBook")
    .then(() => console.log("Db connected"))
    .catch((err) => console.error(err))

app.get("/", (req, res) => {
    res.send("I like books")
})

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find()
        return res.status(201).json(books)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch books" })
    }
})

app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) return res.status(404).json({ message: "book not found" })
        res.json(book)
        console.log("The book id is", req.params.id)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch book" })
    }

})

app.post("/books", async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const newBook = new Book({ title, author, year })
        await newBook.save()
        res.json(newBook)
    } catch (error) {
        res.status(500).json({ message: "Failed to add book" })
    }

})

app.put("/books/:id", async (req, res) => {
    const { title, author, year } = req.body
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, { title, author, year },
            { new: true }
        )
        if (!updatedBook) return res.status(404).json({ message: "Book not found" })
        res.json(updatedBook)
    } catch (error) {
        res.status(500).json({ message: "Failed to update book" })
    }
})

app.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: "Book not found" })
        res.json({ message: "Book deleted" })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete book" })
    }
})


app.listen(PORT, function () {
    console.log(`App is running on ${PORT}`)
})