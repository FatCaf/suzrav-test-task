'use client'

type Props = {
    setParam: (key: string, value: string | null) => void
    getParam: (key: string) => string | null
}

export function SearchBar({ setParam, getParam }: Props) {
    return (
        <input
            type="text"
            placeholder="Search products..."
            defaultValue={getParam('search') || ''}
            onChange={(e) => setParam('title', e.target.value)}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
    )
}
