import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Invoice } from '@/types';

export async function createInvoice(
  organizationId: string,
  userId: string,
  invoiceData: Omit<Invoice, 'id' | 'organizationId' | 'createdAt' | 'updatedAt' | 'createdBy'>
) {
  try {
    const invoiceId = `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const invoice: Invoice = {
      id: invoiceId,
      organizationId,
      ...invoiceData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId,
    };

    await setDoc(
      doc(db, 'organizations', organizationId, 'invoices', invoiceId),
      invoice
    );

    return invoice;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}
