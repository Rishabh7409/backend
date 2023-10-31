const db = require("../models");
const Book = db.books;

exports.create = async (req, res) => {
  const { title, author, summary } = req.body;
  let obj = { title, author, summary };
  try {
    const result = await Book.findOne({ where: { title: title } });
    if (result) {
      return res
        .status(200)
        .json({ status: 0, message: "book already exits" });
    }
    const data = await Book.create(obj);
    return res.status(200).json({
      status: 1,
      message: "Created",
      data: {
        book: data,
      },
    });
  } catch (error) {
    return res.send(error);
  }
};


exports.getBookById = async (req, res) => {
    const id=req.params.id
  try {
    const result = await Book.findOne({ where: { id: id } });
    if (!result) {
      return res
        .status(200)
        .json({ status: 1, data: null, message: "book not exits" });
    }

    return res.status(200).json({
      status: 1,
      data: result,
    });
  } catch (error) {
    return res.send(error);
  }
};

exports.allData = async (req, res,) => {
  try {
    const result = await Book.findAll({ where: { deleted:0 } });
    if (!result) {
      return res
        .status(200)
        .json({ status: 1, data: null, message: "Book not exits" });
    }
    return res.status(200).json({
      status: 1,
      data: result,
    });
  } catch (error) {
    return res.send(error);
  }
};


exports.updateBookById = async (req, res) => {
    const id=req.params.id
    const { title, author, summary } = req.body;
    let obj = { title, author, summary };
    console.log('====================================');
    console.log(obj);
    console.log('====================================');
    try {
    const result = await Book.findOne({ where: { id: id,deleted:0 } });
    if (!result) {
      return res
        .status(200)
        .json({ status: 1, data: null, message: "book not exits" });
    }
    let rest=await result.update(obj);
    return res.status(200).json({      status: 1,
      data: rest,
      status:1,
      message:"updated success"
    });
  } catch (error) {
    return res.send(error);
  }
};

exports.deleteBookById = async (req, res) => {
    const id=req.params.id
  try {
    const result = await Book.findOne({ where: { id: id } });
    if (!result) {
      return res
        .status(200)
        .json({ status: 1, data: null, message: "book not exits" });
    }
   let res=await result.update({ deleted: 1 });
   return res.status(200).json({
      status: 1,
      data: res,
      message:"deleted success"
    });
  } catch (error) {
    return res.send(error);
  }
};