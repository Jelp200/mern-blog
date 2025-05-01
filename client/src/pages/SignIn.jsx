import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importar los componentes de redux para manejar el estado de carga y errores
import { useDispatch, useSelector } from 'react-redux';
import { signinStart, signinSuccess, signinFailure } from '../redux/user/userSlice';

export default function SignIn() {
    //* INICIO SECCION IMPORTANTE
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({});

    // Obtener el estado de carga y error desde Redux
    const { loading, error: errorMessage } = useSelector((state) => state.user);

    /*
    * Descomentar si no se desea usar Redux para manejar el estado de carga y errores
    * const [errorMessage, setErrorMessage] = useState(null); // Estado para almacenar el error del formulario
    * const [loading, setLoading] = useState(false); // Estado para almacenar el estado de carga
    */

    // Hook para acceder al dispatch de Redux
    const dispatch = useDispatch();

    // Hook para navegar entre rutas
    const navigate = useNavigate();

    // Función para manejar el cambio en los campos de entrada
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Mostrar mensaje de error si los campos están vacíos
        if (!formData.email || !formData.password) {
            return dispatch(signinFailure('Please fill in all fields')); // Manejar el error de campos vacíos con Redux
        }

        // Try-catch para enviar los datos al servidor
        try {
            dispatch(signinStart()); // Iniciar el proceso de inicio de sesión con Redux

            /*
            * Descomentar si no se desea usar Redux para manejar el estado de carga y errores
            * setLoading(true); // Cambiar el estado de carga a verdadero
            * setErrorMessage(null); // Limpiar el mensaje de error
            */

            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json(); // Convertir la respuesta a JSON

            if (data.success == false) {
                dispatch(signinFailure(data.message)); // Manejar el error de inicio de sesión con Redux
                /*
                * Descomentar si no se desea usar Redux para manejar el estado de carga y errores
                * return setErrorMessage(data.message); // Si la respuesta es un error, mostrar el mensaje de error
                */
            }

            // setLoading(false); // Cambiar el estado de carga a falso

            if (res.ok) {
                dispatch(signinSuccess(data)); // Manejar el inicio de sesión exitoso con Redux
                navigate('/'); // Redirigir al usuario a la página de inicio de sesión
            }
        } catch (error) {
            dispatch(signinFailure(error.message)); // Manejar el error de conexión con Redux
            /*
            * Descomentar si no se desea usar Redux para manejar el estado de carga y errores
            * setErrorMessage('Connection error, please try again later'); // Si hay un error en la conexión, mostrar el mensaje de error
            *setLoading(false); // Cambiar el estado de carga a falso
            */
        }
    }
    //* FIN SECCION IMPORTANTE

    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* Columna de la izquierda */}
                <div className="flex-1">
                    <Link to="/" className="font-bold dark:text-white text-4xl">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                            Jelp 200
                        </span>
                        Blog
                    </Link>
                    <p className="text-sm mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit quaerat vel doloremque sequi dolores illo?
                    </p>
                </div>

                {/* Columna de la derecha */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="email" value="Your email">Your email</Label>
                            <TextInput type="email" placeholder="name@domain.com" id="email" onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="password" value="Your password">Your password</Label>
                            <TextInput type="password" placeholder="********" id="password" onChange={handleChange} />
                        </div>
                        <Button color="blue" type="submit" disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm'/>
                                        <span className='pl-3'>Loading...</span>
                                    </>
                                ) : 'Sign In'
                            }
                        </Button>
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Don't have an account?</span>
                        <Link to="/sign-up" className="text-blue-500 hover:text-blue-700">
                            Sign Up
                        </Link>
                    </div>

                    {/* Mensaje de error si existe */}
                    {errorMessage && (
                        <Alert color="failure" className="mt-5">
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}

