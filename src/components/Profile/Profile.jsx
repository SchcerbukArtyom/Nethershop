import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/user/userSlice'; 

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).some(val => val);

    if (!isNotEmpty) return;

    dispatch(updateUser(values));
  };

  return (
    <section className="h-auto max-h-[90vh] w-full col-span-full md:col-start-2 md:col-span-2 bg-main-color shadow-2xl rounded px-5 pb-20 z-50 my-5 transform transition-transform duration-500 ease-in-out overflow-y-auto">
      <div className="title text-2xl font-bold text-center text-white custom-shadow my-5">Update Profile</div>
      {!currentUser ? (
        <span className="text-white custom-shadow text-center">You need to log in</span>
      ) : (
        <form className='flex flex-col gap-4 flex-grow w-full md:w-1/2 mx-auto' onSubmit={handleSubmit}>
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
          <button type="submit" className='w-full md:w-1/2 self-center text-xl font-semibold custom-border custom-shadow custom-btn'>Update</button>
        </form>
      )}
    </section>
  );
}

export default Profile;
