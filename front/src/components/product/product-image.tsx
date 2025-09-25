import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/image'

type Props = {
    product: {
        image: any
        title: string
    }
}

export default function ProductImage({ product }: Props) {
    if (!product || !product.image) {
        return null
    }

    return (
        <div className="flex justify-center items-center">
            <Image
                width={600}
                height={600}
                src={urlFor(product.image).url()}
                alt={product.title}
                className="rounded-lg object-cover w-full max-h-96 lg:max-h-full"
            />
        </div>
    )
}
