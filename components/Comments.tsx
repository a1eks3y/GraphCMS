import * as React from 'react'
import { useEffect, useState } from 'react'
import { getComments } from '../services'
import { IComment } from '../types/IComment'
import moment from 'moment'
import parse from 'html-react-parser'

const Comments: React.FC<{ slug: string }> = ( { slug } ) => {
    const [comments, setComments] = useState<IComment[]>([])

    useEffect(() => {
        getComments(slug)
            .then(res => setComments(res))
    }, [])

    return (
        <>
            { comments.length > 0 && (
                <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
                    <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                        { comments.length + ' ' } Comments
                    </h3>
                    { comments.map(comment => (
                        <div key={ comment.createdAt } className='mb-4 pb-4'>
                            <p className='mb-4'>
                                <span className='font-semibold'>{ comment.name }</span>
                                { ' ' }
                                on
                                { ' ' }
                                { moment(comment.createdAt).format('MMM DD, YYYY') }
                            </p>
                            <p className='whitespace-pre-line text-gray-600 w-full'>
                                { parse(comment.comment) }
                            </p>
                        </div>
                    )) }
                </div>
            ) }
        </>
    )
}

export default Comments