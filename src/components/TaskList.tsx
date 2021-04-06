import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    //no momento o titulo esta vazio
    //se newTaskTitle for diferente de vazio retorne esse vazio se não continue o codigo
    if(!newTaskTitle) return

    //Aqui crio uma constante de nova tarefa para definir o id aleatorio
    const newTask = {
      //id aleatorio
      id: Math.random(),
      //titulo recebe o texto do input
      title: newTaskTitle,
      isComplete: false
    }
    //vou adicionar as tarefas usando o spread operator
    //crio um estado antigo para pegar os valores ja setados e adicionar aos novos
    setTasks(actualState => [...actualState, newTask])
    //aqui eu zero o input
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const toMarkTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)
    
    setTasks(toMarkTask)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    //crio uma função que filtre as tasks e caso encontre uma task com o id selecionado
    //mostra todos os outros menos esse.
    const remove = tasks.filter(task => task.id !== id)
    
    //depois é só mudar o estado
    setTasks(remove)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}