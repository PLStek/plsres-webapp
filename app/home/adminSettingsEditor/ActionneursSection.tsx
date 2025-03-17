import {
    useActionneursQuery,
    useUpdateActionneurMutation,
} from "@app/hooks/useActionneurs";
import {
    Switch,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";

const ActionneursSection = () => {
    const [actionneurs, ,] = useActionneursQuery();
    const [updateActionneur, ,] = useUpdateActionneurMutation();

    const updateActionneurActive = (id: number, isActive: boolean) => {
        updateActionneur(id, { isActive });
    };

    const updateActionneurAdmin = (id: number, isAdmin: boolean) => {
        updateActionneur(id, { isAdmin });
    };

    return (
        <Table
            shadow="none"
            className="rounded-lg border border-b-gray-200"
            removeWrapper
            onRowAction={() => {}}
            /*  bottomContent={
                        <div className="flex w-full justify-center mb-2">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="default"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    } */
        >
            <TableHeader>
                <TableColumn>Nom</TableColumn>
                <TableColumn>Id discord</TableColumn>
                <TableColumn>Actif</TableColumn>
                <TableColumn>Admin</TableColumn>
            </TableHeader>
            <TableBody>
                {actionneurs.map(
                    (
                        actionneur //TODO: replace discord id with discord username
                    ) => (
                        <TableRow key={actionneur.id}>
                            <TableCell>{actionneur.username}</TableCell>
                            <TableCell>{actionneur.discordId}</TableCell>
                            <TableCell>
                                <Switch
                                    size="sm"
                                    isSelected={actionneur.isActive}
                                    onValueChange={(isActive) =>
                                        updateActionneurActive(
                                            actionneur.id,
                                            isActive
                                        )
                                    }
                                ></Switch>
                            </TableCell>
                            <TableCell>
                                <Switch
                                    size="sm"
                                    isSelected={actionneur.isAdmin}
                                    onValueChange={(isAdmin) =>
                                        updateActionneurAdmin(
                                            actionneur.id,
                                            isAdmin
                                        )
                                    }
                                ></Switch>
                            </TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    );
};

export default ActionneursSection;
