'use client';

import { useState } from 'react';
import { useOrganization } from '@/context/OrganizationContext';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { TestMaster, TestParameter } from '@/types';
import { X, Plus, Trash2 } from 'lucide-react';

interface TestFormModalProps {
  test?: TestMaster | null;
  onClose: () => void;
  onSave: () => void;
}

export function TestFormModal({ test, onClose, onSave }: TestFormModalProps) {
  const { organization } = useOrganization();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: test?.name || '',
    code: test?.code || '',
    category: test?.category || '',
    description: test?.description || '',
    price: test?.price || 0,
    turnaroundTime: test?.turnaroundTime || 24,
    parameters: test?.parameters || [{ id: '1', name: '', unit: '', referenceMin: 0, referenceMax: 100 }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organization?.id || !user?.uid) return;

    setLoading(true);
    try {
      const testData: TestMaster = {
        id: test?.id || `test_${Date.now()}`,
        organizationId: organization.id,
        name: formData.name,
        code: formData.code,
        category: formData.category,
        description: formData.description,
        price: formData.price,
        turnaroundTime: formData.turnaroundTime,
        parameters: formData.parameters,
        isActive: test?.isActive ?? true,
        createdAt: test?.createdAt || new Date(),
        updatedAt: new Date(),
        createdBy: test?.createdBy || user.uid,
      };

      const testRef = doc(db, 'organizations', organization.id, 'tests', testData.id);
      if (test?.id) {
        await updateDoc(testRef, testData);
      } else {
        await setDoc(testRef, testData);
      }

      onSave();
    } catch (error) {
      console.error('Error saving test:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleParameterChange = (index: number, field: string, value: any) => {
    const newParameters = [...formData.parameters];
    newParameters[index] = { ...newParameters[index], [field]: value };
    setFormData({ ...formData, parameters: newParameters });
  };

  const handleAddParameter = () => {
    setFormData({
      ...formData,
      parameters: [
        ...formData.parameters,
        {
          id: `${Date.now()}`,
          name: '',
          unit: '',
          referenceMin: 0,
          referenceMax: 100,
        },
      ],
    });
  };

  const handleRemoveParameter = (index: number) => {
    setFormData({
      ...formData,
      parameters: formData.parameters.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white dark:bg-secondary-900">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-secondary-200 bg-white px-6 py-4 dark:border-secondary-800 dark:bg-secondary-900">
          <h2 className="text-xl font-bold text-secondary-900 dark:text-white">
            {test ? 'Edit Test' : 'Add New Test'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg hover:bg-secondary-100 p-2 dark:hover:bg-secondary-800"
          >
            <X className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary-900 dark:text-white">Basic Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Test Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              />
              <input
                type="text"
                placeholder="Test Code (e.g., CBC)"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              />
            </div>
            <input
              type="text"
              placeholder="Category (e.g., Hematology)"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              rows={3}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="number"
                placeholder="Price ($)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              />
              <input
                type="number"
                placeholder="Turnaround Time (hours)"
                value={formData.turnaroundTime}
                onChange={(e) => setFormData({ ...formData, turnaroundTime: parseInt(e.target.value) })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              />
            </div>
          </div>

          {/* Parameters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-secondary-900 dark:text-white">Test Parameters</h3>
              <button
                type="button"
                onClick={handleAddParameter}
                className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                <Plus className="h-4 w-4" />
                Add Parameter
              </button>
            </div>

            <div className="space-y-3">
              {formData.parameters.map((param, index) => (
                <div key={param.id} className="rounded-lg border border-secondary-200 bg-secondary-50 p-4 dark:border-secondary-700 dark:bg-secondary-800">
                  <div className="grid gap-3 md:grid-cols-5">
                    <input
                      type="text"
                      placeholder="Parameter Name"
                      value={param.name}
                      onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
                      className="rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Unit"
                      value={param.unit}
                      onChange={(e) => handleParameterChange(index, 'unit', e.target.value)}
                      className="rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
                    />
                    <input
                      type="number"
                      placeholder="Ref Min"
                      value={param.referenceMin}
                      onChange={(e) => handleParameterChange(index, 'referenceMin', parseFloat(e.target.value))}
                      className="rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
                    />
                    <input
                      type="number"
                      placeholder="Ref Max"
                      value={param.referenceMax}
                      onChange={(e) => handleParameterChange(index, 'referenceMax', parseFloat(e.target.value))}
                      className="rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveParameter(index)}
                      className="flex items-center justify-center rounded-lg bg-danger-50 text-danger-600 hover:bg-danger-100 dark:bg-danger-900 dark:text-danger-300 dark:hover:bg-danger-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-secondary-200 pt-6 dark:border-secondary-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-secondary-200 px-4 py-2 text-secondary-900 hover:bg-secondary-50 dark:border-secondary-700 dark:text-white dark:hover:bg-secondary-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Saving...' : 'Save Test'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
