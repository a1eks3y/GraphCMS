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

export interface IFeaturedPost {
    title: string
    featuredImage: {
        url: string
    }
    createdAt: string
    slug: string
    author: {
        name: string
        photo: {
            url: string
        }
    }
}

export interface ICategoryPost {
    cursor: string,
    node: {
        author: {
            bio: string,
            name: string,
            id: string,
            photo: {
                url: string
            }
        },
        createdAt: string,
        slug: string,
        title: string,
        excerpt: string,
        featuredImage: {
            url: string
        },
        categories: [
            {
                name: string,
                slug: string
            }
        ]
    }
}