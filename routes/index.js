var express = require('express');
var router = express.Router();

let list = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My todos' });
});


router.post("/todo", function (req, res) {

    let index = 0;
    index = list.findIndex(x => x.name === req.body.name);

    console.log(index);
    if (index === -1) {
        list.push(req.body);
        res.send("User added");
    } else {
        list[index].todos.push(req.body.todos[0])
        res.send("Todo added");
    }
    console.log(list)
    console.log(list[0].todos)
    console.log(list[0].todos[0])
    
});

router.get("/user/:username", function (req, res) {

  let index = 0;
  let username = req.params.username;
  index = list.findIndex(x => x.name === username);
  if (index === -1) {
    console.log("Hello 2")
    res.send("User not found")
  } else {
    console.log("Hello 1")
    res.json(list[index]);
  }
});

router.delete("/user/:username", function (req, res) {
  console.log("Toimii")
  let index = 0;
  let username = req.params.username;
  index = list.findIndex(x => x.name === username);
  if (index === -1) {
    console.log("Hello 2")
    res.send("User not found")
  } else {
    list.splice(index, 1)
    console.log("Hello 1")
    res.send("User deleted");
  }
});


module.exports = router;
