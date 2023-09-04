import React, { useState, useEffect } from "react";
import Link from "next/link";
import PaypalButton from "../PaypalButton";
import { useAuthContext } from "@/context/AuthContext";
import { useCartBdContext } from "@/context/CartBdContext";

const CheckoutPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthContext();
  const { cartItemsBd, totalBd, selectedItems, setSelectedItems } =
    useCartBdContext();
  
  // Estado para la información del usuario
  const [userInfo, setUserInfo] = useState({
    email: user?.email || "",
  });

  // Estados para la edición del correo electrónico
  const [editEmail, setEditEmail] = useState(false);


  // Estado para la confirmación del pedido
  const [confirmed, setConfirmed] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(""); // Debes implementar la lógica para generar números de factura

  useEffect(() => {
    // Implementa la lógica para generar el número de factura de forma consecutiva
    // Por ejemplo, consulta la última factura en tu base de datos y suma 1
    // setInvoiceNumber(...);
  }, []);

  const handleConfirmOrder = async () => {
    // Implementa la lógica para registrar la orden en tu base de datos
    // Esto puede incluir el envío de datos a tu servidor y la interacción con PayPal
    
    // Después de registrar la orden con éxito, marca como confirmada
    setConfirmed(true);
  };

  const handleEmailEditSave = () => {
    // Implementa la lógica para guardar el correo editado, en la base de datos o donde sea necesario
    // Luego, cambia el estado editEmail a false para mostrar el correo como texto nuevamente
   
    setEditEmail(false);
  };

  return (
    <div>
      <h1>Finalizar Compra</h1>
      {/* Paso 1: Información del usuario */}
      <section>
        <h2>Paso 1: Información del usuario</h2>
        {editEmail ? (
          // Si se está editando el correo, muestra un input para la edición
          <div>
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={userInfo.email}
              onChange={(e) => setUserInfo({
                ...userInfo,
                email: e.target.value,
              })
            }
            />
            <button onClick={handleEmailEditSave}>Guardar</button>
          </div>
        ) : (
          // Si no se está editando, muestra el correo como texto
          <p>
            Correo Electrónico: {userInfo.email}{" "}
            <button onClick={() => setEditEmail(true)}>Editar</button>
          </p>
        )}
      </section>
      {/* Paso 2: Método de pago */}
      <section>
        <h2>Paso 2: Método de Pago</h2>
        <p>Método de Pago: Paypal</p>
        {/* Puedes agregar aquí opciones para otros métodos de pago */}
      </section>
      {/* Paso 3: Revisar artículos */}
      <section>
        <h2>Paso 3: Revisar los libros</h2>
        {/* Mostrar lista de libros seleccionados */}
        {cartItemsBd.map((item) => {
          if (selectedItems[item.id_book]) {
            return (
              <div key={item.id_book}>
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio: ${item.price}</p>
              </div>
            );
          }
        })}
        <p>Número de Factura: {invoiceNumber}</p>
        <p>Total a Pagar: ${totalBd.toFixed(2)}</p>
      </section>
      {/* Paso 4: Confirmar Pedido */}
      <section>
        <h2>Paso 4: Confirmar Pedido</h2>
        <button onClick={handleConfirmOrder}>Confirmar Pedido</button>
      </section>
      {/* Botones de navegación */}
      <div>
        <Link href="/carritoDeCompra">Cancelar</Link>
      </div>
      {/* Mostrar el botón de PayPal después de la confirmación */}
      {confirmed ? (
        <PaypalButton totalValue={totalBd.toFixed(2)} invoice={invoiceNumber} />
      ) : null}
    </div>
  );
};

export default CheckoutPage;
