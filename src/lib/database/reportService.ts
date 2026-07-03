import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Report } from '@/types';

export async function createReport(
  organizationId: string,
  userId: string,
  reportData: Omit<Report, 'id' | 'organizationId' | 'createdAt' | 'updatedAt' | 'createdBy'>
) {
  try {
    const reportId = `rep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const report: Report = {
      id: reportId,
      organizationId,
      ...reportData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId,
    };

    await setDoc(
      doc(db, 'organizations', organizationId, 'reports', reportId),
      report
    );

    return report;
  } catch (error) {
    console.error('Error creating report:', error);
    throw error;
  }
}
