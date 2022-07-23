import * as React from 'react'
import { useEffect, useState } from 'react'
import { submitComment } from '../services'

const CommentsForm: React.FC<{ slug: string }> = ( { slug } ) => {
    const [error, setError] = useState<boolean>(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
    const [comment, setComment] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [storeData, setStoreData] = useState(true)
    useEffect(() => {
        setName(window.localStorage.getItem('name') || '')
        setEmail(window.localStorage.getItem('email') || '')
    }, [])
    const handleCommentSubmission = () => {
        setError(false)
        if ( !comment || !name || !email )
            return setError(true)

        if ( storeData ) {
            window.localStorage.setItem('name', name)
            window.localStorage.setItem('email', email)
        } else {
            window.localStorage.removeItem('name')
            window.localStorage.removeItem('email')
        }
        submitComment({ name, email, comment, slug }).then(() => {
            setShowSuccessMessage(true)
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        })
    }
    return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a reply</h3>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea
                    value={ comment }
                    onChange={ e => setComment(e.target.value) }
                    className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100
                text-gray-700'
                    placeholder='Comment'
                    name='comment'
                />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                <input
                    value={ name }
                    onChange={ e => setName(e.target.value) }
                    type='text'
                    className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100
                text-gray-700'
                    placeholder='Name'
                    name='name'
                />
                <input
                    value={ email }
                    onChange={ e => setEmail(e.target.value) }
                    type='text'
                    className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100
                text-gray-700'
                    placeholder='Email'
                    name='email'
                />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <div>
                    <label className='text-gray-500 cursor-pointer'>
                        <input
                            type='checkbox'
                            className='mr-2'
                            name='storeData'
                            checked={ storeData }
                            onChange={ e => setStoreData(e.target.checked) }
                        />
                        Save my e-mail and name for the next time I comment.
                    </label>
                </div>
            </div>
            { error && <p className='text-xs text-red-500'>All fields are required.</p> }
            <div className='mt-8'>
                <button
                    type='button'
                    className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg
                    rounded-full text-white px-8 py-3 cursor-pointer'
                    onClick={ handleCommentSubmission }
                >
                    Post Comment
                </button>
                { !showSuccessMessage && <span className='text-xs sm:text-xl float-right font-semibold mt-3 text-green-500'>
                    Comment submitted for review
                </span> }
            </div>
        </div>
    )
}

export default CommentsForm