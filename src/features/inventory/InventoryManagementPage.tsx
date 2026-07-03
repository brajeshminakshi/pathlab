'use client';

import { useState, useEffect } from 'react';
import { useOrganization } from '@/context/OrganizationContext';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { InventoryItem } from '@/lib/seeds/inventorySeed';
import { Plus, Trash2, Edit2, Search, AlertCircle } from 'lucide-react';
import { InventoryFormModal } from './InventoryFormModal';
import { format } from 'date-fns';

export function InventoryManagementPage() {
  const { organization } = useOrganization();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const categories = ['All', 'Consumable', 'Reagent', 'Equipment'];

  const loadInventory = async () => {
    if (!organization?.id) return;
    setLoading(true);
    try {
      const inventoryRef = collection(db, 'organizations', organization.id, 'inventory');
      const snapshot = await getDocs(inventoryRef);
      const itemsData = snapshot.docs.map((doc) => doc.data() as InventoryItem);
      setItems(itemsData);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, [organization?.id]);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const isLowStock = (item: InventoryItem) => item.quantity <= item.minStockLevel;

  const handleOpenModal = (item?: InventoryItem) => {
    setEditingItem(item || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleItemSaved = () => {
    handleCloseModal();
    loadInventory();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Inventory</h1>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">
            Manage reagents, equipment, and consumables
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-secondary-200 bg-white p-4 dark:border-secondary-800 dark:bg-secondary-900">
          <p className="text-sm text-secondary-600 dark:text-secondary-400">Total Items</p>
          <p className="mt-2 text-3xl font-bold text-secondary-900 dark:text-white">{items.length}</p>
        </div>
        <div className="rounded-lg border border-secondary-200 bg-white p-4 dark:border-secondary-800 dark:bg-secondary-900">
          <p className="text-sm text-secondary-600 dark:text-secondary-400">Low Stock Items</p>
          <p className="mt-2 text-3xl font-bold text-danger-600">{items.filter(isLowStock).length}</p>
        </div>
        <div className="rounded-lg border border-secondary-200 bg-white p-4 dark:border-secondary-800 dark:bg-secondary-900">
          <p className="text-sm text-secondary-600 dark:text-secondary-400">Expiring Soon</p>
          <p className="mt-2 text-3xl font-bold text-warning-600">--</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-secondary-400" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-secondary-200 bg-white py-2 pl-10 pr-4 text-secondary-900 placeholder-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filterCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'border border-secondary-200 text-secondary-700 hover:bg-secondary-50 dark:border-secondary-700 dark:text-secondary-300 dark:hover:bg-secondary-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-secondary-300 bg-secondary-50 p-12 text-center dark:border-secondary-700 dark:bg-secondary-900">
          <p className="text-secondary-600 dark:text-secondary-400">
            No items found. Add your first inventory item.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-secondary-200 dark:border-secondary-800">
          <table className="w-full">
            <thead className="border-b border-secondary-200 bg-secondary-50 dark:border-secondary-700 dark:bg-secondary-900">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">
                  Category
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900 dark:text-white">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">
                  Expiry
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-secondary-200 hover:bg-secondary-50 dark:border-secondary-700 dark:hover:bg-secondary-800"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-secondary-900 dark:text-white">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-600 dark:text-secondary-400">
                    {item.sku}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="font-semibold text-secondary-900 dark:text-white">
                      {item.quantity} {item.unit}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {isLowStock(item) ? (
                      <div className="flex items-center gap-2 text-danger-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Low Stock</span>
                      </div>
                    ) : (
                      <span className="text-sm text-success-600 font-medium">In Stock</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-600 dark:text-secondary-400">
                    {item.expiryDate ? format(new Date(item.expiryDate), 'MMM dd, yyyy') : '--'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="rounded-lg bg-primary-50 p-2 text-primary-600 hover:bg-primary-100 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg bg-danger-50 p-2 text-danger-600 hover:bg-danger-100 dark:bg-danger-900 dark:text-danger-300 dark:hover:bg-danger-800 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inventory Form Modal */}
      {isModalOpen && (
        <InventoryFormModal
          item={editingItem}
          onClose={handleCloseModal}
          onSave={handleItemSaved}
        />
      )}
    </div>
  );
}
