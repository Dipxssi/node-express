const fs = require("fs");
const { Command } = require('commander')

const program = new Command();

program
  .name('todo')
  .description('CLI for todos')
  .version('0.8.0');

program.command('add')
  .description('add a todo')
  .argument('<task>', 'Task to be added ')
  .action((task) => {
     const file = "todos.json";
     let todos=[]
     if(fs.existsSync(file)){
      const data = fs.readFileSync(file,'utf8');
      todos = JSON.parse(data);
     }
     const newTodo ={
      id : Date.now(),
      task,
      done:false
     };
     todos.push(newTodo);
     fs.writeFileSync(file, JSON.stringify(todos,null,2))
  });


program.command('delete')
  .description('delete a todo')
  .argument('<id>', 'Task to be deleted ')
  .action((id) => {
     const file = "todos.json";
     let todos=[]
     if(fs.existsSync(file)){
      const data = fs.readFileSync(file,'utf8');
      todos = JSON.parse(data);
     }
     const newTodos = todos.filter(todo => todo.id !== parseInt(id));

     fs.writeFileSync(file, JSON.stringify(newTodos,null,2));

     console.log(`Deleted task with ${id}`)
  });


program.command('mark')
  .description('Mark a todo')
  .argument('<id>', 'Marked the task ')
  .action((id) => {
     const file = "todos.json";
     let todos=[]
     if(fs.existsSync(file)){
      const data = fs.readFileSync(file,'utf8');
      todos = JSON.parse(data);
     }
      

     const newTodos = todos.map(todo =>{
      if (todo.id === parseInt(id)){
        return {...todo, done:true};
      }
      return todo;
     })

     fs.writeFileSync(file, JSON.stringify(newTodos,null,2));

     console.log(` task marked  with ${id}`)
  });

program.parse(process.argv);