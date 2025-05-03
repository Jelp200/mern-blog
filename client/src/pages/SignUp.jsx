import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
    //* INICIO SECCION IMPORTANTE
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({});

    // Estado para almacenar el error del formulario
    const [errorMessage, setErrorMessage] = useState(null);

    // Estado para almacenar el estado de carga
    const [loading, setLoading] = useState(false);

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
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage('Please fill in all fields');
        }

        // Try-catch para enviar los datos al servidor
        try {
            setLoading(true); // Cambiar el estado de carga a verdadero
            setErrorMessage(null); // Limpiar el mensaje de error

            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json(); // Convertir la respuesta a JSON

            if (data.success == false) {
                // Si la respuesta es un error, mostrar el mensaje de error
                return setErrorMessage(data.message);
            }

            setLoading(false); // Cambiar el estado de carga a falso

            if (res.ok) {
                navigate('/sign-in'); // Redirigir al usuario a la página de inicio de sesión
            }
        } catch (error) {
            // Si hay un error en la conexión, mostrar el mensaje de error
            setErrorMessage('Connection error, please try again later');
            setLoading(false); // Cambiar el estado de carga a falso
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
                            <Label htmlFor="username" value="Your username">Your username</Label>
                            <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="email" value="Your email">Your email</Label>
                            <TextInput type="email" placeholder="name@domain.com" id="email" onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="password" value="Your password">Your password</Label>
                            <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
                        </div>
                        <Button color="blue" type="submit" disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className='pl-3'>Loading...</span>
                                    </>
                                ) : 'Sign Up'
                            }
                        </Button>

                        {/* Botón de Google */}
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account?</span>
                        <Link to="/sign-in" className="text-blue-500 hover:text-blue-700">
                            Sign In
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
