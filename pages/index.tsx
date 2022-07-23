import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Categories, PostCard, PostWidget } from '../components'
import { getPosts } from '../services'
import { IServerPost } from '../types/IPost'
import { FeaturedPosts } from '../sections'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ( { posts } ) => {
    return (
        <div className='container mx-auto px-4 lg:px-10 mb-8'>
            <Head>
                <title>CMS Blog</title>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <FeaturedPosts/>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                <div className='lg:col-span-8 col-span-1'>
                    {
                        posts.map(( post ) => (
                            <PostCard post={ post.node } key={ post.node.title }/>
                        ))
                    }
                </div>
                <div className='lg:col-span-4 col-span-1'>
                    <div className='lg:sticky relative top-8'>
                        <PostWidget slug={ null }/>
                        <Categories/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

export const getStaticProps: GetStaticProps<{ posts: IServerPost[] }> = async () => {
    const posts = (await getPosts()) || []
    return {
        props : { posts }
    }
}
