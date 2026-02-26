import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

const DocumentForm = ({ onSuccess }) => {
    const { register, handleSubmit, reset } = useForm();

    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadLookups = async () => {
            const dep = await api.get('/lookups/departments');
            const cat = await api.get('/lookups/categories');

            setDepartments(dep.data);
            setCategories(cat.data);
        };

        loadLookups();
    }, []);

    const onSubmit = async (data) => {
        const res = await api.post('/documents/generate', data);
        onSuccess(res.data);
        reset();
    };

    return (
        <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-bold mb-4">
                Generate Document Number
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <input
                    {...register('document_title')}
                    placeholder="Document Title"
                    className="w-full border p-2 rounded"
                />

                {/* CATEGORY */}
                <select
                    {...register('category_id')}
                    className="w-full border p-2 rounded"
                >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                {/* DEPARTMENT */}
                <select
                    {...register('department_id')}
                    className="w-full border p-2 rounded"
                >
                    <option value="">Select Department</option>
                    {departments.map(d => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
                </select>

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Generate
                </button>

            </form>
        </div>
    );
};

export default DocumentForm;