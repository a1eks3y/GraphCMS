import { request, gql } from 'graphql-request'
import { IServerPost } from '../types/IPost'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async (): Promise<IServerPost[]> => {
    const query = gql`
        query MyQuery {
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
    const results = await request(graphqlAPI as string, query)
    return results.postsConnection.edges
}