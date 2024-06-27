import React, { useState } from 'react';
import RemitentesList from './RemitentesList';
import RemitosForm from './RemitosForm';
import remitentesData from './remitentesData.json';
import BaseRemitentesListWrapper from './BaseRemitentesListWrapper';
import './RemitosForm.css';

const CommonParentComponent = () => {
    const [isRemitentesListVisible, setIsRemitentesListVisible] = useState(false);

    const toggleRemitentesList = () => {
        setIsRemitentesListVisible(wasRemitentesListVisible => !wasRemitentesListVisible);
    }
    const [selectedRemitente, setSelectedRemitente] = useState<{ nombre: string, cuit: string } | null>(null);

    return (
        <div>
            <RemitentesList remitentesData={remitentesData} setSelectedRemitente={setSelectedRemitente} onBackdropClick={function (): void {
                throw new Error('Function not implemented.');
            } } />
            <RemitosForm selectedRemitente={selectedRemitente} /> 
            <button onClick={toggleRemitentesList}>Listar Remitentes</button>
            <BaseRemitentesListWrapper isRemitentesListVisible={isRemitentesListVisible} onBackdropClick={toggleRemitentesList} /> 
        </div>
    );
}

export default CommonParentComponent;