export type UserRole = 'super_admin' | 'lab_admin' | 'doctor' | 'pathologist' | 'receptionist' | 'technician';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId: string;
  avatar?: string;
  phone?: string;
  department?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  registrationNumber?: string;
  licenseNumber?: string;
  subscriptionPlan: 'free' | 'professional' | 'enterprise';
  subscriptionStatus: 'active' | 'suspended' | 'expired';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

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

export interface TestParameter {
  id: string;
  name: string;
  unit: string;
  referenceMin: number;
  referenceMax: number;
  criticalMin?: number;
  criticalMax?: number;
}

export interface TestMaster {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  description?: string;
  category: string;
  parameters: TestParameter[];
  price: number;
  turnaroundTime: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface Report {
  id: string;
  organizationId: string;
  patientId: string;
  testId: string;
  sampleDate: Date;
  collectionDate: Date;
  results: Record<string, string | number>;
  status: 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected';
  pathologistId?: string;
  approvedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface Invoice {
  id: string;
  organizationId: string;
  patientId: string;
  invoiceNumber: string;
  items: Array<{
    testId: string;
    testName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  paymentStatus: 'pending' | 'partial' | 'paid';
  paymentMethod?: string;
  dueDate: Date;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface AuditLog {
  id: string;
  organizationId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
