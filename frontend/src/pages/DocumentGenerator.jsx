import React from "react";

/*import MainLayout from "../components/layouts/MainLayout";*/
import DocumentStats from "../components/DocumentStats";
import DocumentForm from "../components/DocumentForm";
import RecentDocuments from "../components/RecentDocuments";

function DocumentGenerator() {

    ```
return (

/* <MainLayout> */

        <h2 className="text-2xl font-bold mb-6">
            Document Number Generator
        </h2>

        {/* Statistics */}

        <DocumentStats />

        {/* Generator Form */}

        <div className="mt-8">
            <DocumentForm />
        </div>

        {/* Recent Documents */}

        <div className="mt-10">
            <RecentDocuments />
        </div>

/*  </MainLayout> */

);
```

}

export default DocumentGenerator;
