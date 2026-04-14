import { ROUTES } from "./routes";

/* USER SIDEBAR */

export const SUPERADMIN_NAVIGATION = [

    {
        label: "Allowed Domains",
        path: "/admin/email-domains"   // ✅ MUST MATCH ROUTE + API
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
/* Remove these two links from the side bar
    {
        label: "Departments",
        path: ROUTES.ADMIN_DEPARTMENTS
    },

    {
        label: "Categories",
        path: ROUTES.ADMIN_CATEGORIES
    }
*/
];
