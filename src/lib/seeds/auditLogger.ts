import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { AuditLog } from '@/types';

export type AuditAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'LOGIN'
  | 'LOGOUT'
  | 'APPROVE_REPORT'
  | 'VIEW_PATIENT';

export async function logAudit(
  organizationId: string,
  userId: string,
  action: AuditAction,
  entityType: string,
  entityId: string,
  changes?: Record<string, unknown>
) {
  try {
    const auditLogId = `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const auditLog: Omit<AuditLog, 'createdAt'> & { createdAt: any } = {
      id: auditLogId,
      organizationId,
      userId,
      action,
      entityType,
      entityId,
      changes,
      ipAddress: typeof window !== 'undefined' ? '' : '', // Will be set server-side
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
      createdAt: serverTimestamp(),
    };

    await setDoc(
      doc(db, 'organizations', organizationId, 'auditLogs', auditLogId),
      auditLog
    );
  } catch (error) {
    console.error('Error logging audit:', error);
    // Don't throw - audit logging should not break the application
  }
}
