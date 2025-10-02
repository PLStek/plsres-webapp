import {
    useActionneurInvitesQuery,
    useCreateActionneurInviteMutation,
    useDeleteActionneurInvitesMutation,
} from "@app/hooks/useInvites";
import {
    addToast,
    Button,
    Input,
    Selection,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";
import { useState } from "react";
import Icon from "../components/Icon";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";

const InvitesSection = () => {
    const { data: invites } = useActionneurInvitesQuery();
    const { mutate: createInvite, error: errorCreateInvite } =
        useCreateActionneurInviteMutation();
    const { mutate: deleteInvites } = useDeleteActionneurInvitesMutation();

    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [discordIdInput, setDiscordIdInput] = useState<string>("");

    const copyLink = async (link: string) => {
        navigator.clipboard.writeText(link);
        addToast({
            title: "Lien d'invitation copié",
            color: "success",
        });
    };

    const onGenerateLink = async () => {
        const invite = await createInvite(discordIdInput);
        if (invite) {
            setDiscordIdInput("");
            copyLink(invite.link);
        }
    };

    const deleteSelectedInvites = async () => {
        const ids =
            selectedKeys === "all"
                ? (invites || []).map((invite) => invite.id)
                : Array.from(selectedKeys).map((id) => parseInt(`${id}`));
        await deleteInvites(ids);
        setSelectedKeys(new Set());
    };

    return (
        <div>
            <div className="flex gap-4">
                <Input
                    label="Discord ID"
                    size="sm"
                    isInvalid={!!errorCreateInvite}
                    errorMessage={errorCreateInvite}
                    onChange={(e) => setDiscordIdInput(e.target.value)}
                    value={discordIdInput}
                />
                <Button type="submit" onPress={onGenerateLink}>
                    <div className="mx-2">Générer l'invitation</div>
                </Button>
            </div>
            <Table
                shadow="none"
                className="rounded-lg border border-b-gray-200"
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                removeWrapper
                onRowAction={() => {}}
            >
                <TableHeader>
                    <TableColumn>ID Discord</TableColumn>
                    <TableColumn>Expiration</TableColumn>
                    <TableColumn>
                        <div className="flex gap-2">
                            <Icon
                                onClick={deleteSelectedInvites}
                                disabled={
                                    selectedKeys !== "all" &&
                                    selectedKeys.size === 0
                                }
                            >
                                <TrashIcon />
                            </Icon>
                        </div>
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {(invites || []).map((invite) => (
                        <TableRow key={invite.id}>
                            <TableCell>{invite.discordId}</TableCell>
                            <TableCell>
                                {invite.expiresAt.toDateString()}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Icon
                                        onClick={() => {
                                            deleteInvites([invite.id]);
                                        }}
                                    >
                                        <TrashIcon />
                                    </Icon>
                                    <Icon
                                        onClick={() => {
                                            copyLink(invite.link);
                                        }}
                                    >
                                        <DocumentDuplicateIcon />
                                    </Icon>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default InvitesSection;
