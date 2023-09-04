import React, { useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import decodeJwt from './decodeJwt';

export default function LoginGoogle() {
    const [nombre, setNombre] = useState<string | null>(null);

    function handleError() {
        console.log("Falla del login Google");

    }

    async function handleSuccess(credentialResponse: CredentialResponse) {
        console.log("credentialResponse", credentialResponse);
        if (credentialResponse.credential) {
            const response = await fetch("Colocar ruta aqui", {
                method: "POST",
                body: JSON.stringify({
                    token: credentialResponse.credential
                })
            });
            const { payload } = decodeJwt(credentialResponse.credential)
            console.log("payload credential", payload);
            setNombre(payload.nombre);
        }
    }

    return ( 
        <div>
            {nombre === null && <GoogleLogin useOneTap onError={handleError} onSuccess={handleSuccess} />}
            {nombre && <p>El usuario se ha iniciado sesion: {nombre}</p>}
        </div>
    )}