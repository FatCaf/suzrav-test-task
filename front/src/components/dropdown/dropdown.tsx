import React, { useState, useRef, useEffect } from 'react'

interface DropdownProps {
    options: { label: string; value: string | null }[]
    value: string | null
    onChange: (value: string | null) => void
    placeholder: string
}

interface DropdownOptionProps {
    option: { value: string | null; label: string }
    onSelect: (option: string | null) => void
}

const DropdownOption: React.FC<DropdownOptionProps> = ({
    option,
    onSelect,
}) => {
    return (
        <li
            onClick={() => onSelect(option.value)}
            className={`cursor-pointer p-2 hover:opacity-80 bg-gray-500`}
        >
            {option.label}
        </li>
    )
}
export const CustomDropdown: React.FC<DropdownProps> = ({
    options,
    value,
    onChange,
    placeholder,
}) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selectedOption = options.find((o) => o.value === value)

    const onClick = (value: string | null) => {
        onChange(value)
    }

    return (
        <div className="relative w-64 bg-transparent" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full p-2 border rounded-md text-left"
            >
                {selectedOption ? selectedOption.value : placeholder}
            </button>

            {open && (
                <ul className="absolute z-10 w-full mt-1 border rounded-md bg-white shadow-lg overflow-auto">
                    <DropdownOption
                        option={{ value: null, label: placeholder }}
                        onSelect={onClick}
                    />
                    {options.map((option) => (
                        <DropdownOption
                            key={option.value}
                            option={option}
                            onSelect={onClick}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}
