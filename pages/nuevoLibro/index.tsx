import React, { useState } from "react";
import { useCrudBookContext } from "@/context/CrudBookContext";
import { useBookContext } from "@/context/BookContext";
import { useRouter } from "next/router";


type Language = {
  language: string;
}
// Definición del tipo de objeto "Book"
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

const NuevoLibro = () => {
  const { newBook, errorNewBook } = useCrudBookContext();
  const { books } = useBookContext();
  const router = useRouter();
 
  const [nuevoLibroData, setNuevoLibroData] = useState<Book>({
    id_book: books.length + 1,
    isbn: 30000000*books.length + 1,
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

  // Cuando el administrador haga submit
  const submitNuevoLibro = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulario

    // Si no hay errores

    // Crear el nuevo Libro
    newBook(nuevoLibroData);
    router.push("/admin")
  };

  return (
    <div>
      <div>
        <h2>Agregar Nuevo Libro</h2>
      </div>
      <form onSubmit={submitNuevoLibro}>
        <div>
          <label>Titulo</label>
          <input
            type="text"
            placeholder="Titulo"
            name="title"
            value={nuevoLibroData.title}
            onChange={(e) => {
              setNuevoLibroData((prevData) => ({
                ...prevData,
                title: e.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Imagen de Portada</label>
          <input
            type="text"
            placeholder="Portada"
            name="image"
            value={nuevoLibroData.image}
            onChange={(e) => {
              setNuevoLibroData((prevData) => ({
                ...prevData,
                image: e.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Autor</label>
          <input
            type="text"
            placeholder="Autor"
            name="Authors"
            value={nuevoLibroData.Authors[0] ? nuevoLibroData.Authors[0].name : ""}
            onChange={(e) => {
              const newAuthors = [
                {
                  name: e.target.value,
                },
              ];
              setNuevoLibroData((prevData) => ({
                ...prevData,
                Authors: newAuthors,
              }));
            }}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            placeholder="Precio"
            name="price"
            value={nuevoLibroData.price}
            onChange={(e) => {
              setNuevoLibroData((prevData) => ({
                ...prevData,
                price: Number(e.target.value),
              }));
            }}
          />
        </div>
        <div>
          <label>Año de publicación</label>
          <input
            type="number"
            placeholder="Año de publicación"
            name="published_date"
            value={nuevoLibroData.published_date}
            onChange={(e) => {
              setNuevoLibroData((prevData) => ({
                ...prevData,
                published_date: Number(e.target.value),
              }));
            }}
          />
        </div>
        <div>
          <label>Descripción</label>
          <input
            type="text"
            placeholder="descripción"
            name="description"
            value={nuevoLibroData.description}
            onChange={(e) => {
              setNuevoLibroData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Puntuación inicial</label>
          <input
            type="number"
            placeholder="Puntuación"
            name="rating_ave"
            value={nuevoLibroData.rating_ave}
            onChange={(e) => {
              setNuevoLibroData((prevData) => ({
                ...prevData,
                rating_ave: Number(e.target.value),
              }));
            }}
          />
        </div>
        <div>
          <label>Categorías</label>
          <input
            type="text"
            placeholder="Categorías"
            name="Tags"
            value={nuevoLibroData.Tags[0] ? nuevoLibroData.Tags[0].name : ""}
            onChange={(e) => {
              const newTags = [
                {
                  name: e.target.value,
                },
              ];
              setNuevoLibroData((prevData) => ({
                ...prevData,
                Tags: newTags,
              }));
            }}
          />
        </div>
        <div>
          <label>Cantidad de paginas</label>
          <input
            type="number"
            placeholder="Cantidad de paginas"
            name="page_count"
            value={nuevoLibroData.page_count}
            onChange={(e) => {
              setNuevoLibroData((prevData) => ({
                ...prevData,
                page_count: Number(e.target.value),
              }));
            }}
          />
        </div>
        <div>
          <label>Lenguaje</label>
          <input
            type="text"
            placeholder="Lenguaje"
            name="Language"
            value={nuevoLibroData.Language.language}
            onChange={(e) => {
              setNuevoLibroData((prevData) => ({
                ...prevData,
                Language: {language: e.target.value},
              }));
            }}
          />
        </div>
        
        {/* agregar mas campos */}
        
        <button type="submit">Agregar Libro</button>
      </form>
      {/* agregarle estilos al error */}
      {errorNewBook ? <p>Hubo un error al cargar el libro</p> : null}
    </div>
  );
};

export default NuevoLibro;
