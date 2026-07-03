'use client';

import { useState } from 'react';
import { useOrganization } from '@/context/OrganizationContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TestMaster } from '@/types';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { TestFormModal } from './TestFormModal';

export function TestsManagementPage() {
  const { organization } = useOrganization();
  const [tests, setTests] = useState<TestMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<TestMaster | null>(null);

  // Load tests on mount
  const loadTests = async () => {
    if (!organization?.id) return;
    setLoading(true);
    try {
      const testsRef = collection(db, 'organizations', organization.id, 'tests');
      const snapshot = await getDocs(testsRef);
      const testsData = snapshot.docs.map((doc) => doc.data() as TestMaster);
      setTests(testsData);
    } catch (error) {
      console.error('Error loading tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTests = tests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (test?: TestMaster) => {
    setEditingTest(test || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTest(null);
  };

  const handleTestSaved = () => {
    handleCloseModal();
    loadTests(); // Refresh list
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Tests Catalog</h1>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">
            Manage laboratory tests and parameters
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Test
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-secondary-400" />
        <input
          type="text"
          placeholder="Search by test name or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-secondary-200 bg-white py-2 pl-10 pr-4 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
        />
      </div>

      {/* Tests Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredTests.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-secondary-300 bg-secondary-50 p-12 text-center dark:border-secondary-700 dark:bg-secondary-900">
          <p className="text-secondary-600 dark:text-secondary-400">
            No tests found. Create your first test to get started.
          </p>
          <button
            onClick={() => handleOpenModal()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create Test
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="rounded-lg border border-secondary-200 bg-white p-6 dark:border-secondary-800 dark:bg-secondary-900"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                      {test.name}
                    </h3>
                    <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                      {test.code}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">
                    {test.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-600 dark:text-secondary-400">Category:</span>
                      <span className="font-medium text-secondary-900 dark:text-white">
                        {test.category}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-600 dark:text-secondary-400">Parameters:</span>
                      <span className="font-medium text-secondary-900 dark:text-white">
                        {test.parameters?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-600 dark:text-secondary-400">Price:</span>
                      <span className="font-medium text-secondary-900 dark:text-white">
                        ${test.price}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-600 dark:text-secondary-400">TAT:</span>
                      <span className="font-medium text-secondary-900 dark:text-white">
                        {test.turnaroundTime}h
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2 border-t border-secondary-200 pt-4 dark:border-secondary-700">
                <button
                  onClick={() => handleOpenModal(test)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary-50 py-2 text-primary-600 hover:bg-primary-100 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-danger-50 py-2 text-danger-600 hover:bg-danger-100 dark:bg-danger-900 dark:text-danger-300 dark:hover:bg-danger-800 transition-colors">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Test Form Modal */}
      {isModalOpen && (
        <TestFormModal
          test={editingTest}
          onClose={handleCloseModal}
          onSave={handleTestSaved}
        />
      )}
    </div>
  );
}
