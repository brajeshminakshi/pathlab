'use client';

import { useState } from 'react';
import { useOrganization } from '@/context/OrganizationContext';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { InventoryItem } from '@/lib/seeds/inventorySeed';
import { X } from 'lucide-react';

interface InventoryFormModalProps {
  item?: InventoryItem | null;
  onClose: () => void;
  onSave: () => void;
}

export function InventoryFormModal({ item, onClose, onSave }: InventoryFormModalProps) {
  const { organization } = useOrganization();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: item?.name || '',
    sku: item?.sku || '',
    category: item?.category || 'Consumable',
    quantity: item?.quantity || 0,
    unit: item?.unit || 'pieces',
    minStockLevel: item?.minStockLevel || 0,
    unitPrice: item?.unitPrice || 0,
    supplier: item?.supplier || '',
    expiryDate: item?.expiryDate ? new Date(item.expiryDate).toISOString().split('T')[0] : '',
    notes: item?.notes || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organization?.id || !user?.uid) return;

    setLoading(true);
    try {
      const inventoryData: InventoryItem = {
        id: item?.id || `inv_${Date.now()}`,
        organizationId: organization.id,
        name: formData.name,
        sku: formData.sku,
        category: formData.category as 'Reagent' | 'Equipment' | 'Consumable',
        quantity: formData.quantity,
        unit: formData.unit,
        minStockLevel: formData.minStockLevel,
        unitPrice: formData.unitPrice,
        supplier: formData.supplier,
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : undefined,
        notes: formData.notes,
        createdAt: item?.createdAt || new Date(),
        updatedAt: new Date(),
        createdBy: item?.createdBy || user.uid,
      };

      const itemRef = doc(db, 'organizations', organization.id, 'inventory', inventoryData.id);
      if (item?.id) {
        await updateDoc(itemRef, inventoryData);
      } else {
        await setDoc(itemRef, inventoryData);
      }

      onSave();
    } catch (error) {
      console.error('Error saving inventory item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white dark:bg-secondary-900">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-secondary-200 bg-white px-6 py-4 dark:border-secondary-800 dark:bg-secondary-900">
          <h2 className="text-xl font-bold text-secondary-900 dark:text-white">
            {item ? 'Edit Inventory Item' : 'Add Inventory Item'}
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
          {/* Item Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary-900 dark:text-white">Item Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Item Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              />
              <input
                type="text"
                placeholder="SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              >
                <option>Consumable</option>
                <option>Reagent</option>
                <option>Equipment</option>
              </select>
              <input
                type="text"
                placeholder="Supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              />
            </div>
            <textarea
              placeholder="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              rows={3}
            />
          </div>

          {/* Stock & Pricing */}
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary-900 dark:text-white">Stock & Pricing</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              />
              <input
                type="text"
                placeholder="Unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              />
              <input
                type="number"
                placeholder="Min Stock Level"
                value={formData.minStockLevel}
                onChange={(e) => setFormData({ ...formData, minStockLevel: parseInt(e.target.value) })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="number"
                placeholder="Unit Price ($)"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              />
              <input
                type="date"
                placeholder="Expiry Date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-secondary-900 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              />
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
              {loading ? 'Saving...' : 'Save Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
