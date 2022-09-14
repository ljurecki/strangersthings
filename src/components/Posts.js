import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../api';



const Posts = ({ posts, token, fetchPosts, navigate }) => {

  const [searchTerm, setSearchTerm] = useState('');


  const postMatches = (post, string) => {
    const { title, location } = post;

    if ((title.toLowerCase().includes(string.toLowerCase())) || (location.toLowerCase().includes(string.toLowerCase()))) {
      return post;
    }
  }
  const filteredPosts = posts.filter(post => postMatches(post, searchTerm))
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <div>
      <h1 className="pageTtl">Community Posts</h1>
      <hr className="hr" />
      <form onSubmit={(event) => { event.preventDefault(); }}>
        <input id="searchBar" type="text" placeholder="Search Posts" onChange={(event) => setSearchTerm(event.target.value)} />
      </form>
      <div id='outer div element'>

        <button id="createBttn"><Link to='/posts/create-post'>Create a Posting</Link></button>
        {
          postsToDisplay.map((post) => {
            const { description, location, price, title, willDeliver, createdAt, updatedAt, _id, isAuthor, } = post;
            return (
              <div id="postings" key={_id}>
                <h1>{title}</h1>
                <h3>Description:</h3> <p>{description}</p>
                <h3>Price:</h3> <p>{price}</p>
                <h3>Location:</h3><p>{location}</p>
                <h3>Will Deliver?</h3><p>{willDeliver ? ('Yes') : ('No')}</p>

                {
                  isAuthor ? (
                    <>
                      <button id="deleteBtn" onClick={(event) => { event.preventDefault(); deletePost(token, _id); fetchPosts(); navigate('./posts') }}>Delete Post</button>
                      <button className="Btn"> <Link to={`/posts/edit-post/${_id}`}>Edit Post</Link></button>
                    </>
                  ) : (
                    <button className="Btn"><Link to={`/posts/${_id}`}>View Post</Link></button>
                  )
                }
                <p className="stamp">Created At: {createdAt}</p>
                <p className="stamp">Updated At: {updatedAt}</p>
              </div>
            )
          })
        }
      </div></div>
  )
}

export default Posts;