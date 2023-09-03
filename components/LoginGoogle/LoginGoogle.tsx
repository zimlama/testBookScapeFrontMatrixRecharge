import React, { useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import decodeJwt from './decodeJwt';
import axios from 'axios';
const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK; // Obtiene la URL base del archivo .env.local

export default function LoginGoogle() {
    const [nombre, setNombre] = useState<string | null>(null);

    function handleError() {
        console.log("Falla del login Google");

    }

    async function handleSuccess(credentialResponse: CredentialResponse) {
        if (credentialResponse.credential) {
            const credenciales = {
                token: credentialResponse.credential
            }
            const { payload } = decodeJwt(credentialResponse.credential)
            setNombre(payload.email);
            console.log("esto es payload.email: ", payload.email);
            const response = await axios.post(`${bookscapeback}/users/googleloggin`, payload)
            console.log("esto es response: ", response);
        }
    }

    return ( 
        <div>
            {nombre === null && <GoogleLogin useOneTap onError={handleError} onSuccess={handleSuccess} />}
            {nombre && <p>El usuario se ha iniciado sesion: {nombre}</p>}
        </div>
    )}