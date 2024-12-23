import path from "path";

export function generateResourceFilePath(resourceId: number): {
    folderPath: string;
    filePath: string;
} {
    const folderPath = path.join(process.cwd(), "uploads");
    const fileName = resourceId.toString();
    const filePath = path.join(folderPath, fileName);

    return { folderPath, filePath };
}
