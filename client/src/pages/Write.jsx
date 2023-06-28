import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {

  const state = useLocation().state
  console.log(state,"this is state");

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "")
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState(state?.cat || "")

const navigate=useNavigate()
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state._id}`, {
          author:JSON.parse(localStorage.getItem('user')),
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
          author:JSON.parse(localStorage.getItem('user')),
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          });

          navigate('/')
    } catch (err) {
      console.log(err);
    }
  };


  // const upload = async () => {
  //   try {
  //     const formData = new FormData()
  //     formData.append("file", file)
  //     const res = await axios.post("/upload", formData)
  //     return res.data
  //   } catch (error) {

  //   }
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const imgUrl = upload()


  //   try {
  //     state ? await axios.put(`/posts/${state._id}`, {
  //       title, desc: value, cat, img: file ? imgUrl : ""
  //     }) :
  //       await axios.post(`/posts`, {
  //         title, desc: value, cat, img: file ? imgUrl : "",
  //       })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b>Draft
          </span>
          <span>
            <b>Visibility:</b>Public
          </span>
          <input style={{ display: "none" }} type="file" name='' id='file' onChange={e => setFile(e.target.files[0])} />
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as draft</button>
            <button onClick={handleClick} >Publish</button>

          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "art"} id='art' name='cat' value='art' onChange={e => setCat(e.target.value)} />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">

            <input type="radio" checked={cat === "science"} id='science' name='cat' value='science' onChange={e => setCat(e.target.value)} />
            <label htmlFor="science">Science</label>
          </div>

          <div className="cat">

            <input type="radio" checked={cat === "technology"} id='technology' name='cat' value='technology' onChange={e => setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>

          <div className="cat">

            <input type="radio" checked={cat === "cinema"} id='cinema' name='cat' value='cinema' onChange={e => setCat(e.target.value)} />
            <label htmlFor="cinema">Cinema</label>
          </div>

          <div className="cat">

            <input type="radio" checked={cat === "design"} id='design' name='cat' value='design' onChange={e => setCat(e.target.value)} />
            <label htmlFor="design">Design</label>
          </div>

          <div className="cat">

            <input type="radio" checked={cat === "food"} id='food' name='cat' value='food' onChange={e => setCat(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div>


        </div>

      </div>
    </div>
  )
}

export default Write