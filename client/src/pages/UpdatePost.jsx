import {
    Alert,
    Button,
    FileInput,
    Select,
    TextInput,
} from 'flowbite-react';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Tiptap
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

// Componentes
import EditorToolbar from '../components/EditorToolbar';


export default function UpdatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'uncategorized',
        content: '',
        image: '',
    });
    const [publishError, setPublishError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const { postId } = useParams();

    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if (res.ok) {
                    setPublishError(null);
                    setFormData(data.posts[0]);
                }
            };
            fetchPost();
        } catch (error) {
            console.log(error.message);
        }
    }, [postId]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            BulletList,
            OrderedList,
            ListItem,
            Link.configure({
                openOnClick: false,
            }),
            // Agregar la extensión de placeholder
            Placeholder.configure({
                placeholder: 'Write something...',
            }),
        ],
        content: formData.content || '',
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            setFormData((prev) => ({
                ...prev,
                content,
            }));
        },
    });

    // Efecto para actualizar el contenido del editor si formData.content cambia desde fuera
    useEffect(() => {
        if (editor && formData.content !== editor.getHTML()) {
            editor.commands.setContent(formData.content || '');
        }
    }, [formData.content, editor]);

    const handleUploadImage = async () => {
        if (!file) {
            setImageUploadError('Please select an image');
            return;
        }

        setImageUploadError(null);
        setImageUploadProgress(0);

        try {
            const storage = getStorage(app);
            const fileName = `${new Date().getTime()}-${file.name}`;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    console.error('Upload failed:', error);
                    setImageUploadError('Failed to upload image');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData((prev) => ({ ...prev, image: downloadURL }));
                    });
                }
            );
        } catch (error) {
            console.error('Unexpected error:', error);
            setImageUploadError('An unexpected error occurred');
            setImageUploadProgress(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPublishError(null);
        setSuccessMessage(null);

        // Validación del título
        if (!formData.title.trim()) {
            setPublishError('El título es obligatorio');
            document.getElementById('title')?.focus(); // Enfoca el campo de título
            return;
        }

        try {
            const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setPublishError(data.message || 'Hubo un problema al actualizar el post');
                return;
            }

            setSuccessMessage('¡Post actualizado con éxito!');
            setTimeout(() => {
                navigate(`/post/${data.slug}`);
            }, 1500);
        } catch (error) {
            setPublishError('No se pudo actualizar el post');
            console.error('Error al publicar:', error);
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>

            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                {/* Title + Category */}
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        id='title'
                        required
                        className='flex-1'
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        value={formData.title}
                    />
                    <Select
                        id='category'
                        onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                        }
                        value={formData.category}
                    >
                        <option value='uncategorized'>Select a category</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>
                    </Select>
                </div>

                {/* Image Upload Section */}
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput
                        type='file'
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <Button
                        type='button'
                        color='blue'
                        size='sm'
                        outline
                        onClick={handleUploadImage}
                        disabled={!!imageUploadProgress}
                    >
                        {imageUploadProgress ? (
                            <div className='w-16 h-16'>
                                <CircularProgressbar
                                    value={imageUploadProgress}
                                    text={`${imageUploadProgress}%`}
                                />
                            </div>
                        ) : (
                            'Upload Image'
                        )}
                    </Button>
                </div>

                {/* Error Messages */}
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                {publishError && <Alert color='failure'>{publishError}</Alert>}
                {successMessage && <Alert color='success'>{successMessage}</Alert>}

                {/* Display Uploaded Image */}
                {formData.image && (
                    <img
                        src={formData.image}
                        alt='Uploaded preview'
                        className='w-full h-72 object-cover rounded-lg shadow-md'
                    />
                )}

                {/* Rich Text Editor */}
                <div className='tiptap-wrapper'>
                    <EditorToolbar editor={editor} />
                    <EditorContent
                        editor={editor}
                        className='ProseMirror mt-2 p-4 border rounded-md bg-white'
                    />
                </div>

                {/* Submit Button */}
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Update post
                </Button>
            </form>
        </div>
    );
}