import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Create() {
    const [formData, setFormData] = useState({
      title : "",
      author : "",
      year : ""
    })

    const navigate = useNavigate()
    const API_URL = "http://localhost:5001/books"

    const handleSubmit = async(e)=>{
      e.preventDefault()
      await axios.post(API_URL, formData)
      navigate("/")
    }  
  
    return (
    <div className='card p-3 shadow'>
      <h3> Add New Book </h3>
      <form onSubmit={handleSubmit}>
        Title : <input type='text' 
        placeholder= 'Enter title'
        value={formData.title}
        className='form-control mb-2'
        onChange={e=>setFormData({...formData,title:e.target.value})}
        required /> <br />
        Author : <input type='text' 
        placeholder= 'Enter author'
        value={formData.author}
        className='form-control mb-2' 
        onChange={e=>setFormData({...formData,author:e.target.value})}
        required /> <br />
        Year : <input type='number' 
        placeholder= 'Enter year'
        value={formData.year}
        className='form-control mb-2'
        onChange={e=>setFormData({...formData,year:e.target.value})}
        required /> <br />
        <button className='btn btn-primary'> Add </button>
      </form>
    </div>
  )
}
