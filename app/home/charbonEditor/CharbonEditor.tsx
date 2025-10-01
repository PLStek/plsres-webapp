"use client";

import { FullCharbon } from "@lib/models/charbon";
import CardResources from "@app/home/charbonMine/charbonCard/CardResources";
import { useResourcesByCharbonIdQuery } from "@app/hooks/useResources";
import {
    Accordion,
    AccordionItem,
    Alert,
    Button,
    CircularProgress,
    ScrollShadow,
} from "@heroui/react";
import ResourceForm from "./ResourceForm";
import { CharbonForm } from "./CharbonForm";
import { memo } from "react";
import { useUpdateCharbonMutation } from "@app/hooks/useCharbons";
import { formatDate } from "@app/helpers/formatDate";

type CharbonEditorProps = {
    defaultCharbon: FullCharbon;
};

const CharbonEditor = ({ defaultCharbon }: CharbonEditorProps) => {
    const { data: resources, loading: loadingResources } =
        useResourcesByCharbonIdQuery(defaultCharbon.id);

    const { mutate: updateCharbon } = useUpdateCharbonMutation();

    const publishCharbon = () => {
        updateCharbon(defaultCharbon.id, {
            isDraft: false,
        });
    };

    return (
        <div className="flex flex-col justify-between h-full">
            <ScrollShadow className="h-full" hideScrollBar>
                {defaultCharbon.status === "SCHEDULED" && (
                    <Alert
                        color="default"
                        description={`Charbon planifié pour le ${formatDate(
                            defaultCharbon.timestamp
                        )}`}
                        variant="faded"
                    />
                )}
                {defaultCharbon.status === "ONGOING" && (
                    <Alert
                        color="success"
                        description={`Charbon en cours !`}
                        variant="faded"
                    />
                )}
                {defaultCharbon.status === "FINISHED" && (
                    <Alert
                        color="default"
                        description={`Ce charbon a eu lieu le ${formatDate(
                            defaultCharbon.timestamp,
                            false
                        )}`}
                        variant="faded"
                    />
                )}
                {defaultCharbon.isDraft && (
                    <Alert
                        classNames={{
                            description: "text-yellow-600",
                            alertIcon: "text-yellow-600",
                            base: "border-default-600",
                        }}
                        color="warning"
                        description="Ce charbon est toujours en mode brouillon"
                        variant="faded"
                        endContent={
                            <Button
                                variant="ghost"
                                className="text-yellow-600   border-2"
                                color="warning"
                                onPress={publishCharbon}
                            >
                                Publier
                            </Button>
                        }
                    />
                )}
                {defaultCharbon.isCancelled && (
                    <Alert
                        color="danger"
                        description="Charbon annulé"
                        variant="faded"
                    />
                )}
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
                                                editMode={
                                                    !defaultCharbon.isCancelled
                                                }
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
                    <AccordionItem
                        key={3}
                        title="Ajouter des ressources"
                        isDisabled={defaultCharbon.isCancelled}
                    >
                        <ResourceForm charbonId={defaultCharbon.id} />
                    </AccordionItem>
                </Accordion>
            </ScrollShadow>
        </div>
    );
};

export default memo(CharbonEditor);
