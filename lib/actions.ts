"use server";

import { withAuth } from "./utils/withAuth";
import {
    createActionneurService,
    deleteActionneurService,
    getActionneurByIdService,
    getActionneursService,
    updateActionneurService,
} from "./services/actionneur";
import {
    authenticateService,
    connectActionneurService,
    connectFromDiscordIdService,
    connectService,
    disconnectService,
    refreshAuthService,
} from "./services/auth";
import {
    deleteCharbonService,
    getCharbonsGroupedByMonthService,
    getFullCharbonByIdService,
    updateCharbonService,
} from "./services/charbon/charbon";
import {
    createCourseService,
    deleteCourseService,
    getCoursesService,
    updateCourseService,
} from "./services/course";
import {
    deleteActionneurInvitesService,
    generateActionneurInviteLink,
    getActionneurInvitesService,
} from "./services/invite";
import {
    createResourceService,
    deleteResourceService,
    getResourcesByCharbonIdService,
    getResourceByIdService,
    updateResourceService,
} from "./services/resource/resource";

// Actionneur

export const getActionneursAction = withAuth("guest", getActionneursService);
export const getActionneurByIdAction = withAuth(
    "guest",
    getActionneurByIdService
);
/* export const getCurrentActionneurAction = withAuth(
    "actionneur",
    getCurrentActionneurService
); */
export const createActionneurAction = withAuth(
    "guest",
    createActionneurService
);
export const updateActionneurAction = withAuth(
    "actionneur",
    updateActionneurService
);
export const deleteActionneurAction = withAuth(
    "admin",
    deleteActionneurService
);

export const getActionneurInvitesAction = withAuth(
    "admin",
    getActionneurInvitesService
);

export const createActionneurInviteAction = withAuth(
    "admin",
    generateActionneurInviteLink
);

export const deleteActionneurInvitesAction = withAuth(
    "admin",
    deleteActionneurInvitesService
);
/* export const checkActionneurInviteTokenAction = withAuth(
    "guest",
    generateActionneurInviteLink
);
 */
// Auth

export const connectAction = withAuth("guest", connectService);
export const connectFromDiscordIdAction = withAuth(
    "guest",
    connectFromDiscordIdService
);
export const connectActionneurAction = withAuth(
    "verified",
    connectActionneurService
);
export const disconnectAction = withAuth("verified", disconnectService);
export const authenticateAction = withAuth("guest", authenticateService);
export const refreshAuthAction = withAuth("verified", refreshAuthService);

// Charbon

export const getCharbonsGroupedByMonthAction = withAuth(
    "guest",
    getCharbonsGroupedByMonthService
);
export const getFullCharbonByIdAction = withAuth(
    "actionneur",
    getFullCharbonByIdService
);
export const updateCharbonAction = withAuth("actionneur", updateCharbonService);
export const deleteCharbonAction = withAuth("actionneur", deleteCharbonService);

// Course

export const getCoursesAction = withAuth("guest", getCoursesService);
export const createCourseAction = withAuth("admin", createCourseService);
export const updateCourseAction = withAuth("admin", updateCourseService);
export const deleteCourseAction = withAuth("admin", deleteCourseService);

// Resource

export const getResourceByIdAction = withAuth(
    "verified",
    getResourceByIdService
);
export const getResourcesByCharbonIdAction = withAuth(
    "verified",
    getResourcesByCharbonIdService
);

export const createResourceAction = withAuth(
    "actionneur",
    (formData: FormData) => {
        const charbonId = Number(formData.get("charbonId"));
        const file = formData.get("file") as File;
        const title = formData.get("title") as string;
        if (!file) {
            throw new Error("Le fichier est manquant");
        }
        return createResourceService({ file, charbonId, title });
    }
);
export const updateResourceAction = withAuth(
    "actionneur",
    updateResourceService
);
export const deleteResourceAction = withAuth(
    "actionneur",
    deleteResourceService
);
