import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';
import {
    Navbar,
    Posts,
    Profile,
    Home,
    Register,
    Login,
    CreatePost,
    SinglePostView,
    EditPost
} from './components';

import {
    getPosts,
    getUserDetails
} from './api';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    //   console.log(token)

    function logout() {
        window.localStorage.removeItem('token');
        setToken('');
        setUser({});
    }

    async function fetchPosts() {
        const results = await getPosts(token)
        setPosts(results.data.posts);
    }

    async function getMe() {
        const storedToken = window.localStorage.getItem('token');
        if (!token) {
            if (storedToken) {
                setToken(storedToken);
            }
            return;
        }
        const results = await getUserDetails(token)
        if (results.success) {
            setUser(results.data);
        } else {
            console.log(results.error.message);
        }

    }

    useEffect(() => {
        fetchPosts()
    }, [token])

    useEffect(() => {
        //This fires once on initial load
        getMe();
    }, [token])

    return (
        <div>
            <Navbar logout={logout} token={token} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/posts' element={<Posts token={token} posts={posts} fetchPosts={fetchPosts} navigate={navigate} />} />
                <Route exact path='/posts/create-post' element={<CreatePost token={token} fetchPosts={fetchPosts} navigate={navigate} />} />
                <Route exact path='/posts/edit-post/:postID' element={<EditPost posts={posts} token={token} fetchPosts={fetchPosts} navigate={navigate} />} />
                <Route path='/posts/:postID' element={<SinglePostView token={token} posts={posts} navigate={navigate} getMe={getMe} />} />
                <Route path='/profile' element={<Profile user={user} navigate={navigate} />} />
                <Route path='/register' element={<Register setToken={setToken} token={token} navigate={navigate} />} />
                <Route path='/login' element={<Login setToken={setToken} navigate={navigate} />} />
            </Routes>
        </div>
    )
}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
