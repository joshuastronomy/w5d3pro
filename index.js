const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', 'public/views')
app.set('view engine', 'mustache')

app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('public'));

const todos = [
  "Make some food.",
  "Get some water.",
  "Overthrow the capitalist machine."
];

const complete = [
  "did dis"
]

app.get('/', function(req, res){
  res.render('index', {todos: todos, complete: complete});
});

app.post("/todo", function (req, res) {
  todos.push(req.body.todoText);
  res.redirect('/');
})

app.post("/complete", function (req, res) {
  complete.push(req.body.completeText);
  const idx = todos.indexOf(req.body.completeText);
  todos.splice(idx, 1);
  res.redirect('/');
})

app.listen(3000, function() {
  console.log("Todo list initialized...")
})
