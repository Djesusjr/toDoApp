import { Link } from "react-router-dom";
import styled from "styled-components";

export default function BotonNav() {
    return (
        <Link to='/Tareas'>
            <Boton>Tareas Completas</Boton>
        </Link>
    )
}

export function BackNav() {
    return (
        <Link to='/'>
            <Boton>Tareas Pendientes</Boton>
        </Link>
    )
}
const Boton = styled.button`
    color: white;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.3s;
    height: 30px;
    font-size: auto;
    margin-right: 10px;

    &:hover {
        background-color:  #45a049;
    }
`;


