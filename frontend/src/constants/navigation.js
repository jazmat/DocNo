import { ROUTES } from "./routes";

/* USER SIDEBAR */

export const SUPERADMIN_NAVIGATION = [

    {
        label: "Allowed Domains",
        path: ROUTES.ADMIN_EMAIL_DOMAINS
    }

];
export const USER_NAVIGATION = [
    {
        label: "Dashboard",
        path: ROUTES.DASHBOARD
    },
    {
        label: "History",
        path: ROUTES.HISTORY
    },
    {
        label: "Profile",
        path: ROUTES.PROFILE
    }
];
export const ADMIN_NAVIGATION = [

    {
        label: "Admin Dashboard",
        path: ROUTES.ADMIN_DASHBOARD
    },

    {
        label: "Departments",
        path: ROUTES.ADMIN_DEPARTMENTS
    },

    {
        label: "Categories",
        path: ROUTES.ADMIN_CATEGORIES
    }

];
