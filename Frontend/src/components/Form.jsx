import React from 'react'
import axios from 'axios'

const Form = ({ fetchData}) => {
    const [formData, setFormData] = React.useState({
        username: '',
        age: 10,
        file: null
    });

    const handlechange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('username', formData.username);
        form.append('age', formData.age);
        form.append('file', formData.file);

        try {
            const response = await axios.post('http://localhost:8000/api/create', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert('Form submitted successfully');
            fetchData();

        } catch (error) {
            console.error(error);
            alert('Error submitting form');
        }
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form action="" method='POST' encType='multipart/form-data' onSubmit={handlesubmit} className='flex flex-col border-2 p-4 rounded-2xl shadow-sky-500 shadow-2xl gap-4 w-1/3' >
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" value={formData.username} onChange={handlechange} required className='border border-gray-300 p-2 rounded' />
        <label htmlFor="age">Age:</label>
        <input type="number" name="age" id="age" value={formData.age} onChange={handlechange} required min={10} className='border border-gray-300 p-2 rounded' />
        <label htmlFor="file">File:</label>
        <input type="file" name="file" id="file" onChange={handlechange} required className='border border-gray-300 p-2 rounded' />
        <button type="submit" className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>Submit</button>
      </form>
    </div>
  )
}

export default Form
