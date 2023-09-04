import React, { useState, useEffect } from "react";
import { useCrudBookContext } from "@/context/CrudBookContext";
import { useRouter } from "next/router";

// Definición del tipo de objeto "Book"
type Language = {
  language: string;
}
type Author = {
  name: string;
  // Agrega otras propiedades si es necesario
};

type Tags = {
  name: string;
  // Agrega otras propiedades si es necesario
};

type Book = {
  id_book: number;
  isbn: number;
  title: string;
  Authors: Author[];
  published_date: number;
  price: number;
  description: string;
  rating_ave: number;
  image: string;
  page_count: number;
  Tags: Tags[];
  Language: Language;
};

const EditarProducto = () => {
  const router = useRouter();

  const { editarBook, editBooks, setEditarBook } = useCrudBookContext();

  // Nuevo state de libros
  const [editBook, setEditBook] = useState<Book>({
    id_book: 0,
    isbn: 0,
    title: "",
    published_date: 0,
    description: "",
    rating_ave: 0,
    price: 0,
    image: "",
    page_count: 0,
    Authors: [
      {
        name: "",
      },
    ],
    Tags: [
      {
        name: "",
      },
    ],
    Language: {
      language: ""
    },
  });

  // Llenar el state automáticamente
  useEffect(() => {
    if (editarBook) {
      setEditBook(editarBook);
    }
  }, [editarBook]);

  // Actualizar un campo específico del formulario
  const onChangeFormulario = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditBook({
      ...editBook,
      [name]: value,
    });
  };

  const submitEditarLibro = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes enviar los cambios o realizar cualquier otra lógica
    editBooks(editBook); // toma el nuevo producto
    setEditarBook(null);
    router.push("/admin");
  };

  return (
    <div>
      <div>
        <h2>Editar Libro</h2>
      </div>
      <form onSubmit={submitEditarLibro}>
        <div>
          <label>Titulo</label>
          <input
            type="text"
            placeholder="Titulo"
            name="title"
            value={editBook.title}
            onChange={onChangeFormulario}
          />
        </div>
        <div>
          <label>Imagen de Portada</label>
          <input
            type="text"
            placeholder="Portada"
            name="image"
            value={editBook.image}
            onChange={onChangeFormulario}
          />
        </div>
        <div>
          <label>Autor</label>
          <input
            type="text"
            placeholder="Autor"
            name="Authors"
            value={editBook.Authors[0] ? editBook.Authors[0].name : ""}
            onChange={onChangeFormulario}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            placeholder="Precio"
            name="price"
            value={editBook.price}
            onChange={onChangeFormulario}
          />
        </div>
        <div>
          <label>Año de publicación</label>
          <input
            type="number"
            placeholder="Año de publicación"
            name="published_date"
            value={editBook.published_date}
            onChange={onChangeFormulario}
          />
        </div>
        <div>
          <label>Descripción</label>
          <input
            type="text"
            placeholder="descripción"
            name="description"
            value={editBook.description}
            onChange={onChangeFormulario}
          />
        </div>
        <div>
          <label>Puntuación inicial</label>
          <input
            type="number"
            placeholder="Puntuación"
            name="rating_ave"
            value={editBook.rating_ave}
            onChange={onChangeFormulario}
          />
        </div>
        <div>
          <label>Categorías</label>
          <input
            type="text"
            placeholder="Categorías"
            name="Tags"
            value={editBook.Tags[0] ? editBook.Tags[0].name : ""}
            onChange={onChangeFormulario}
          />
        </div>
        <div>
          <label>Cantidad de paginas</label>
          <input
            type="number"
            placeholder="Cantidad de paginas"
            name="page_count"
            value={editBook.page_count}
            onChange={onChangeFormulario}
          />
        </div>
        <div>
          <label>Lenguaje</label>
          <input
            type="text"
            placeholder="Lenguaje"
            name="Language"
            value={editBook.Language.language}
            onChange={onChangeFormulario}
          />
        </div>
        {/* agregar mas campos */}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;
