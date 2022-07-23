import { ICategory } from './ICategory'
import { IAuthor } from './IAuthor'

export interface IPost {
    author: IAuthor
    createdAt: string
    slug: string
    title: string
    excerpt: string
    featuredImage: {
        url: string
    }
    categories: ICategory[]
}

export type IPostDetails = IPost & {
    content: {
        raw: {
            children: {
                type: string
                children: {
                    text: string
                }[]
            }[]
        }
    }
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
