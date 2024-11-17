import { generateResourceFilePath } from "@lib/utils/files";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";

export const uploadResourceFileService = async (
    charbonId: number,
    resourceId: number,
    file: File
): Promise<void> => {
    const { folderPath, filePath } = generateResourceFilePath(
        charbonId,
        resourceId
    );

    await mkdir(folderPath, { recursive: true });
    const fileContent = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, fileContent);
};

export const deleteResourceFileService = async (
    charbonId: number,
    resourceId: number
): Promise<void> => {
    const { filePath } = generateResourceFilePath(charbonId, resourceId);
    await unlink(filePath);
};

export const getResourceFileService = async (
    resourceId: number,
    charbonId: number
): Promise<Buffer> => {
    const { filePath } = generateResourceFilePath(charbonId, resourceId);

    return readFile(filePath);
};
