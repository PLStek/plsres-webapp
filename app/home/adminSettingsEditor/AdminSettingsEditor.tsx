import { Accordion, AccordionItem, ScrollShadow } from "@heroui/react";
import CoursesSection from "./CoursesSection";
import ActionneursSection from "./ActionneursSection";
import InvitesSection from "./InvitesSection";

const AdminSettingsEditor = () => {
    return (
        <ScrollShadow className="h-full" hideScrollBar>
            <Accordion defaultExpandedKeys={["1"]} selectionMode="multiple">
                <AccordionItem key={1} title="Gestion des UE">
                    <CoursesSection />
                </AccordionItem>
                <AccordionItem key={2} title="Gestion des actionneurs">
                    <ActionneursSection />
                </AccordionItem>
                <AccordionItem key={3} title="Gestion des invitations">
                    <InvitesSection />
                </AccordionItem>
            </Accordion>
        </ScrollShadow>
    );
};

export default AdminSettingsEditor;
