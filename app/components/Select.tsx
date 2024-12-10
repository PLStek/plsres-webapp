type SelectProps<T extends number | string> = {
    options: { value: T; name: string }[];
    value: T;
    onChange: (e: T | null) => void;
    label?: string;
    placeholder?: string;
    className?: string;
};

export const Select = <T extends number | string>({
    options,
    value,
    onChange,
    label,
    placeholder,
    className,
}: SelectProps<T>) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <select
                value={value}
                onChange={(e) => onChange((e.target.value || null) as T | null)}
                className={"border-gray-300 rounded-md py-1 px-4 w-full " + className}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
