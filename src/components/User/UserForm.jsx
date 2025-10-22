import CreateUserForm from './CreateUserForm';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm, toggleFormType } from '../../features/user/userSlice';
import UserLoginForm from "./UserLoginForm";

const UserForm = () => {
    const dispatch = useDispatch();
    const { showForm, formType } = useSelector(({ user }) => user);

    const closeForm = () => dispatch(toggleForm(false));
    const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));

    return (
        <>
            {showForm && <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40" onClick={closeForm} />}
            {formType === "signup" ? (
                <CreateUserForm 
                    isOpen={showForm} 
                    toggleCurrentFormType={toggleCurrentFormType} 
                    closeForm={closeForm} 
                />
            ) : (
                <UserLoginForm 
                    isOpen={showForm} 
                    toggleCurrentFormType={toggleCurrentFormType} 
                    closeForm={closeForm} 
                />
            )}
        </>
    );
};

export default UserForm;
