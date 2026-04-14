import React, { createContext, useContext, useEffect, useState } from "react";

import adminService from "../services/adminService";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {

    ```
const [departments, setDepartments] = useState([]);
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {

    loadSettings();

}, []);

async function loadSettings() {

    try {

        const dept = await adminService.getDepartments();
        const cat = await adminService.getCategories();

        setDepartments(dept || []);
        setCategories(cat || []);

    } catch (err) {

        console.error("Settings load error:", err);

    } finally {

        setLoading(false);

    }

}

const value = {

    departments,
    categories,
    reloadSettings: loadSettings

};

return (

    <SettingsContext.Provider value={value}>

        {!loading && children}

    </SettingsContext.Provider>

);
```

}

/* ================================
HOOK
================================ */

export function useSettings() {

    ```
return useContext(SettingsContext);
```

}
