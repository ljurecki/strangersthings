import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updatePost } from '../api';


const EditPost = ({ posts, token, fetchPosts, navigate }) => {
    const { postID } = useParams();

    const [currentPost] = posts.filter(post => post._id === postID);
    const { title, description, price, location, willDeliver } = currentPost;

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newPrice, setNewPrice] = useState(price);
    const [newLocation, setNewLocation] = useState(location);
    const [newWillDeliver, setNewWillDeliver] = useState(willDeliver);

    async function editPost() {
        const updatedPost = {
            token: token,
            title: newTitle,
            description: newDescription,
            price: newPrice,
            location: newLocation,
            willDeliver: newWillDeliver,
            _id: postID
        }
        await updatePost(updatedPost)
        fetchPosts();
        navigate('./posts')
    }

    return (
        <div>
            <form id="forms" onSubmit={(event) => {
                event.preventDefault();
                editPost();

            }}>
                <h1 className="pageTtl">What's Changed?</h1>
                <hr id="editHr" />
                <label className="formLabel">Update Title:</label>
                <input
                    type='text'
                    placeholder={title}
                    onChange={(event) => setNewTitle(event.target.value)} />
                <label className="formLabel">Update Description:</label>
                <input
                    type='text'
                    placeholder={description}
                    onChange={(event) => setNewDescription(event.target.value)} />
                <label className="formLabel">Update Price:</label>
                <input
                    type='text'
                    placeholder={price}
                    onChange={(event) => setNewPrice(event.target.value)} />
                <label className="formLabel">Update Location:</label>
                <input
                    type='text'
                    placeholder={location}
                    onChange={(event) => setNewLocation(event.target.value)} />
                <label className="formLabel"><input
                    type='checkbox' id="Yes" checked={newWillDeliver}
                    onChange={(event) => setNewWillDeliver(event.target.checked)} />Will Deliver?</label>
                <button className="Btn" type='submit'>Update</button>
            </form>

        </div>
    )
}

export default EditPost;