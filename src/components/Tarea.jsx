import React from "react"
import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'

export default function DivTarea({ tarea, status, delete: eliminarTarea, readonly, tareasCompletas, editar: editarTarea }) {
    return (
        <Container>
            <Titulo>Título: {tarea.title}</Titulo>

            <Description>
                <strong>Descripción: </strong>{tarea.description}
            </Description>

            <InfoText>Prioridad: {tarea.priority}</InfoText>


            {!readonly ? (
                <>
                    <InfoText>
                        Estado: {tarea.completed ? 'Terminada' : 'Pendiente'}
                        <input
                            type="checkbox"
                            checked={tarea.completed}
                            onChange={() => { status(tarea.id) }}
                        />
                    </InfoText>
                    <InfoText>
                        <ButtonDelete onClick={() => eliminarTarea(tarea.id)}>Eliminar</ButtonDelete>
                        <ButtonEdit onClick={() => { editarTarea(tarea) }}>Editar</ButtonEdit>
                    </InfoText>

                </>

            ) : (
                <InfoText>
                    <Revertir onClick={() => { status(tarea.id) }}>
                        Revertir
                    </Revertir>
                </InfoText>
            )}


        </Container>
    )
}

const Container = styled.li`
    background-color: #1a1a1a; 
    border: 1px solid #333;
    margin: 10px 0;
    padding: 15px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%; 
    max-width: 500px; 
    align-items: flex-start;
    box-sizing: border-box; 
`

const Description = styled.div`
    font-size: 16px;
    color: #ccc;
    width: 100%;
    display: block;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all; 
    line-height: 1.4;
    text-align: left;
`

const Titulo = styled.strong`
    font-size: 20px;
    color: white;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
`

const InfoText = styled.p`
    color: #aaa;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
`

const ButtonDelete = styled.button`
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
        background-color: #cc0000;
    }
`

const ButtonEdit = styled.button`
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
        background-color: #45a049;
    }
`

const Revertir = styled.button`
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