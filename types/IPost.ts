export interface IPost {
    author: {
        id: string
        name: string
        bio: string
        photo: {
            url: string
        }
    }
    createdAt: string
    slug: string
    title: string
    excerpt: string
    featuredImage: {
        url: string
    }
    categories: {
        name: string
        slug: string
    }[]
}
export interface IServerPost {
    node: IPost
}