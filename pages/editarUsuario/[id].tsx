import React, { useState, useEffect } from "react";
import { useUsuarioContext } from "@/context/UsuarioCrudContext";
import { useRouter } from "next/router";


interface Usuario {
    id: string;
    username: string;
    email: string;
    newPassword:string;
  }

const EditarUsuario = () => {
  const router = useRouter();

  const { editarUsuario, editUsuarios, setEditarUsuario } = useUsuarioContext();

  // Nuevo state de libros
  const [editUsuario, setEditUsuario] = useState<Usuario>({
    id: "",
    username: "",
    email: "",
    newPassword: "",
  });

  // Llenar el state automáticamente
  useEffect(() => {
    if (editarUsuario) {
      setEditUsuario(editarUsuario);
    }
  }, [editarUsuario]);

  // Actualizar un campo específico del formulario
  const onChangeFormulario = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUsuario({
      ...editUsuario,
      [name]: value,
    });
  };

  const submitEditarUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes enviar los cambios o realizar cualquier otra lógica
    editUsuarios(editUsuario); // toma el nuevo producto
    setEditarUsuario(null);
    router.push("/admin");
  };

  return (
    <div>
      <div>
        <h2>Editar Usuario</h2>
      </div>
      <form onSubmit={submitEditarUsuario}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            placeholder="Usuario"
            name="username"
            value={editUsuario.username}
            onChange={onChangeFormulario}
          />
        </div>
        <div>
          <label>Nueva Contraseña</label>
          <input
            type="text"
            placeholder="Nueva contraseña"
            name="newPassword"
            value={editUsuario.newPassword}
            onChange={onChangeFormulario}
          />
        </div>
        <div>
          <label>Correo Electrónico</label>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={editUsuario.email}
            onChange={onChangeFormulario}
          />
        </div>
        {/* agregar mas campos */}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarUsuario;
