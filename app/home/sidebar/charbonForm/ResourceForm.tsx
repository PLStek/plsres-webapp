"use client";

import { Input } from "@heroui/react";

const ResourceForm = () => {
    return (
        <div className="flex gap-4">
            <Input label="Nom de la ressource" size="sm"></Input>
            <Input type="file" size="md"></Input>
        </div>
    );
};

export default ResourceForm;
