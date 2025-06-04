//* IMPORTS NECESARIOS
// Importamos los componentes de Flowbite
import { Button, Navbar, TextInput, NavbarToggle, NavbarCollapse, NavbarLink, Dropdown, Avatar, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-react';
// Importamos los iconos de react-icons
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

//* FUNCION PRINCIPAL DEL HEADER
// Este componente es el header de la aplicacion, donde se encuentra el logo, el buscador y los enlaces a las diferentes paginas
export default function Header() {
    // Obtenemos la ruta actual para cambiar el color del navbar
    const path = useLocation().pathname; // Obtener la ruta actual
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector((state) => state.theme);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);

        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

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
            <form onSubmit={handleSubmit}>
                <TextInput
                    type="text"
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>

            {/* Boton de busqueda para dispositivos moviles */}
            <Button className='w-12 h-12 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>

            {/* Seccion de enlaces y botones
            * TODO: VERIFICAR EL DARK MODE Y LIGHT MODE
            */}
            <div className='flex items-center gap-2 md:order-2'>
                {/* Boton de modo oscuro */}
                <Button
                    className='w-12 h-10 hidden sm:inline'
                    color='gray'
                    pill
                    onClick={() => dispatch(toggleTheme())}
                >
                    {theme == 'light' ? <FaSun /> : <FaMoon />}
                </Button>

                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user'
                                img={currentUser.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                                rounded
                            />
                        }
                    >
                        <DropdownHeader>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </DropdownHeader>
                        <Link to={'/dashboard?tab=profile'}>
                            <DropdownItem>Profile</DropdownItem>
                        </Link>
                        <DropdownDivider />
                        <DropdownItem onClick={handleSignout}> Sign out</DropdownItem>
                    </Dropdown>
                ) : (
                    /* Boton de registro */
                    <Link to="/sign-in">
                        <Button color='blue' outline>
                            Sign In
                        </Button>
                    </Link>
                )
                }

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