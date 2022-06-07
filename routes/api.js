const router = require('express').Router()
const BookModel = require('../model/book_model')

router.get('/books', async function (req, res){
    const bookList = await BookModel.find();
    console.log(bookList);
    res.send(bookList);
})

router.get('/books/:id', async function (req, res){
    const {id} = req.params;
    const book = await BookModel.findOne({isbn : id});
    if(!book) return res.send("Book Not Found");
    res.send(book);
})

router.post('/books', async function(req, res) {
    const title = req.body.title;
    const isbn = req.body.isbn;
    const price = req.body.price;
    const author = req.body.author;
    const bookExist = await BookModel.findOne({isbn: isbn});

    if (bookExist) return res.send('Book already exist');

    let data = await BookModel.create({title, isbn, price, author});
    data.save();

    res.send("Book Uploaded");
})

router.put('/books/:id', async function (req, res){
    const {id} = req.params;
    const {
        title,
        price,
        author, 
    } = req.body;

    const bookExist = await BookModel.findOne({isbn : id});
    if(!bookExist) return res.send('Book Do Not Exist');

    const updateField = (val, prev) => !val ? prev : val;

    const updatBook = {
        ...bookExist,
        title: updateField(title, bookExist.title),
        price: updateField(price, bookExist.price),
        author: updateField(author, bookExist.author)
    };

    await BookModel.updateOne({isbn: id}, {$set : {title: updatBook.title, price : updatBook.price, author: updatBook.author}})
    res.status(200).send("Book Updated");
})  

router.delete('/books/:id', async function(req, res){
    const {id} = req.params;

    const bookExist = await BookModel.findOne({isbn: id});
    if(!bookExist) return res.send("Book Do Not Exist");

    await BookModel.deleteOne({isbn:id}).then(function(){
        console.log("Data deleted");
        res.send("Book Record Deleted Successfully")
    }).catch(function(error){
        console.log(error)
    });
});

module.exports = router