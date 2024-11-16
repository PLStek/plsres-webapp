import path from "path";

export function generateResourceFilePath(
    charbonId: number,
    resourceId: number
): { folderPath: string; filePath: string } {
    const folderPath = path.join(
        process.cwd(),
        "uploads",
        charbonId.toString()
    );
    const fileName = resourceId.toString();
    const filePath = path.join(folderPath, fileName);

    return { folderPath, filePath };
}
