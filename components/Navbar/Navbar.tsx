import React from "react";
import Link from "next/link";
import logo from "../../public/images/BookScapeLogo.png";
import styles from "../Navbar/NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { IoIosCart } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { useAuthContext } from "@/context/AuthContext";
import salir from "../../public/images/salir.png"

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthContext();

  return (
    <nav>
      <div className={styles.liner}>
        <div className={styles.logo}>
          <Link href="/">
            <img src={logo.src} alt="Logo" />
          </Link>
        </div>
        <div className={styles.contanier}>
          <div className={styles.SearchBar}>
            <SearchBar />
          </div>

          {isAuthenticated() && user ? (
            <>
            <Link href="/carritoDeCompra" className={styles.Iconos}>
                Carrito <IoIosCart />
              </Link>
              <div className={styles.usuario}>
                <p>Hola, {user.username} 
                <Link href="/userAdmin" className={styles.Iconos}>
                <IoMdPerson />Mi cuenta
              </Link>  </p>
              </div> 
              <div><Link href="/" onClick={logout} className={styles.salir} >
                <img src={salir.src} alt="Cerrar Sesión" />
                </Link>
              </div>
              
            </>
          ) : (
            <>
            <Link href="/carritoDeCompra" className={styles.Iconos}>
                Carrito <IoIosCart />
              </Link>
              <Link href="/login" className={styles.Text}>
                Identifícate
                <IoMdPerson />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
