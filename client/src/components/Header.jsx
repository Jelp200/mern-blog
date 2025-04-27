//* IMPORTS NECESARIOS
import React from 'react';
// Importamos los componentes de Flowbite
import { Button, Navbar, TextInput, NavbarToggle, NavbarCollapse, NavbarLink } from 'flowbite-react';
// Importamos los iconos de react-icons
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

//* FUNCION PRINCIPAL DEL HEADER
// Este componente es el header de la aplicacion, donde se encuentra el logo, el buscador y los enlaces a las diferentes paginas
export default function Header() {
    // Obtenemos la ruta actual para cambiar el color del navbar
    const path = useLocation().pathname; // Obtener la ruta actual

    // Retornamos el navbar con los enlaces a las diferentes paginas
    return (
        // Navbar de la aplicacion
        <Navbar className='border-b-2'>
            {/* Logo y titulo */}
            <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Jelp 200</span>
                Blog
            </Link>

            {/* Seccion de busqueda */}
            <form>
                <TextInput
                    type="text"
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>

            {/* Boton de busqueda para dispositivos moviles */}
            <Button className='w-12 h-12 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>

            {/* Seccion de enlaces y botones */}
            <div className='flex items-center gap-2 md:order-2'>
                {/* Boton de modo oscuro */}
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon />
                </Button>

                {/* Boton de registro */}
                <Link to="/sign-in">
                    <Button gradientDuoTone='purpleToBlue'>
                        Sign In
                    </Button>
                </Link>

                {/* Boton para abrir el menu en dispositivos moviles */}
                <NavbarToggle />
            </div>

            {/* Menu de navegacion */}
            <NavbarCollapse>
                {/* Enlaces de navegacion */}
                <NavbarLink active={path === '/'} as={'div'}>
                    <Link to="/">Home</Link>
                </NavbarLink>
                <NavbarLink active={path === '/about'} as={'div'}>
                    <Link to="/about">About</Link>
                </NavbarLink>
                <NavbarLink active={path === '/projects'} as={'div'}>
                    <Link to="/projects">Projects</Link>
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    )
}

/*
* Es necesario que en <NavabarLink> se le pase el atributo 'as' con el valor 'div' para que no de error al compilar,
* ya que el componente NavbarLink espera un elemento HTML como hijo y no un componente de React.
*
* En este caso, como estamos usando React Router, el componente Link es un componente de React y no un elemento HTML.
*/