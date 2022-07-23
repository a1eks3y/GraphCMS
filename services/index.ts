import { gql, request } from 'graphql-request'
import { ICategoryPost, IFeaturedPost, ILitePost, IPostDetails, IServerPost } from '../types/IPost'
import { ICategory } from '../types/ICategory'
import axios from 'axios'
import { IComment } from '../types/IComment'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
if ( !graphqlAPI )
    throw new Error('graphqlAPI does not exist at .env')

export const getPosts = async (): Promise<IServerPost[]> => {
    const query = gql`
        query GetPosts {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            id
                            name
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `
    const results = await request(graphqlAPI, query)
    return results.postsConnection.edges
}

export const getRecentPosts = async (): Promise<ILitePost[]> => {
    const query = gql`
        query GetPostDetails{
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const results = await request(graphqlAPI, query)
    return results.posts
}

export const getSimilarPosts = async ( categories: string[], slug: string ): Promise<ILitePost[]> => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]){
            posts(
                where: {slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const results = await request(graphqlAPI, query, { categories, slug })
    return results.posts
}

export const getCategories = async (): Promise<ICategory[]> => {
    const query = gql`
        query GetCategories{
            categories {
                name
                slug
            }
        }
    `
    const results = await request(graphqlAPI, query)
    return results.categories
}

export const getPostDetails = async ( slug: string ): Promise<IPostDetails> => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            posts(where: {slug: $slug}){
                author {
                    bio
                    id
                    name
                    photo {
                        url
                    }
                }
                createdAt
                slug
                title
                excerpt
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
                content {
                    raw
                }
            }
        }
    `
    const results = await request(graphqlAPI, query, { slug })
    return results.posts[ 0 ]
}

export const submitComment = async ( obj: { name: string, email: string, comment: string, slug: string } ) => {
    await axios.post('/api/comments', obj)

    return
}

export const getComments = async ( slug: string ): Promise<IComment[]> => {
    const query = gql`
        query GetComments($slug: String!){
            comments(where: { post: { slug: $slug } } ) {
                name
                comment
                createdAt
            }
        }
    `
    const results = await request(graphqlAPI, query, { slug })
    return results.comments
}

export const getFeaturedPosts = async (): Promise<IFeaturedPost[]> => {
    const query = gql`
        query GetPosts {
            posts(where: {featuredPost: true}) {
                author {
                    name
                    photo {
                        url
                    }
                }
                slug
                title
                createdAt
                featuredImage {
                    url
                }
            }
        }
    `
    const results = await request(graphqlAPI, query)
    return results.posts
}

export const getCategoryPost = async ( slug: string ): Promise<ICategoryPost[]> => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(where: {categories_some: {slug: $slug}}) {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `

    const result = await request(graphqlAPI, query, { slug })

    return result.postsConnection.edges
}