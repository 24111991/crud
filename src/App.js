import { useState, useEffect } from "react";
import "./styles.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
// import * as Icon from 'react-bootstrap-icons';

export default function App() {
  // need state to keep track of todos
  //const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState(()=>{
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    else{
      return [];    
    }
  });
  const [todo, setTodo] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleEditInputChange(e){
    setCurrentTodo({...currentTodo, text: e.target.value});
    console.log(currentTodo);
  }
  function handleFormSubmit(e){
      e.preventDefault();
      if(todo !==""){
        setTodos([...todos, {
          id: todos.length+1, 
          text: todo.trim()
        }]);
      }
      setTodo("");
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  function handleDelete(id){
    const removeItem = todos.filter(
      (todo) => {
        return todo.id !== id;
      }
    );
    setTodos(removeItem);
  }

  return (
    <div className="App"><br/><br/>
    
      <Container>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
      <Card >
      <Card.Body>
      {/* <h1>Todo</h1> */}
{isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
         
          <h2>Edit Todo</h2>
          <label htmlFor="editTodo">Edit todo: </label>&nbsp;
          <input  type="text" name="editTodo" placeholder="Edit todo" value={currentTodo.text}
            onChange={handleEditInputChange}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button type="submit">Update</button>&nbsp;
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}> 
          <h2>Add Todo</h2>
          <label htmlFor="todo">Add todo: </label>

          <input type="text" name="todo" placeholder="Create a new todo" value={todo}
            onChange={handleInputChange}
          /> &nbsp; &nbsp;
          <Button variant="success" type="submit">Add</Button>
          {/* <button type="submit">Add</button> */}
        </form>
      )}

      <div className="todo-list"><br/>
        {todos.map((todo) => (
          
          <Container><hr></hr>
          <Row>
          <Col md={10} key={todo.id}>{todo.text} </Col>
          <Col md={1}>
          <i class="bi bi-pencil-fill" onClick={() => handleEditClick(todo)}></i>
          {/* <Button variant="primary" onClick={() => handleEditClick(todo)}>Edit</Button> */}
          
          </Col>
          <Col md={1}>
          
          {/* <i class="bi bi-trash3-fill" onClick={()=>handleDelete(todo.id)}></i> */}
          {/* <Button variant="danger" onClick={()=>handleDelete(todo.id)}>Delete</Button> */}
          <i class="bi bi-trash3-fill" onClick={()=>handleDelete(todo.id)}></i>
          </Col>
          
          </Row>
          </Container>
          
        ))}
      </div>
      </Card.Body>
      </Card>
      </Col>
      <Col md={3}></Col>
      </Row>
      </Container>
    </div>
  );
}