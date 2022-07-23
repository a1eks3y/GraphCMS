import * as React from 'react'
import { Categories, Loader, PostCard } from '../../components'
import { getCategories, getCategoryPost } from '../../services'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { ICategoryPost } from '../../types/IPost'
import Head from 'next/head'
import { ICategory } from '../../types/ICategory'

const CategoryPost: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
    ( { posts, category } ) => {
        if ( !posts ) {
            return <Loader/>
        }

        return (
            <>
                <Head>
                    <title>CMS Blog - { category?.name }</title>
                </Head>
                <div className='container mx-auto px-10 mb-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                        <div className='col-span-1 lg:col-span-8'>
                            { posts.map(( post, index ) => (
                                <PostCard key={ index } post={ post.node }/>
                            )) }
                        </div>
                        <div className='col-span-1 lg:col-span-4'>
                            <div className='relative lg:sticky top-8'>
                                <Categories/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
export default CategoryPost

export const getServerSideProps: GetServerSideProps<{ posts: ICategoryPost[], category: ICategory }, { slug: string }> =
    async ( { params } ) => {
        if ( !params )
            return {
                notFound : true
            }
        const categories = await getCategories()
        if ( !categories.some(val => val.slug === params.slug) )
            return {
                notFound : true
            }
        const posts: ICategoryPost[] = await getCategoryPost(params.slug)
        return {
            props : {
                posts,
                category : categories.find(el => el.slug === params.slug)!
            }
        }
    }