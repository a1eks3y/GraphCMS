import * as React from 'react'
import { Author, Categories, Comments, CommentsForm, PostDetail, PostWidget } from '../../components'
import { getPostDetails } from '../../services'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { IPostDetails } from '../../types/IPost'

const PostDetails: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ( { post } ) => {
    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                <div className='col-span-1 lg:col-span-8'>
                    <PostDetail post={ post }/>
                    <Author author={ post.author }/>
                    <CommentsForm slug={ post.slug }/>
                    <Comments slug={ post.slug }/>
                </div>
                <div className='col-span-1 lg:col-span-4'>
                    <div className='relative lg:sticky top-8'>
                        <PostWidget
                            slug={ post.slug }
                            featuredImage={ post.featuredImage }
                            createdAt={ post.createdAt }
                            categories={ post.categories.map(category => category.slug) }
                            title={ post.title }
                        />
                        <Categories/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetails

export const getServerSideProps: GetServerSideProps<{ post: IPostDetails }, { slug: string }> =
    async ( { params } ) => {
        if ( !params )
            return {
                notFound : true
            }
        const post: IPostDetails = await getPostDetails(params.slug)
        if ( !post )
            return {
                notFound : true
            }
        return {
            props : { post }
        }
    }