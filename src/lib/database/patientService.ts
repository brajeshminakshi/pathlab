import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface Patient {
  id: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  referringDoctor?: string;
  emergencyContact?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export async function createPatient(
  organizationId: string,
  userId: string,
  patientData: Omit<Patient, 'id' | 'organizationId' | 'createdAt' | 'updatedAt' | 'createdBy'>
) {
  try {
    const patientId = `pat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const patient: Patient = {
      id: patientId,
      organizationId,
      ...patientData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId,
    };

    await setDoc(
      doc(db, 'organizations', organizationId, 'patients', patientId),
      patient
    );

    return patient;
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
}
