import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export interface InventoryItem {
  id: string;
  organizationId: string;
  name: string;
  sku: string;
  category: string; // Reagent, Equipment, Consumable
  quantity: number;
  unit: string;
  expiryDate?: Date;
  minStockLevel: number;
  unitPrice: number;
  supplier?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const STARTER_INVENTORY: Omit<InventoryItem, 'id' | 'organizationId' | 'createdAt' | 'updatedAt' | 'createdBy'>[] = [
  {
    name: 'EDTA Vacutainer Tubes',
    sku: 'EDTA-VIAL-500',
    category: 'Consumable',
    quantity: 500,
    unit: 'pieces',
    minStockLevel: 100,
    unitPrice: 0.5,
    supplier: 'Becton Dickinson',
  },
  {
    name: 'Serum Separator Tubes',
    sku: 'SST-VIAL-500',
    category: 'Consumable',
    quantity: 300,
    unit: 'pieces',
    minStockLevel: 50,
    unitPrice: 0.6,
    supplier: 'Becton Dickinson',
  },
  {
    name: 'Glucose Oxidase Reagent',
    sku: 'GLUC-REG-1L',
    category: 'Reagent',
    quantity: 5,
    unit: 'bottles',
    minStockLevel: 1,
    unitPrice: 200,
    supplier: 'BioRad',
    expiryDate: new Date('2025-12-31'),
  },
  {
    name: 'Hemoglobin Standard',
    sku: 'HB-STD-5ML',
    category: 'Reagent',
    quantity: 10,
    unit: 'bottles',
    minStockLevel: 2,
    unitPrice: 150,
    supplier: 'Siemens',
    expiryDate: new Date('2025-06-30'),
  },
];

export async function initializeInventory(organizationId: string, userId: string) {
  try {
    const inventoryRef = collection(db, 'organizations', organizationId, 'inventory');

    for (const item of STARTER_INVENTORY) {
      const itemId = `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const inventoryItem: InventoryItem = {
        id: itemId,
        organizationId,
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: userId,
      };

      await setDoc(doc(inventoryRef, itemId), inventoryItem);
    }

    console.log(`Successfully initialized ${STARTER_INVENTORY.length} inventory items`);
  } catch (error) {
    console.error('Error initializing inventory:', error);
    throw error;
  }
}
