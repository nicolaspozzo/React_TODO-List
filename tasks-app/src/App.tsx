import React from 'react';
import { useState, useRef } from 'react';

import './App.css';

import 'bootswatch/dist/cyborg/bootstrap.min.css'

type FormElement = React.FormEvent<HTMLFormElement>

interface ITask {
  name: string;
  done: boolean;
}


function App() {

  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask) 
    setNewTask("")
    taskInput.current?.focus()  
  }
  /**
    [...tasks, {name, done:false}] = copio todo lo que hay en el arreglo tasks y le agrego un nuevo objeto {name, done:false}
   */
  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    setTasks(newTasks)
    setNewTask('')
  }
  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks]
    newTasks[i].done = !newTasks[i].done
    setTasks(newTasks)
  }
  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks]
    newTasks.splice(i, 1)
    setTasks(newTasks)
  }

  return (
    <div className="container-small">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit} >
                <input
                  className="form-control"
                  type="text"
                  onChange={e => setNewTask(e.target.value)}
                  ref={taskInput}
                  value={newTask} />
                <button 
                  className="btn btn-outline-primary btn-block mt-2"
                  autoFocus
                >
                  Save
          </button>
              </form>
            </div>
          </div>

          {
            tasks.map((t: ITask, i: number) => (
              <div className="card card-body mt-2" key={i}>
                <h2 style={{ textDecoration: t.done ? 'line-through' : '' }}>{t.name}</h2>
                <div>
                  <button className="btn btn-outline-info" onClick={() => toggleDoneTask(i)}>
                    {/* {t.done ? '✓' : '✗'} */}
                    {t.done ? '✗' : '✓'}
                  </button>

                  <button className="btn btn-outline-danger" onClick={() => removeTask(i)}>
                    🗑
                  </button>
                </div>

              </div>
            ))
          }
        </div>
      </div>

    </div>
  );
}

export default App;
