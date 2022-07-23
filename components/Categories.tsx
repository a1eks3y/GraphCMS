import * as React from 'react'
import { useEffect, useState } from 'react'
import { getCategories } from '../services'
import { ICategory } from '../types/ICategory'
import Link from 'next/link'

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<ICategory[]>([])
    useEffect(() => {
        getCategories()
            .then(newCategories => setCategories(newCategories))
    }, [])
    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Categories</h3>
            { categories.map(( category, index ) => (
                <Link key={ category.slug } href={ `/category/${ category.slug }` }>
                    <span
                        className={ `cursor-pointer block 
                        ${ (index === categories.length - 1) ? 'border-b-0' : 'border-b' } 
                        pb-3 mb-3` }>
                        { category.name }
                    </span>
                </Link>
            )) }
        </div>
    )
}

export default Categories