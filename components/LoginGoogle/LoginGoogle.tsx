import React, { useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import decodeJwt from './decodeJwt';

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK; // Obtiene la URL base del archivo .env.local

export default function LoginGoogle() {
    const [nombre, setNombre] = useState<string | null>(null);

    function handleError() {
        console.log("Falla del login Google");

    }

    async function handleSuccess(credentialResponse: CredentialResponse) {
        console.log("credentialResponse", credentialResponse);
        if (credentialResponse.credential) {
            const credenciales = {
                token: credentialResponse.credential
            }

            const response = await fetch(`${bookscapeback}/users/login`, {
                method: "POST",
                body: JSON.stringify (
                    credenciales
                )
            });
            console.log("esto es response:", response);
            const { payload } = decodeJwt(credentialResponse.credential)
            console.log("payload credential", payload);
            setNombre(payload.nombre);
            console.log("esto es despues de response:", response);
        }
    }

    return ( 
        <div>
            {nombre === null && <GoogleLogin useOneTap onError={handleError} onSuccess={handleSuccess} />}
            {nombre && <p>El usuario se ha iniciado sesion: {nombre}</p>}
        </div>
    )}