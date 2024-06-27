import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './RemitosForm.css';

interface Remitente {
    id: number;
    nombre: string;
    cuit: string;
}

interface RemitentesListProps {
    remitentesData: Remitente[];
    setSelectedRemitente: (remitente: { nombre: string; cuit: string } | null) => void;
    onBackdropClick: () => void;
}

const RemitentesList : React.FC<RemitentesListProps> = ({ remitentesData, setSelectedRemitente, onBackdropClick }: RemitentesListProps) => {


    const handleRemitenteClick = (remitente: Remitente) => {
        setSelectedRemitente(remitente);
    }

    return ReactDOM.createPortal(
        <div onClick={onBackdropClick}>
            <button >Listar Remitentes</button>
                <div className='remitentesList'>
                    <div className='popup'>
                        <ul>
                            {remitentesData.map((remitente) => (
                                <li key={remitente.id}>
                                    <button onClick={() => handleRemitenteClick(remitente)}>
                                        {remitente.nombre}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
        </div>, document.getElementById ('modal-root')!);
}

export default RemitentesList;
