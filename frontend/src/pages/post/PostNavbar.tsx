import React from 'react'
import { Link } from 'react-router-dom'
export const PostNavbar: React.FC = () => {
    return (
        <div className='PostNavbar'>
            <div><Link to='/create-post' className='text-decoration-none'>Create Post</Link></div>
            <div><Link to='/' className='text-decoration-none'>News</Link></div>
            <div><Link to='/' className='text-decoration-none'>Entertainment</Link></div>
            <div><Link to='/' className='text-decoration-none'>Politics</Link></div>
        </div>
    )
}

