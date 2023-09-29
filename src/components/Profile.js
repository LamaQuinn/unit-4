
// YOU WILL BE INSTRUCTED WHEN YOU SHOULD
// UNCOMMENT THIS CODE

import {useContext, useEffect, useState, useCallback} from 'react'
import axios from 'axios'


import AuthContext from '../store/authContext'

const Profile = () => {
    const {state} = useContext(AuthContext)

    const [posts, setPosts] = useState([])



    const getUserPosts = useCallback(() => {
        axios.get(`/userposts/${state.userId}`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
    }, [state.userId])

    useEffect(() => {
        getUserPosts()
    }, [getUserPosts])

    const updatePost = (id, status) => {
        alert('Updated!')
        
        axios.put(`/posts/${id}`, {status: !status}, {
            headers: {
                authorization: state.token
            }
        })
            .then(() => {
                getUserPosts()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deletePost = id => {
        alert('Deleted!')
        // window.location.href = '/profile';
        axios.delete(`/posts/${id}`, {
            headers: {
                authorization: state.token
            }
        })
            .then(() => {
                
                setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
            })
            .catch(err => {
                console.log(err)
            })
    }

    const mappedPosts = posts.map(post => {
        return (
            <div key={post.id} className='post-card'>
                <h2>{post.title}</h2>
                <h4>{post.user.username}</h4>
                <p>{post.content}</p>
                {
                    state.userId === post.userId &&
                    <div>
                        <button className='form-btn' onClick={() => updatePost(post.id, post.privateStatus)}>
                            {post.privateStatus ? 'make public' : 'make private'}
                        </button>
                        <button className='form-btn' style={{marginLeft: 10}} onClick={() => deletePost(post.id)}>
                            delete post
                        </button>
                    </div>
                }
            </div>
        )
    })

    return mappedPosts.length >= 1 ? (
        <main>
            {mappedPosts}
        </main>
    ) : (
        <main>
            <h1>Profile !</h1>
            <h2>No any posts.</h2>
        </main>
    )
}

export default Profile