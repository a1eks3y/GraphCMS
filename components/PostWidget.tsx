import * as React from 'react'
import Link from 'next/link'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { ILitePost } from '../types/IPost'
import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget: React.FunctionComponent<ILitePost | { slug: null }> = ( props ) => {
    const [relatedPosts, setRelatedPosts] = useState<ILitePost[]>([])
    useEffect(() => {
        if ( props?.slug ) {
            getSimilarPosts(props.categories, props.slug)
                .then(res => setRelatedPosts(res))
        } else {
            getRecentPosts()
                .then(res => setRelatedPosts(res))
        }
    }, [props?.slug])
    console.log(relatedPosts)
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                { props.slug ? 'Related Posts' : 'Recent Posts' }
            </h3>
            { relatedPosts.map(post => (
                <div key={ post.title } className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none">
                        <img
                            height="60px"
                            width="60px"
                            src={ post.featuredImage.url }
                            alt={ post.title }
                            className="align-middle rounded-full"
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">
                            { moment(post.createdAt).format('MMM DD, YYYY') }
                        </p>
                        <Link href={ `/post/${ post.slug }` } className="text-md">
                            { post.title }
                        </Link>
                    </div>
                </div>
            )) }
        </div>
    )
}

export default PostWidget