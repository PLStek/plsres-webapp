"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useCreateResourceMutation } from "@app/hooks/useResources";

type ResourceFormProps = {
    charbonId: number;
};

const ResourceForm = ({ charbonId }: ResourceFormProps) => {
    const { mutate: createResource } = useCreateResourceMutation();

    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async () => {
        if (!title || !file) return;
        createResource({
            title,
            file,
            charbonId,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-evenly">
                <Input
                    label="Nom de la ressource"
                    size="sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    label="Fichier de la ressource"
                    type="file"
                    size="sm"
                    onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        setFile(file || null);
                    }}
                />
            </div>
            <Button type="button" onPress={handleSubmit}>
                Ajouter
            </Button>
        </div>
    );
};

export default ResourceForm;
