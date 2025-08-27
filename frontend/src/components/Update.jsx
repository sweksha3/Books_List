import {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Update() {

  const [formData,setFormData] = useState({
    title : "",
    author : "",
    year : ""
  })

  const {id} = useParams()
  const API_URL = "http://localhost:5001/books"
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get(`${API_URL}/${id}`)
      .then((res) => setFormData(res.data))
  },[id])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    await axios.put(`${API_URL}/${id}`, formData)
    navigate("/")
  }  

  return (
    <div className='card p-3 shadow'>
      <h3> Update Book </h3>
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
        <button className='btn btn-warning'> Update </button>
      </form>
    </div>
  )
}
