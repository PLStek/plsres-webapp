"use client";

import { memo, useState } from "react";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
    useDeleteResourceMutation,
    useResourceFileById,
} from "@app/hooks/useResources";
import { Resource } from "@lib/models/resource";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import Icon from "@app/home/components/Icon";

type CardResourcesProps = {
    resources: Resource[];
    editMode?: boolean;
};

const CardResources = ({ resources, editMode = false }: CardResourcesProps) => {
    const [download, loading, error] = useResourceFileById();
    const [deleteResource] = useDeleteResourceMutation();

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

    return (
        <Table
            selectionMode="multiple"
            removeWrapper
            className="rounded-lg border border-gray-200"
            onRowAction={() => {}}
        >
            <TableHeader>
                <TableColumn>Nom</TableColumn>
                <TableColumn>Extension</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {resources?.map((resource) => (
                    <TableRow key={resource.id}>
                        <TableCell>{resource.title}</TableCell>
                        <TableCell>{resource.extension}</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <Icon
                                    onClick={() => {
                                        download(resource.id, resource.title);
                                    }}
                                >
                                    <ArrowDownTrayIcon />
                                </Icon>
                                {editMode && (
                                    <Icon
                                        onClick={() =>
                                            deleteResource(
                                                resource.id,
                                                resource.charbonId
                                            )
                                        }
                                    >
                                        <TrashIcon />
                                    </Icon>
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default memo(CardResources);
