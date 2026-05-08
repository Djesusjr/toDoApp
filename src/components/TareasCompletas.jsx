import { useEffect, useState } from 'react';
import DivTarea from './Tarea.jsx'
import styled from 'styled-components';
import { BackNav } from './BotonsNav.jsx';


export default function Lista() {
    const [tareas, SetTarea] = useState([]);

    useEffect(() => {
        const tareasGuardadas = localStorage.getItem('tareas_realizadas');
        if (tareasGuardadas) SetTarea(JSON.parse(tareasGuardadas));
    }, []);

    const revertir = (id) => {
        const tareaRevertir = tareas.find(t => t.id === id)
        if (!tareaRevertir) return;
        const nuevasTareasCompletas = tareas.filter(t => t.id != id);
        SetTarea(nuevasTareasCompletas)
        localStorage.setItem('tareas_realizadas', JSON.stringify(nuevasTareasCompletas));
        const listaDePendientes = localStorage.getItem('tareas_app');
        const pendientes = listaDePendientes ? JSON.parse(listaDePendientes) : [];

        const tareaEditada = { ...tareaRevertir, completed: false };
        const nuevasTareasPendientes = [...pendientes, tareaEditada];

        localStorage.setItem('tareas_app', JSON.stringify(nuevasTareasPendientes));
    }

    const completadas = tareas.filter((tarea) => tarea.completed);
    return (
        <div>
            <Header>
                <BackNav />
                <H1>Tareas Completas</H1>
            </Header>

            {
                completadas.length === 0 ? (
                    <p>No hay tareas completas</p>
                ) : (
                    completadas.map((tarea) => (
                        <DivTarea key={tarea.id} tarea={tarea} readonly={true} status={revertir} />
                    ))
                )
            }
        </div>
    );
}

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    margin: 30px;
    height: 80px    ;
    width: 100%;
`;
const H1 = styled.h1`
    padding-right: 35%;
    text-align: center;
    margin: 0;
    color: white;`