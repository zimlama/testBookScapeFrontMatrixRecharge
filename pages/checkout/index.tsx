import React, { useState, useEffect } from "react";
import Link from "next/link";
import PaypalButton from "../PaypalButton";
import { useAuthContext } from "@/context/AuthContext";
import { useCartBdContext } from "@/context/CartBdContext";
import styles from "./checkout.module.css";
import pago from "../../public/images/pay.png";

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
    <div className={styles.titulo}>
      <h1>Finalizar Compra</h1>
      <div className={styles.contenedor}>
        <div className={styles.izq}>
          <div className={styles.container}>
            {/* Paso 1: Información del usuario */}
            <section>
              <div>
                <h4>Paso 1: Información del usuario</h4>
              </div>
              {editEmail ? (
                // Si se está editando el correo, muestra un input para la edición

                <div>
                  <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({
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
          </div>

          <div className={styles.container}>
            {/* Paso 2: Método de pago */}
            <section>
              <h4>Paso 2: Método de Pago</h4>
              <p>
                Método de Pago: <img src={pago.src} alt="Paypal" />
              </p>

              {/* Puedes agregar aquí opciones para otros métodos de pago */}
            </section>
          </div>

          <div className={styles.container}>
            {/* Paso 3: Revisar artículos */}
            <section>
              <h4>Paso 3: Revisar los libros</h4>
              {/* Mostrar lista de libros seleccionados */}
              {cartItemsBd.map((item) => {
                if (selectedItems[item.id_book]) {
                  return (
                    <div key={item.id_book} className={styles.card}>
                      <img src={item.image} alt={item.title} />

                      <div>
                        {" "}
                        <h5>{item.title}</h5>
                        <p>Cantidad: {item.cantidad}</p>
                        <p>Precio: ${item.price}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </section>
          </div>
          <div className={styles.container}>
          <h2>Total a Pagar: ${totalBd.toFixed(2)}</h2>
          </div>
          <div className={styles.politicas}> 
            <p>
*¿Necesitas ayuda? Consulta nuestra Página de ayuda o contacta con nosotros
Para un producto vendido por BookScape.com: Al hacer clic en "Finalizar pedido", te enviaremos un e-mail notificándote que hemos recibido tu pedido. El contrato de compra no estará formalizado hasta que te enviemos un mensaje por e-mail notificándote que se ha enviado el producto.
Todos los productos de este pedido son vendidos por BookScape.com, a menos que se indique lo contrario. 
<br /> <br />Para más información ver los términos y condiciones aquí
Podrás devolver mercancía nueva y sin abrir en estado original dentro de los 30 días posteriores a la entrega. 
<br />Aplican excepciones y restricciones. Consulta la Política de devoluciones de BookScape.com. ¿Necesitas agregar más productos a tu pedido? Continua comprando en la página principal de BookScape.com.</p>
          </div>
        </div>
        <div className={styles.der}>
          {/* Paso 4: Confirmar Pedido */}
            <div className={styles.botones}>
              <section>
                <h4>Paso 4: Confirmar Pedido</h4>
                <div>
                  <p>Número de Factura: {invoiceNumber}</p>
                  <h2>Total a Pagar: ${totalBd.toFixed(2)}</h2>
                  <button
                    className={styles.button}
                    onClick={handleConfirmOrder}
                  >
                    Confirmar Pedido
                  </button>
                </div>
                {/* Botones de navegación */}
                <div>
                  <Link href="/carritoDeCompra">
                    <button className={styles.button2}>Cancelar</button>
                  </Link>
                </div>{" "}
              </section>
            </div>
            {/* Mostrar el botón de PayPal después de la confirmación */}
            {confirmed ? (
              <PaypalButton
                totalValue={totalBd.toFixed(2)}
                invoice={invoiceNumber}
              />
            ) : null}
          </div>
        </div>
    </div>
  );
};

export default CheckoutPage;
