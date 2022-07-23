// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { gql, GraphQLClient } from 'graphql-request'

interface MyNextApiRequest extends NextApiRequest {
    body: { name: string, email: string, comment: string, slug: string }
}

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
if ( !graphqlAPI )
    throw new Error('graphqlAPI does not exist at .env')

const token = process.env.GRAPHCMS_TOKEN
if ( !token )
    throw new Error('GRAPHCMS_TOKEN does not exist at .env')

export default async function comments(
    req: MyNextApiRequest,
    res: NextApiResponse
) {
    const graphQLClient = new GraphQLClient(graphqlAPI!, {
        headers : {
            authorization : `Bearer ${ token }`
        }
    })

    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!){
            createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}){ id }
        }
    `

    await graphQLClient.request<typeof query>(query, { ...req.body })

    res.status(200).send(undefined)
}
