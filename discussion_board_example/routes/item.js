const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Item = require("../models/Item");

const validateItemInput = require("../validation/item");

// @route   GET item/test
// @desc    Tests route
// @access  Public
router.get("/test", (req, res) => {
  res.json({
    message: "Item"
  });
});

// @route   GET item/all
// @desc    Get all items
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Item.find({}, '-email -username')
    .then(items => {
      if (!items) {
        errors.noItems = "There are no items";
        res.status(404).json(errors);
      }

      res.json(items);
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   GET item/username
// @desc    Get all items from one username
// @access  Public
router.get("/username", (req, res) => {
  const errors = {};
  Item.find({ username: req.body.username })
    .then(items => {
      if (!items) {
        errors.noItems = "There are no items";
        res.status(404).json(errors);
      }
      res.json(items);
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   POST item/createItem
// @desc    Create an Item
// @access  Public
router.post("/createItem", (req, res) => {
  const { errors, isValid } = validateItemInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newItem = new Item({
    username: req.body.username,
    content: req.body.content,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newItem.email, salt, (err, hash) => {
      if (err) throw err;
      newItem.email = hash;
      newItem.save().then(item => res.json(item))
        .catch(err => console.log(err));
    });

  });
});

// @route   PUT item/updateItem
// @desc    Update first Item
// @access  Public
router.put("/updateItem", (req, res) => {

  const newItem = new Item({
    username: req.body.username,
    content: req.body.content
  });

  Item.findById(req.body._id)
    .then(item => {
      if (!item) {
        errors.noItem = "There are no items with this ID";
        res.status(404).json(errors);
      }

      //desctructure changhe it up

      // items
      //   .remove()
      //   .then(() => {
      //     res.json({ success: true });
      //   })
      //   .catch(err =>
      //     res.status(404).json({ itemnotfound: "No item found" })
      //   );

      item.save().then(item => res.json(item))
        .catch(err => console.log(err));

    })
    .catch(err => res.status(404).json({ noItem: "There are is no item with this ID" }));

});

// @route   DELETE item/deleteItem
// @desc    Delete first Item
// @access  Public
router.delete("/deleteItem", (req, res) => {

  let errors = {};

  const email = req.body.email;
  const id = req.body._id;

  Item.findById(id).then(item => {

    bcrypt.compare(email, item.email).then(isMatch => {
      if (isMatch) {

        item
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch(err =>
            res.status(404).json({ itemnotfound: "No item found" })
          );

      } else {
        errors.email = "Email Incorrect";
        return res.status(400).json(errors);
      }
    });

  }).catch(err => res.status(404).json({ noItem: "There is no item with this ID" }));

});

module.exports = router;
