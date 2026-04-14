import React, { useState, useEffect } from "react";
import api from "../services/api";

function DocumentForm() {

    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [category, setCategory] = useState("");

    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);

    const [preview, setPreview] = useState("");

    useEffect(() => {

        loadDropdowns();

    }, []);
    useEffect(() => {
        previewNumber();
    }, [department, category]);
    const loadDropdowns = async () => {

        const dept = await api.get("/admin/departments");
        const cat = await api.get("/admin/categories");

        setDepartments(dept.data || []);
        setCategories(cat.data || []);

    };

    const previewNumber = async () => {

        if (!department || !category) return;

        const res = await api.get("/documents/preview", {
            params: {
                department_id: department,
                category_id: category
            }
        });

        setPreview(res.data.preview);

    };

    const generate = async () => {

        const res = await api.post("/documents/generate", {
            title,
            department_id: department,
            category_id: category
        });

        alert("Generated: " + res.data.document_number);

    };

    return (

        <div className="max-w-xl space-y-4">

            <input
                type="text"
                placeholder="Document Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
            />

            <select
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border p-2 rounded"
            >
                <option>Select Department</option>

                {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                        {d.name}
                    </option>
                ))}

            </select>

            <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded"
            >
                <option>Select Category</option>

                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}

            </select>

    {/*     <button
                onClick={previewNumber}
                className="bg-green-300 text-blue-600 px-4 py-2 rounded"
            >
                Preview
            </button>
 */} 
            {preview && (
                <div className="p-3 bg-green-100 rounded">
                    <b>Preview:</b> {preview}
                </div>
            )} 

{/* <button
                onClick={generate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Generate
            </button>
*/}
            <button
                type="button"
                onClick={generate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Generate
            </button>
    </div>

    );

}

export default DocumentForm;