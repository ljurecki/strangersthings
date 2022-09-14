import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createMessage } from '../api';

const SendMessage = ({ token, postID, navigate, getMe }) => {
    const [message, setMessage] = useState({ content: '' });

    async function addMessage() {
        const result = await createMessage({ postID, message, token });
        getMe();
        navigate('./profile')
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            addMessage();
        }}>
            <div className="singlePostCtr">
                <input id="msgBox" type="text" cols="40" rows="5" placeholder="Enter Message" onChange={(event) => setMessage({ content: event.target.value })} />
                <button id="msgBtn" type='submit'>Send</button>
            </div>
        </form>
    )
}

const SinglePostView = ({ posts, token, navigate, getMe }) => {
    const [activateMessage, setActivateMessage] = useState(false);
    const { postID } = useParams();


    if (posts.length) {
        const [currentPost] = posts.filter(post => post._id === postID);
        const { title, description, price, location, willDeliver, updatedAt, createdAt } = currentPost;

        return (
            <div id="singlePost">
                <h1 className="pageTtl">Stranger's Thing</h1>
                <hr className="hr" />
                <h1 className='titles'>{title}</h1>
                <h3 className='titles'>Description:</h3><p className='titles'>{description}</p>
                <h3 className='titles'>Price:</h3><p className='titles'> {price}</p>
                <h3 className='titles'>Location:</h3><p className='titles'> {location}</p>
                <h3 className='titles'>Will Deliver?</h3> <p className='titles'> {willDeliver ? ('Yes') : ('No')}</p>

                <div className="singlePostCtr">
                    <button className="singleBtn" onClick={() => setActivateMessage(!activateMessage)}>Message Seller</button>
                    {
                        activateMessage && <SendMessage token={token} postID={postID} navigate={navigate} getMe={getMe} />
                    }
                    <button className="singleBtn"><Link to={`/posts`}>Back to Posts</Link></button>
                </div>
                <div className="singlePostCtr">

                    <p className="singlePostStamp">Created At: {createdAt}</p>
                    <p className="singlePostStamp">Updated At: {updatedAt}</p>
                </div>
            </div>

        )
    } else {
        return (
            <h1>Waiting for Posts...</h1>
        )
    }
}
export default SinglePostView;