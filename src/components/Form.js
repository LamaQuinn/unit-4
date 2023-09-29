
// YOU WILL BE INSTRUCTED WHEN YOU SHOULD
// UNCOMMENT THIS CODE

import {useState, useContext,useRef} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import AuthContext from '../store/authContext'

const Form = () => {
    const {state} = useContext(AuthContext)
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState(true)
    
    const titleInputRef = useRef(null); 
    const contentInputRef = useRef(null);

    const handleSubmit = e => {
        alert('Post added!')
        e.preventDefault()
        
        titleInputRef.current.value = '';
        contentInputRef.current.value = '';

        axios.post('/posts', {title, content, status, userId: state.userId}, {
            headers: {
                authorization: state.token
            }
        })
            .then(() => {
                
                navigate('/profile')
                
               
                    
               

            })
            .catch(err => console.log(err))
    }

    return (
        <main>
            <form className='form add-post-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className='form-input add-post-input'
                    ref={titleInputRef}
                />
                <textarea
                    type='text'
                    placeholder='content'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className='form-input add-post-input textarea'
                    ref={contentInputRef}
                />
                <div className='flex-row status-container'>
                    <div className='radio-btn'>
                        <label htmlFor='private-status'>
                            private:
                        </label>
                        <input
                            type='radio'
                            name='status'
                            id='private-status'
                            value={true}
                            onChange={e => setStatus(e.target.value)}
                            checked={true}
                        />
                    </div>
                    <div className='radio-btn'>
                        <label htmlFor='public-status'>
                            public:
                        </label>
                        <input
                            type='radio'
                            name='status'
                            id='public-status'
                            value={false}
                            onChange={e => setStatus(e.target.value)}
                        />
                    </div>
                </div>
                <button className='form-btn'>submit</button>
            </form>
        </main>
    )
}

export default Form