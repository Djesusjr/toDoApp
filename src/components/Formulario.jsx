import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import DivTarea from './Tarea.jsx'
import styled from 'styled-components'
import BotonNav from './BotonsNav.jsx'



export default function Formulario() {

    const popoverRef = useRef(null);
    const [tareaAEditar, SetTareaAEditar] = useState(null);

    const [tareas, SetTarea] = useState(() => {
        const tareasGuardadas = localStorage.getItem('tareas_app');
        return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    });

    const [tareasRealizadas, SetTareasRealizadas] = useState(() => {
        const tareasRealizadasGuardadas = localStorage.getItem('tareas_realizadas');
        return tareasRealizadasGuardadas ? JSON.parse(tareasRealizadasGuardadas) : [];
    });

    const [nuevaTarea, SetNuevaTarea] = useState({
        id: '',
        title: '',
        description: '',
        priority: 'Alta',
        completed: false,
    }
    )

    useEffect(() => {
        localStorage.setItem('tareas_app', JSON.stringify(tareas));
    }, [tareas]);

    useEffect(() => {
        localStorage.setItem('tareas_realizadas', JSON.stringify(tareasRealizadas));
    }, [tareasRealizadas]);


     const handlerChange = (e) => {
        const { name, value } = e.target;
        SetNuevaTarea({ ...nuevaTarea, [name]: value })
    }

    const AddTask = () => {

        if (!nuevaTarea.title.trim()) return alert("El campo nombre no puede estar vacio");

        const newid = uuidv4()

        SetTarea([...tareas, { ...nuevaTarea, id: newid }])

        SetNuevaTarea({ id: '', title: '', description: '', priority:'Alta', completed: false })
    }

    const status = (id) => {
        const tareaEncontrada = tareas.find((t) => t.id === id);
        if (!tareaEncontrada) return;

        const tareaConCambio = { ...tareaEncontrada, completed: !tareaEncontrada.completed };

        if (tareaConCambio.completed) {
            SetTareasRealizadas([...tareasRealizadas, tareaConCambio]);
            deleteTask(id);
        } else {
            SetTareasRealizadas(tareasRealizadas.filter((t) => t.id !== id));
        }
    };

    const deleteTask = (id) => {
        const listaFiltrada = tareas.filter((tarea) => tarea.id !== id)
        SetTarea(listaFiltrada)
    }

    const updateTask = (e) => {
        const { name, value } = e.target;
        SetTareaAEditar({ ...tareaAEditar, [name]: value })
    }

    const editarTask = (tarea) => {
        SetTareaAEditar(tarea);
        popoverRef.current.showPopover();
    }


    return (
        <>
            <Header>
                <H1>ToDo App</H1>
                <BotonNav />
            </Header>

            <Container>

                <Input
                    type="text"
                    name='title'
                    value={nuevaTarea.title}
                    onChange={handlerChange}
                    placeholder='Titulo de la tarea'
                />
                
                <Input
                    type="text"
                    name="description"
                    value={nuevaTarea.description}
                    onChange={handlerChange}
                    placeholder='Descripcion de la tarea'
                />

                <Priority name="priority" value={nuevaTarea.priority} onChange={handlerChange}>

                    <option value="Alta">Prioridad</option>
                    <option value="Alta">Alta</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>

                </Priority>

                <Añadir onClick={AddTask}>AÑADIR</Añadir>

            </Container>

            <ul>
                {tareas.map((tarea) => (
                    <DivTarea key={tarea.id}
                        tarea={tarea}
                        status={status}
                        delete={deleteTask}
                        editar={editarTask} />))}
            </ul>

            <MiPopoverStyled id="message" popover='manual' ref={popoverRef}>
                {
                    tareaAEditar && (
                        <>
                            <p id='titulo'>Titulo
                                <input id='tituloInput' name='title' type="text" defaultValue={tareaAEditar.title} onChange={updateTask} /></p>
                            <p id='descripcion'>Descripción
                                <input id='descripcionInput' name='description' type="text" defaultValue={tareaAEditar.description} onChange={updateTask} /></p>
                            <Priority name="priority" value={tareaAEditar.priority} onChange={updateTask}>

                                <option>Prioridad</option>
                                <option value="Alta">Alta</option>
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>

                            </Priority>
                            <BouttonsChange>
                                <Button onClick={() => {
                                    popoverRef.current.hidePopover(),
                                        SetTareaAEditar(null)
                                }}>Cerrar</Button>

                                <Button onClick={() => {
                                    if (tareaAEditar.title.trim()) {
                                        const tareasActualizadas = tareas.map((tarea) => tarea.id === tareaAEditar.id ? tareaAEditar : tarea)
                                        SetTarea(tareasActualizadas)
                                        SetTareaAEditar(null)
                                        popoverRef.current.hidePopover()
                                    }
                                }}>Guardar</Button>
                            </BouttonsChange>

                        </>
                    )
                }
            </MiPopoverStyled>
        </>
    )
}



const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    gap: 20px;
    `

const H1 = styled.h1`
    padding-left: 40%;
    color: white;
    text-align: center;
    margin-bottom: 50px;`

const Container = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    `

const Input = styled.input`
    padding: 10px;
    border-radius: 5px; 
    border: none;
    margin-bottom: 20px;`

const Priority = styled.select`
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin-bottom: 20px;
    `
const Añadir = styled.button`
    padding: 10px;
    border-radius: 5px; 
    border: none;
    margin-bottom: 20px;
    background-color: #4CAF50;
    color: white;   
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
    `
const MiPopoverStyled = styled.div`
    background-color: #333;
    color: white;
    padding: 20px;
    border-radius: 5px;

    &:popover-open {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-radius: 5px;
        border: 1px solid #4CAF50;
    }
        #titulo, #descripcion {
        font-weight: bold;
        display: flex;
        flex-direction: column;
    }
`
;

const BouttonsChange = styled.div`
    display: flex; 
    justify-content: center;
    gap: 10px;
    
    `
const Button = styled.button`
    padding: 10px;
    border-radius: 5px;
    color: white;
    border: 1px solid white;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
    `