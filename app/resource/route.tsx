import { NextResponse } from "next/server";
import { getResourceFileService } from "@lib/services/resource/resourceFile";
import { getResourceByIdService } from "@lib/services/resource/resource";
import { checkAuthService } from "@lib/services/auth";
import mime from "mime";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const resourceId = url.searchParams.get("id");
    const parsedResourceId = parseInt(resourceId ?? "", 10);

    if (isNaN(parsedResourceId)) {
        return NextResponse.json(
            { success: false, error: "Invalid Resource ID" },
            { status: 400 }
        );
    }

    if (!checkAuthService()) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    const resource = await getResourceByIdService(parsedResourceId);
    if (!resource) {
        return NextResponse.json(
            { success: false, error: "Resource not found" },
            { status: 404 }
        );
    }

    try {
        const fileBuffer = await getResourceFileService(resource.id); // Replace by stream ?

        const mimeType =
            mime.getType(resource.extension) || "application/octet-stream";

        return new Response(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": mimeType,
                "Content-Disposition": `attachment; filename="${resource.title}.${resource.extension}"`,
            },
        });
    } catch (error) {
        console.error("Error downloading file:", error);
        return NextResponse.json(
            { success: false, error: "Resource file not found" },
            { status: 500 }
        );
    }
}
