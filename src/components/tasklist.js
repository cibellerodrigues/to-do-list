import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";


export function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    function handleCreateNewTask() {
        // não cria a tarefa sem titulo
        if (!newTaskTitle) {
            return;
        }

        //adicionando as tarefas 
        setTasks(state =>
            state.concat([
                {
                    id: Math.random(),
                    title: newTaskTitle,
                    isComplete: false,
                },
            ])
        );
    }

    // o update (marca como finalizada) -- busca pelo index
    function handleToggleTaskCompletion(id) {
        const selectedTask = tasks.findIndex(task => task.id === id);


        // se não encontrar retorna -1 
        if (selectedTask > -1) {
            // marca a tarefa como completa
            setTasks(state => {
                const newState = [...state];

                // newState[selectedTask].isComplete = !newState[selectedTask].isComplete;

                newState[selectedTask] = {...newState[selectedTask], isComplete : !newState[selectedTask].isComplete}

                return newState;
            });
        }
    }
    //deletar a tarefa
    function handleRemoveTask(id) {
        setTasks(state => state.filter(task => task.id !== id));
    }

    return (
        <section className="task-list container">
            <header>
                <h2>Minhas tasks</h2>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Adicionar novo todo"
                        onChange={e => setNewTaskTitle(e.target.value)}
                        value={newTaskTitle}
                    />
                    <button
                        type="submit"
                        data-testid="add-task-button"
                        onClick={handleCreateNewTask}
                    >
                        <FiCheckSquare size={16} color="#fff" />
                    </button>
                </div>
            </header>

            <main>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <div
                                className={task.isComplete ? "completed" : ""}
                                data-testid="task"
                            >
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

                            <button
                                type="button"
                                data-testid="remove-task-button"
                                onClick={() => handleRemoveTask(task.id)}
                            >
                                <FiTrash size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    );
}