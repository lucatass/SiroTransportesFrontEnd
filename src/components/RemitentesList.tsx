import React, { useState } from 'react';
import './RemitosForm.css';

interface Remitente {
    id: number;
    nombre: string;
    cuit: string;
}

interface RemitentesListProps {
    remitentesData: Remitente[];
    setSelectedRemitente: (remitente: { nombre: string; cuit: string } | null) => void;
}

export const RemitentesList = ({ remitentesData, setSelectedRemitente }: RemitentesListProps) => {
    const [showList, setShowList] = useState(false);

    const handleClick = () => {
        setShowList(!showList);
    }

    const handleRemitenteClick = (remitente: Remitente) => {
        setSelectedRemitente(remitente);
        setShowList(false); // Close the list after selection
    }

    return (
        <div className='remitentesListContainer'>
            <button onClick={handleClick}>Listar Remitentes</button>
            {showList && (
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
                        <button onClick={handleClick}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RemitentesList;
