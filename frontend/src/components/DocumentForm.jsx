// frontend/src/components/DocumentForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

const DocumentForm = ({ onSuccess }) => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            document_category: 'Report',
            department: 'HR',
        },
    });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const category = watch('document_category');
    const department = watch('department');

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await api.post('/documents/generate', data);
            setPreview(null);
            reset();
            if (onSuccess) onSuccess(response.data);
        } catch (error) {
            alert('Error: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = async (data) => {
        // This would call the backend to generate preview
        setPreview(data);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Generate Document Number</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Document Title</label>
                    <input
                        type="text"
                        {...register('document_title', { required: 'Required', maxLength: { value: 255, message: 'Max 255 characters' } })}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Enter document title"
                    />
                    {errors.document_title && <span className="text-red-500 text-sm">{errors.document_title.message}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                            {...register('document_category')}
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            <option>Report</option>
                            <option>Template</option>
                            <option>Presentation</option>
                            <option>Invoice</option>
                            <option>Contract</option>
                            <option>Proposal</option>
                            <option>Memo</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Department</label>
                        <select
                            {...register('department')}
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            <option>HR</option>
                            <option>Finance</option>
                            <option>IT</option>
                            <option>Marketing</option>
                            <option>Operations</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Additional Notes</label>
                    <textarea
                        {...register('notes')}
                        className="w-full px-4 py-2 border rounded-lg"
                        rows="4"
                        placeholder="Optional notes"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Generating...' : 'Generate Document Number'}
                </button>
            </form>

            {preview && (
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Preview</h3>
                    <div className="bg-white p-4 rounded">
                        <p><strong>Document Number:</strong> {preview.documentNumber}</p>
                        <p><strong>Title:</strong> {preview.document_title}</p>
                        <p><strong>Category:</strong> {preview.document_category}</p>
                        <p><strong>Department:</strong> {preview.department}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentForm;