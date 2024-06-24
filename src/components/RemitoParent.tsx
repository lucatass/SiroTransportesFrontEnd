import { useState } from 'react';
import RemitentesList from './RemitentesList';
import RemitosForm from './RemitosForm';
import remitentesData from './remitentesData.json';
import './RemitosForm.css';

export const CommonParentComponent = () => {
    const [selectedRemitente, setSelectedRemitente] = useState<{ nombre: string, cuit: string } | null>(null);

    return (
        <div>
            <RemitentesList remitentesData={remitentesData} setSelectedRemitente={setSelectedRemitente} />
            <RemitosForm selectedRemitente={selectedRemitente} />
        </div>
    );
}

export default CommonParentComponent;
