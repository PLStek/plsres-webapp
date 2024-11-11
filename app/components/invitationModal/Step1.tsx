import { useAuth } from "@app/hooks/useAuth";

const Step1 = () => {
    const { connect } = useAuth();

    return (
        <div>
            <h4>Processus dinvitation</h4>
            <br />
            <p>
                <strong>Etape 1: connexion à ton compte discord</strong>
                <br />
                <button onClick={() => connect()}>Connexion</button>
            </p>
        </div>
    );
};

export default Step1;
