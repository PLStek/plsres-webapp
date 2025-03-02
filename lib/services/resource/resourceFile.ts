import { generateResourceFilePath } from "@lib/utils/files";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";

export const uploadResourceFileService = async (
    resourceId: number,
    file: File
): Promise<void> => {
    const { folderPath, filePath } = generateResourceFilePath(resourceId);

    await mkdir(folderPath, { recursive: true });
    const fileContent = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, fileContent);
};

export const deleteResourceFileService = async (
    resourceId: number
): Promise<void> => {
    const { filePath } = generateResourceFilePath(resourceId);
    await unlink(filePath);
};

export const getResourceFileService = async (
    resourceId: number
): Promise<Buffer> => {
    const { filePath } = generateResourceFilePath(resourceId);

    return readFile(filePath);
};
