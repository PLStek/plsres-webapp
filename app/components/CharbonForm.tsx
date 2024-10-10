import { CharbonCreateInput } from "@/lib/models/charbon";
import { createCharbonService } from "@/lib/services/charbonService";

export default function CharbonForm() {
    const addCharbon = async (formData: FormData) => {
        'use server';
        const charbon: CharbonCreateInput = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            timestamp: new Date(formData.get("timestamp") as string),
            courseId: Number(formData.get("courseId")),
            actionneurIds: [],
        };
        await createCharbonService(charbon);
    }

    return (
        <form action={addCharbon}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" />
            <label htmlFor="timestamp">Timestamp</label>
            <input type="datetime-local" name="timestamp" id="timestamp" />
            <label htmlFor="courseId">Course ID</label>
            <input type="number" name="courseId" id="courseId" />
            <label htmlFor="actionneurIds">Actionneur IDs</label>
            <input type="number" name="actionneurIds" id="actionneurIds" />
            <button>Add Charbon</button>
        </form>
    );
}