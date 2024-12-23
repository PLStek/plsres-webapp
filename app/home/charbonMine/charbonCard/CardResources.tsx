"use client";

import { memo, useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useResourceFileById } from "@app/hooks/useResources";
import { Resource } from "@lib/models/resource";

type CardResourcesProps = {
    resources: Resource[];
};

const CardResources = ({ resources }: CardResourcesProps) => {
    const [download, loading, error] = useResourceFileById();
    console.log(error)

    const [checkedResources, setCheckedResources] = useState<{
        [key: number]: boolean;
    }>({});
    const handleCheckboxChange = (resourceId: number) => {
        setCheckedResources((prevState) => ({
            ...prevState,
            [resourceId]: !prevState[resourceId],
        }));
    };

    const allChecked = resources?.every(
        (resource) => checkedResources[resource.id]
    );

    console.log(resources.map(r => r.filename))

    return (
        <div className="border rounded-lg bg-[#F2F2F2]">
            <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="text-gray-500 text-left text-sm">
                    <tr>
                        <th className="px-6 py-2 font-semibold">
                            <input
                                type="checkbox"
                                checked={allChecked}
                                onChange={() => {
                                    const newCheckedResources =
                                        resources.reduce((acc, resource) => {
                                            acc[resource.id] = !allChecked;
                                            return acc;
                                        }, {});
                                    setCheckedResources(newCheckedResources);
                                }}
                            />
                        </th>
                        <th className="px-6 py-2 font-semibold">Nom</th>
                        <th className="px-6 py-2 font-semibold">Extension</th>
                        <td className="px-6">
                            {resources?.some(
                                (resource) => checkedResources[resource.id]
                            ) && <ArrowDownTrayIcon className="h-5 w-5" />}
                        </td>
                    </tr>
                </thead>
                <tbody className="divide-gray-200 text-sm text-gray-500">
                    {resources?.map((resource) => (
                        <tr key={resource.id}>
                            <td className="px-6 py-1 whitespace-nowrap">
                                <input
                                    type="checkbox"
                                    checked={!!checkedResources[resource.id]}
                                    onChange={() =>
                                        handleCheckboxChange(resource.id)
                                    }
                                    className="mr-2"
                                />
                            </td>
                            <td className="px-6 py-1 whitespace-nowrap">
                                {resource.name}
                            </td>
                            <td className="px-6 py-1 whitespace-nowrap">
                                {resource.extension}
                            </td>
                            <td className="px-6 py-1 whitespace-nowrap">
                                <button onClick={() => download(resource.id, resource.name)}>
                                    <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default memo(CardResources);
