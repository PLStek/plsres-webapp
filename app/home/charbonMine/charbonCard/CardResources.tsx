"use client";

import { memo, useState } from "react";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
    useDeleteResourceMutation,
    useResourceFileById,
} from "@app/hooks/useResources";
import { Resource } from "@lib/models/resource";
import {
    Selection,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";
import Icon from "@app/home/components/Icon";

type CardResourcesProps = {
    resources: Resource[];
    editMode?: boolean;
};

const CardResources = ({ resources, editMode = false }: CardResourcesProps) => {
    const { download } = useResourceFileById();
    const { mutate: deleteResource } = useDeleteResourceMutation();

    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

    return (
        <Table
            className="rounded-lg border border-gray-200"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            onRowAction={() => {}}
            removeWrapper
        >
            <TableHeader>
                <TableColumn>Nom</TableColumn>
                <TableColumn>Extension</TableColumn>
                <TableColumn>
                    <div className="flex gap-2">
                        <Icon
                            onClick={() => {
                                //TODO: download selected
                            }}
                            disabled={
                                selectedKeys !== "all" &&
                                selectedKeys.size === 0
                            }
                        >
                            <ArrowDownTrayIcon />
                        </Icon>
                        {editMode && (
                            <Icon
                                onClick={() => {
                                    //TODO: delete selected
                                }}
                                disabled={
                                    selectedKeys !== "all" &&
                                    selectedKeys.size === 0
                                }
                            >
                                <TrashIcon />
                            </Icon>
                        )}
                    </div>
                </TableColumn>
            </TableHeader>
            <TableBody>
                <>
                    {resources?.map((resource) => (
                        <TableRow key={resource.id}>
                            <TableCell>{resource.title}</TableCell>
                            <TableCell>
                                {resource.extension.length
                                    ? resource.extension
                                    : "-"}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Icon
                                        onClick={() => {
                                            download(
                                                resource.id,
                                                resource.title
                                            );
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
                </>
            </TableBody>
        </Table>
    );
};

export default memo(CardResources);
