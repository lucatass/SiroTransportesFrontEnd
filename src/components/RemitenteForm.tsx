import React from 'react'
import { UseFormRegister } from "react-hook-form"
import { FormValues } from './RemitoFormValues';

interface RemitenteFormProps {
    register: UseFormRegister<FormValues>;
}

const RemitenteForm: React.FC<RemitenteFormProps> = ({ register }) => {
    return (
        <div>
            <label htmlFor="remitente">Remitente</label>
            <input type="text" id="remitenteNombre" placeholder='Nombre y Apellido'
            {...register("remitenteNombre",{
                required:"El nombre es requerido (;_;)",
            })} />
            <input type="text" id="remitenteCuit" placeholder='Cuit'
            {...register("remitenteCuit",{
                required:"El cuit es requerido (;_;)",
            })} />
        </div>
    )
}

export default RemitenteForm
