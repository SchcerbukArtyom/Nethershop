import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'react-bootstrap-icons';
import { loginUser } from '../../features/user/userSlice';

const UserLoginForm = ({ isOpen, toggleCurrentFormType, closeForm }) => {  
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isNotEmpty = Object.values(values).some(val => val);
        if (!isNotEmpty) return;
        dispatch(loginUser(values));
        closeForm();
    };

    return (
        <aside className={`fixed top-0 right-0 h-full w-80 bg-main-color shadow-2xl px-5 z-50 transform transition-all duration-500 ease-out will-change-transform ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}> 
            <div className='wrapper flex flex-col h-full p-6'>
                <div className="flex justify-end mb-4">
                    <X className="text-4xl text-white custom-shadow cursor-pointer hover:scale-110" onClick={closeForm} />
                </div>
                <div className="title text-2xl font-bold text-center text-white custom-shadow mb-6">Login</div>
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
                            className="w-full p-3 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                            className="w-full p-3 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />                
                    </div>
                    <div className="text-white custom-shadow cursor-pointer hover:scale-110 text-center p-5" onClick={() => toggleCurrentFormType('signup')}>
                        Create an account
                    </div>
                    <button type="submit" className="text-xl font-semibold custom-border custom-shadow custom-btn">Login</button>
                </form>
            </div>
        </aside>
    );
};

export default UserLoginForm;

