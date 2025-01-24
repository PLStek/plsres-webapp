import { useCreateActionneurMutation } from "@app/hooks/useActionneurs";
import {  useConnectActionneur } from "@app/hooks/useAuth";
import { Button, Form, Input } from "@nextui-org/react";

const Step2 = ({ invitationToken }: { invitationToken: string }) => {
    const [createActionneur, loadingCreateActionneur, errorCreateActionneur] =
        useCreateActionneurMutation();
    const [connectActionneur, ,] = useConnectActionneur();
    //TODO: implement loading & error

    const submit = async (formData: FormData) => {
        const username = formData.get("username") as string;
        const secret = Number(formData.get("secret"));
        await createActionneur({ username, secret, invitationToken });
        await connectActionneur(secret);
    };

    return (
        <div>
            <strong>Etape 2: Création de ton espace actionneur</strong>
            <br />
            <Form action={submit}>
                <div>
                    <Input
                        name="username"
                        label="Nom d'utilisateur"
                        size="sm"
                    />
                    <Input
                        name="secret"
                        label="Code secret"
                        size="sm"
                        minLength={4}
                        maxLength={4}
                    />
                </div>
                <Button type="submit">Créer mon espace actionneur</Button>
            </Form>
        </div>
    );
};

export default Step2;
