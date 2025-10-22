import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { X } from 'react-bootstrap-icons';

import { createUser } from '../../features/user/userSlice';

const CreateUserForm = ({ isOpen, toggleCurrentFormType, closeForm }) => {
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector((state) => state.user);
    const [values, setValues] = useState({
        email: "",
        name: "",
        password: "",
        avatar: "",
    });

    const [localError, setLocalError] = useState(null);

 
    const [isAnimating, setIsAnimating] = useState(isOpen);

    useEffect(() => {
        setIsAnimating(isOpen); 
    }, [isOpen]);

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
        setLocalError(null);
    };

    const validateForm = () => {
        if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) {
            return 'Please enter a valid email address.';
        }
        if (!values.name.trim()) {
            return 'Name is required.';
        }
        if (!values.password || values.password.length < 6) {
            return 'Password must be at least 6 characters long.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setLocalError(validationError);
            return;
        }

        const isNotEmpty = Object.values(values).some(val => val);

        if (!isNotEmpty) return;

        try {
            await dispatch(createUser(values)).unwrap();
            closeForm(); 
        } catch (err) {
            return
        }
    };

    return (
        <aside className={`fixed top-0 right-0 h-full w-80 bg-main-color shadow-2xl px-5 z-50 transform transition-transform duration-500 ease-out will-change-transform ${isAnimating ? '' : 'translate-x-full'}`}>
            <X className="text-4xl text-white custom-shadow cursor-pointer hover:scale-110" onClick={closeForm} />
            <div className="title text-2xl font-bold text-center text-white custom-shadow mb-6">Sign Up</div>

            {(localError || error) && (
                <div className="mb-4 p-3 bg-red-500 text-white rounded-md text-sm">
                    {localError || error}
                </div>
            )}

            <form className='flex flex-col gap-4 flex-grow' onSubmit={handleSubmit}>
                <div className="group">
                    <input
                        type="email"
                        placeholder="Your email"
                        name="email"
                        value={values.email}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                        className='w-full p-3 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    />
                </div>
                <div className="group">
                    <input
                        type="text"
                        placeholder="Your name"
                        name="name"
                        value={values.name}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                        className='w-full p-3 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    />
                </div>
                <div className="group">
                    <input
                        type="password"
                        placeholder="Your password"
                        name="password"
                        value={values.password}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                        className='w-full p-3 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    />
                </div>
                <div className="group">
                    <input
                        type="url"
                        placeholder="Your avatar"
                        name="avatar"
                        value={values.avatar}
                        autoComplete="off"
                        onChange={handleChange}
                        className='w-full p-3 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    />
                </div>
                <div className="text-white custom-shadow cursor-pointer hover:scale-110 text-center p-5" onClick={() => toggleCurrentFormType('login')}>
                    I already have an account
                </div>
                <button type="submit" disabled={isLoading} className='text-xl font-semibold custom-border custom-shadow custom-btn'>
                    {isLoading ? 'Creating...' : 'Create an account'}
                </button>
            </form>
        </aside>
    );
};

export default CreateUserForm;

