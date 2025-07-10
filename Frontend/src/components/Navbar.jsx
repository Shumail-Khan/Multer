import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav className='flex justify-between items-center bg-blue-500 p-4 text-white'>
            <h1 className='text-xl font-bold'></h1>
            <div className='space-x-4'>
            <NavLink to="/" className='hover:underline'>Home</NavLink>
            <NavLink to="/form" className='hover:underline'>Form</NavLink>
            
            </div>
        </nav>   
    </div>
  )
}

export default Navbar
