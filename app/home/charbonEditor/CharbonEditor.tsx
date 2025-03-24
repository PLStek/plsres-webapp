"use client";

import { Charbon, CharbonUpdateInput } from "@lib/models/charbon";
import { useUpdateCharbonMutation } from "@app/hooks/useCharbons";
import CardResources from "@app/home/charbonMine/charbonCard/CardResources";
import { useResourcesByCharbonIdQuery } from "@app/hooks/useResources";
import {
    Accordion,
    AccordionItem,
    Button,
    CircularProgress,
    ScrollShadow,
} from "@heroui/react";
import ResourceForm from "./ResourceForm";
import { CharbonForm } from "./CharbonForm";
import { useEditCharbonDrawer } from "../modals/editCharbonDrawer/EditCharbonDrawer";

type CharbonEditorProps = {
    defaultCharbon: Charbon;
};

const CharbonEditor = ({ defaultCharbon }: CharbonEditorProps) => {
    const { onClose } = useEditCharbonDrawer();
    const [resources, loadingResources] = useResourcesByCharbonIdQuery(
        defaultCharbon.id
    );

    const [updateCharbon, loading] = useUpdateCharbonMutation();

    const submit = async (formData: FormData) => {
        const charbon: CharbonUpdateInput = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            courseId: Number(formData.get("courseId")),
            actionneurIds: Array.from(formData.getAll("actionneurIds")).map(
                Number
            ),
            isDraft: false,
        };
        await updateCharbon(defaultCharbon.id, charbon);
        onClose();
    };

    return (
        <form action={submit} className="flex flex-col justify-between  h-full">
            <ScrollShadow className="h-full" hideScrollBar>
                <Accordion
                    defaultExpandedKeys={["1"]}
                    selectionMode="multiple"
                    className="flex-grow"
                >
                    <AccordionItem key={1} title="Données du charbon">
                        <div className="mb-4">
                            <CharbonForm defaultCharbon={defaultCharbon} />
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key={2}
                        title="Ressources"
                        isDisabled={loadingResources || !resources?.length}
                    >
                        <div className="flex flex-col gap-4 mb-4">
                            {defaultCharbon.resourcesCount > 0 && (
                                <div>
                                    {!loadingResources &&
                                        !!resources?.length && (
                                            <CardResources
                                                resources={resources}
                                                editMode
                                            />
                                        )}
                                    {loadingResources && (
                                        <div className="w-full flex justify-center my-4">
                                            <CircularProgress label="Chargement des ressources" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </AccordionItem>
                    <AccordionItem key={3} title="Ajouter des ressources">
                        <ResourceForm charbonId={defaultCharbon.id} />
                    </AccordionItem>
                </Accordion>
            </ScrollShadow>
            <div className="flex justify-evenly gap-4 mt-2">
                <Button
                    type="button"
                    disabled={loading}
                    onPress={onClose}
                    size="md"
                    fullWidth
                >
                    {loading ? "Loading..." : "Annuler"}
                </Button>
                <Button type="reset" disabled={loading} size="md" fullWidth>
                    {loading ? "Loading..." : "Réinitialiser"}
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                    fullWidth
                    size="md"
                    isLoading={loading}
                >
                    {defaultCharbon.isDraft ? "Publier" : "Editer"}
                </Button>
            </div>
        </form>
    );
};

export default CharbonEditor;
