'use client';
import { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);  // New loading state

  const fetchTodos = async () => {
    setLoading(true);  // Set loading to true when fetching starts
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
    setLoading(false);  // Set loading to false once data is fetched
  };

  const addTodo = async () => {
    if (!newTask) return
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask })
    });
    const addedTodo = await res.json();
    setTodos([...todos, addedTodo]);
    setNewTask('');
  };




// In your page.js file:
const deleteAllTodos = async () => {
  try {
    const res = await fetch('/api/todos', {
      method: 'DELETE',  // HTTP method is DELETE
      headers: {
        'Content-Type': 'application/json',  // Set the content type to JSON
      },
      body: JSON.stringify({})  // No ID is passed in this case

    });

    if (!res.ok) {
      // Handle error if the request failed
      console.error('Failed to delete all todos');
      return;
    }

    const data = await res.json();
    setTodos([]);
    
    // Optionally, you can update the UI state to reflect the deleted todos
    // For example, clearing the local todos list or showing a success message
  } catch (error) {
    console.error('Error during deletion:', error);
  }
};




  const deleteTodo = async (id) => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    setTodos(todos.filter(todo => todo.id !== id));
  };



  


  const updateTodo = async (id, task) => {
    const updatedTask = prompt('Update Task', task);
    if (!updatedTask) return;
    const res = await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, task: updatedTask })
    });
    const updatedTodo = await res.json();
    setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
  };


  const updateTodoIsCompleted = async (id, isCompleted) => {
    // Send only the 'isCompleted' update to the backend
    const res = await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isCompleted }) // Send only the 'isCompleted' state
    });
    const updatedTodo = await res.json();
    setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
  };


  const handleCheckboxChange = async (id, currentIsCompleted) => {
    const updatedIsCompleted = !currentIsCompleted; // Toggle the isCompleted state
    await updateTodoIsCompleted(id, updatedIsCompleted); // Only update isCompleted
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className='bg-white p-4 w-[500px] h-screen '>
      <h1 className='text-center font-bold text-xl text-black'>Write your todos</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
        className='text-black bg-gray-300 outline-none rounded-full p-3 w-full mt-4'
      />
      <div className='flex mt-2 text-black text-sm p-2'>
        <span className=' bg-green-400 p-3 text-white rounded-full' onClick={addTodo}>Add Task</span>
        <span className='mx-2 bg-yellow-400 p-3 text-white rounded-full' onClick={deleteAllTodos}>Clear All</span>
       
      </div>
      {/* <button className='bg-[#2c2929] text-white p-4 rounded-full mt-2 text-sm absolute right-3 top-12' onClick={addTodo}>Add Task</button> */}

      {loading ? (
        <div className='font-bold text-center mt-8 text-red-900 text-lg'>Loading Data ...</div>
      ) :
       todos.length === 0 ? <p className='text-center text-black mt-24 font-bold text-lg'>There is no item to display !</p> :   <ul className='m-6 text-black'>
       {todos.map(todo => (
         <li className='border-b-[1px] border-[#00000011] p-4' key={todo.id}>
           <div className='flex justify-between'>
            <div>
            <input checked={todo.isCompleted}  onChange={() =>  handleCheckboxChange(todo.id, todo.isCompleted)}  className='mr-2' type='checkbox'></input>
            {todo.task} 
            </div>
           <div>
           <button className='mx-1' onClick={() => updateTodo(todo.id, todo.task)}><FaRegEdit /></button>
           <button className='mx-1' onClick={() => deleteTodo(todo.id)}><MdDelete /></button>
           </div>
           
           </div>
          
         </li>
       ))}
     </ul>
      }
    
    </div>
   
   
  );
}