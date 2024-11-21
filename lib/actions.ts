"use server";

import { withAuth } from "./utils/withAuth";
import {
    createActionneurService,
    deleteActionneurService,
    getActionneurByIdService,
    getActionneursService,
    getCurrentActionneurService,
    updateActionneurService,
} from "./services/actionneur";
import {
    authenticateService,
    connectActionneurService,
    connectService,
    disconnectService,
} from "./services/auth";
import {
    createCharbonDraftService,
    deleteCharbonService,
    getCharbonByIdService,
    getCharbonsService,
    updateCharbonService,
} from "./services/charbon";
import {
    createCourseService,
    deleteCourseService,
    getCourseByIdService,
    getCoursesService,
    updateCourseService,
} from "./services/course";
import { generateActionneurInvitationLink } from "./services/invitation";
import {
    createResourceService,
    deleteResourceService,
    getResourceByIdService,
    getResourcesService,
    updateResourceService,
} from "./services/resource/resource";

export const getActionneursAction = withAuth("guest", getActionneursService);
export const getActionneurByIdAction = withAuth(
    "guest",
    getActionneurByIdService
);
export const getCurrentActionneurAction = withAuth(
    "actionneur",
    getCurrentActionneurService
);
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

export const connectAction = withAuth("guest", connectService);
export const connectActionneurAction = withAuth(
    "verified",
    connectActionneurService
);
export const disconnectAction = withAuth("verified", disconnectService);
export const authenticateAction = withAuth("guest", authenticateService);

export const getCharbonsAction = withAuth("guest", getCharbonsService);
export const getCharbonByIdAction = withAuth("guest", getCharbonByIdService);
export const createCharbonAction = withAuth(
    "actionneur",
    createCharbonDraftService
); //TODO: remove
export const updateCharbonAction = withAuth("actionneur", updateCharbonService);
export const deleteCharbonAction = withAuth("actionneur", deleteCharbonService);

export const getCoursesAction = withAuth("guest", getCoursesService);
export const getCourseByIdAction = withAuth("guest", getCourseByIdService);
export const createCourseAction = withAuth("admin", createCourseService);
export const updateCourseAction = withAuth("admin", updateCourseService);
export const deleteCourseAction = withAuth("admin", deleteCourseService);

export const getResourcesAction = withAuth("guest", getResourcesService);
export const getResourceByIdAction = withAuth("guest", getResourceByIdService);

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
