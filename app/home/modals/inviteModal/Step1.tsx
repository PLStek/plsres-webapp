import { useConnect } from "@app/hooks/useAuth";
import { Button } from "@heroui/react";

const Step1 = () => {
    const [connect] = useConnect();

    return (
        <div>
            <h4>Processus d'invitation</h4>
            <br />
            <p>
                <strong>Etape 1: connexion à ton compte discord</strong>
                <br />
                <Button onPress={() => connect()}>Connexion</Button>
            </p>
        </div>
    );
};

export default Step1;
