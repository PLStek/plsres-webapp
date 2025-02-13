import bcrypt from "bcrypt";
import { ErrorMessages } from "./errorMessages";

const PEPPER = process.env.PEPPER ?? "";

export const hashSecret = async (secret: string): Promise<string> => {
    const secretWithPepper = secret + PEPPER;
    return bcrypt.hash(secretWithPepper, 10);
};

export const verifySecret = async (secret: string, secretHash: string) => {
    const secretWithPepper = secret + PEPPER;
    const match = await bcrypt.compare(secretWithPepper, secretHash);
    if (!match) {
        throw new Error(ErrorMessages.InvalidCode);
    }
};
