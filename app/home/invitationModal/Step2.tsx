import { useCreateActionneurMutation } from "@app/hooks/useActionneurs";
import { useConnectActionneur } from "@app/hooks/useAuth";

const Step2 = ({ invitationToken }: { invitationToken: string }) => {
    const [createActionneur, , ] =
        useCreateActionneurMutation();
    const [connectActionneur, , ] =
        useConnectActionneur();
    //TODO: implement loading & error

    const submit = async (formData: FormData) => {
        const username = formData.get("username") as string;
        const secret = Number(formData.get("secret"));
        await createActionneur({ username, secret, invitationToken });
        await connectActionneur(secret);
    };

    return (
        <div>
            <h4>Création de ton espace actionneur</h4>
            <br />
            <p>
                <strong>Etape 2: Création de ton espace actionneur</strong>
                <br />
                <form action={submit}>
                    <div>
                        <label htmlFor="username">Nom dutilisateur</label>
                        <input type="text" name="username" />
                        <label htmlFor="secret">Mot de passe</label>
                        <input type="password" name="secret" />
                    </div>
                    <button type="submit">Créer un lien dinvitation</button>
                </form>
            </p>
        </div>
    );
};

export default Step2;
