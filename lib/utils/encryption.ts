import bcrypt from "bcrypt";

const PEPPER = process.env.PEPPER ?? "";

export const hashSecret = async (secret: number): Promise<string> => {
    if (!PEPPER) {
        throw new Error("Variables d'environnement manquantes");
    }
    const secretWithPepper = secret + PEPPER;
    return bcrypt.hash(secretWithPepper, 10);
};

export const verifySecret = async (secret: number, secretHash: string) => {
    if (!PEPPER) {
        throw new Error("Variables d'environnement manquantes");
    }
    const secretWithPepper = secret + PEPPER;
    const match = bcrypt.compare(secretWithPepper, secretHash);
    if (!match) {
        throw new Error("Wrong secret");
    }
};
