import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

    // Hook para acceder a la autorización de Firebase
    const auth = getAuth(app);

    // Hook para acceder al dispatch de Redux
    const dispatch = useDispatch();

    // Hook para navegar entre rutas
    const navigate = useNavigate();

    // Funcion para abrir ventana emergente
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account',
        });
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.user.photoURL
                }),
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(signinSuccess(data));
                navigate('/'); // <- redirige tras login exitoso
            } else {
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button type='button' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
            Continue with Google
        </Button>
    );
}