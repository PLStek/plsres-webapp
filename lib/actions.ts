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
    connectService,
    disconnectService,
} from "./services/auth";
import {
    deleteCharbonService,
    getCharbonByIdService,
    getCharbonByIdWithDraftService,
    getCharbonsGroupedByMonthService,
    updateCharbonService,
} from "./services/charbon/charbon";
import {
    createCourseService,
    deleteCourseService,
    getCoursesService,
    updateCourseService,
} from "./services/course";
import { generateActionneurInvitationLink } from "./services/invitation";
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
export const createActionneurInviteAction = withAuth(
    "admin",
    generateActionneurInvitationLink
);
export const checkActionneurInviteTokenAction = withAuth(
    "guest",
    generateActionneurInvitationLink
);

// Auth

export const connectAction = withAuth("guest", connectService);
export const connectActionneurAction = withAuth(
    "verified",
    connectActionneurService
);
export const disconnectAction = withAuth("verified", disconnectService);
export const authenticateAction = withAuth("guest", authenticateService);

// Charbon

export const getCharbonsGroupedByMonthAction = withAuth(
    "guest",
    getCharbonsGroupedByMonthService
);
export const getCharbonByIdAction = withAuth(
    "actionneur",
    getCharbonByIdService
);
export const getCharbonByIdWithDraftAction = withAuth(
    "actionneur",
    getCharbonByIdWithDraftService
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
    createResourceService
);
export const updateResourceAction = withAuth(
    "actionneur",
    updateResourceService
);
export const deleteResourceAction = withAuth(
    "actionneur",
    deleteResourceService
);
