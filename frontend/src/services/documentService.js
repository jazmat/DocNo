import api, { API } from "./api";

const documentService = {

```
/* ================================
   Preview Document Number
================================ */

preview: async (departmentId, categoryId) => {

    const res = await api.get(API.DOCUMENT_PREVIEW, {
        params: {
            department_id: departmentId,
            category_id: categoryId
        }
    });

    return res.data;

},

/* ================================
   Generate Document
================================ */

generate: async (data) => {

    const res = await api.post(API.DOCUMENT_GENERATE, data);

    return res.data;

},

/* ================================
   Document History
================================ */

history: async () => {

    const res = await api.get(API.DOCUMENT_HISTORY);

    return res.data;

},

/* ================================
   Document Stats
================================ */

stats: async () => {

    const res = await api.get(API.DOCUMENT_STATS);

    return res.data;

}
```

};

export default documentService;
