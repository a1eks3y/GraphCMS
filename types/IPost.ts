import { ICategory } from './ICategory'

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
    categories: ICategory[]
}

export interface IServerPost {
    node: IPost
}

export interface ILitePost {
    title: string
    featuredImage: {
        url: string
    }
    createdAt: string
    slug: string
    categories: ICategory[]
}
