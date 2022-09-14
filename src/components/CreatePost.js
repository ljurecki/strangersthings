import React, { useState } from 'react';
import { createPost } from '../api';

const CreatePost = ({ token, fetchPosts, navigate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);
  const newPost = {
    title,
    description,
    price,
    location,
    willDeliver
  }

  async function addPost() {
    const result = await createPost(token, newPost);
    fetchPosts();
    navigate('./posts')
  }

  return (
    //Form that accepts the the 5 request parameters for creating a post
    <form id="forms">
      <h1>Create a Post</h1>
      <label className="formLabel">Title:</label>
      <input
        type='text'
        placeholder='Enter Title'
        onChange={(event) => setTitle(event.target.value)} />
      <label className="formLabel">Description:</label>
      <input
        type='text'
        placeholder='Enter Description'
        onChange={(event) => setDescription(event.target.value)} />
      <label className="formLabel">Price:</label>
      <input
        type='text'
        placeholder='Enter Price'
        onChange={(event) => setPrice(event.target.value)} />
      <label className="formLabel">Location:</label>
      <input
        type='text'
        placeholder='Enter Location'
        onChange={(event) => setLocation(event.target.value)} />
      <label className="formLabel"><input
        type='checkbox' id="Yes"
        onChange={(event) => setWillDeliver(event.target.checked)} />Will Deliver?</label>
      {/* <label><input 
              type='checkbox' id="No"/> No</label>  */}
      <button className="Btn" onClick={(event) => { event.preventDefault(); addPost() }}>Submit</button>
    </form>
  )
}

export default CreatePost;