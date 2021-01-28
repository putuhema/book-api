const router = require("express").Router();

const bookController = require("../controller/book");

router.post("/book", bookController.postBook);
router.get("/books", bookController.getBooks);
router.get("/book/:id", bookController.getOneBook);
router.put("/book/:id", bookController.updateBook);
router.delete("/book/:id", bookController.deleteBook);

module.exports = router;
