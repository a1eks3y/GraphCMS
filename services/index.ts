import { request, gql } from 'graphql-request'
import { ILitePost, IServerPost } from '../types/IPost'
import { ICategory } from '../types/ICategory'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
if(!graphqlAPI)
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

export const getSimilarPosts = async ( categories: ICategory[], slug: string ): Promise<ILitePost[]> => {
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
