import { db } from '@/lib/firebase';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { TestMaster, TestParameter } from '@/types';

// Standard test parameters database
const STANDARD_TESTS: Omit<TestMaster, 'id' | 'organizationId' | 'createdAt' | 'updatedAt' | 'createdBy'>[] = [
  {
    name: 'Complete Blood Count (CBC)',
    code: 'CBC',
    category: 'Hematology',
    description: 'Complete blood count with differential',
    parameters: [
      { id: '1', name: 'Hemoglobin', unit: 'g/dL', referenceMin: 12, referenceMax: 17.5, criticalMin: 7, criticalMax: 20 },
      { id: '2', name: 'Hematocrit', unit: '%', referenceMin: 36, referenceMax: 46, criticalMin: 20, criticalMax: 60 },
      { id: '3', name: 'WBC Count', unit: '10^3/µL', referenceMin: 4.5, referenceMax: 11, criticalMin: 2, criticalMax: 30 },
      { id: '4', name: 'RBC Count', unit: '10^6/µL', referenceMin: 4, referenceMax: 5.5 },
      { id: '5', name: 'Platelets', unit: '10^3/µL', referenceMin: 150, referenceMax: 400, criticalMin: 50, criticalMax: 1000 },
    ],
    price: 250,
    turnaroundTime: 24,
    isActive: true,
  },
  {
    name: 'Lipid Profile',
    code: 'LIPID',
    category: 'Chemistry',
    description: 'Cholesterol, triglycerides, HDL, LDL',
    parameters: [
      { id: '1', name: 'Total Cholesterol', unit: 'mg/dL', referenceMin: 0, referenceMax: 200 },
      { id: '2', name: 'LDL Cholesterol', unit: 'mg/dL', referenceMin: 0, referenceMax: 100 },
      { id: '3', name: 'HDL Cholesterol', unit: 'mg/dL', referenceMin: 40, referenceMax: 200 },
      { id: '4', name: 'Triglycerides', unit: 'mg/dL', referenceMin: 0, referenceMax: 150 },
    ],
    price: 300,
    turnaroundTime: 24,
    isActive: true,
  },
  {
    name: 'Liver Function Test (LFT)',
    code: 'LFT',
    category: 'Chemistry',
    description: 'Bilirubin, proteins, liver enzymes',
    parameters: [
      { id: '1', name: 'Total Bilirubin', unit: 'mg/dL', referenceMin: 0.1, referenceMax: 1.2, criticalMin: 0, criticalMax: 15 },
      { id: '2', name: 'Direct Bilirubin', unit: 'mg/dL', referenceMin: 0, referenceMax: 0.3 },
      { id: '3', name: 'AST', unit: 'U/L', referenceMin: 10, referenceMax: 40 },
      { id: '4', name: 'ALT', unit: 'U/L', referenceMin: 7, referenceMax: 56 },
      { id: '5', name: 'ALP', unit: 'U/L', referenceMin: 30, referenceMax: 120 },
    ],
    price: 280,
    turnaroundTime: 24,
    isActive: true,
  },
  {
    name: 'Kidney Function Test (KFT)',
    code: 'KFT',
    category: 'Chemistry',
    description: 'Creatinine, BUN, electrolytes',
    parameters: [
      { id: '1', name: 'Creatinine', unit: 'mg/dL', referenceMin: 0.7, referenceMax: 1.3, criticalMin: 0, criticalMax: 10 },
      { id: '2', name: 'BUN', unit: 'mg/dL', referenceMin: 7, referenceMax: 20 },
      { id: '3', name: 'Sodium', unit: 'mEq/L', referenceMin: 135, referenceMax: 145, criticalMin: 125, criticalMax: 155 },
      { id: '4', name: 'Potassium', unit: 'mEq/L', referenceMin: 3.5, referenceMax: 5, criticalMin: 2.5, criticalMax: 6.5 },
      { id: '5', name: 'Chloride', unit: 'mEq/L', referenceMin: 98, referenceMax: 107 },
    ],
    price: 280,
    turnaroundTime: 24,
    isActive: true,
  },
  {
    name: 'Thyroid Profile',
    code: 'THYROID',
    category: 'Endocrinology',
    description: 'TSH, T3, T4 levels',
    parameters: [
      { id: '1', name: 'TSH', unit: 'mIU/L', referenceMin: 0.4, referenceMax: 4 },
      { id: '2', name: 'Free T3', unit: 'pg/mL', referenceMin: 2.3, referenceMax: 4.2 },
      { id: '3', name: 'Free T4', unit: 'ng/dL', referenceMin: 0.8, referenceMax: 1.8 },
    ],
    price: 350,
    turnaroundTime: 48,
    isActive: true,
  },
  {
    name: 'Blood Glucose (Fasting)',
    code: 'GLU-F',
    category: 'Chemistry',
    description: 'Fasting blood glucose',
    parameters: [
      { id: '1', name: 'Fasting Glucose', unit: 'mg/dL', referenceMin: 70, referenceMax: 100, criticalMin: 40, criticalMax: 500 },
    ],
    price: 100,
    turnaroundTime: 24,
    isActive: true,
  },
  {
    name: 'HbA1c (Glycated Hemoglobin)',
    code: 'HBA1C',
    category: 'Chemistry',
    description: 'Three-month average blood glucose',
    parameters: [
      { id: '1', name: 'HbA1c', unit: '%', referenceMin: 0, referenceMax: 5.7 },
    ],
    price: 200,
    turnaroundTime: 48,
    isActive: true,
  },
  {
    name: 'Dengue Serology',
    code: 'DENGUE',
    category: 'Serology',
    description: 'Dengue IgM and IgG antibodies',
    parameters: [
      { id: '1', name: 'Dengue IgM', unit: 'Result', referenceMin: 0, referenceMax: 1 },
      { id: '2', name: 'Dengue IgG', unit: 'Result', referenceMin: 0, referenceMax: 1 },
    ],
    price: 400,
    turnaroundTime: 24,
    isActive: true,
  },
  {
    name: 'COVID-19 RT-PCR',
    code: 'COVID-PCR',
    category: 'Virology',
    description: 'SARS-CoV-2 reverse transcription PCR',
    parameters: [
      { id: '1', name: 'RT-PCR Result', unit: 'Result', referenceMin: 0, referenceMax: 1 },
      { id: '2', name: 'Ct Value', unit: 'Cycle', referenceMin: 0, referenceMax: 45 },
    ],
    price: 500,
    turnaroundTime: 24,
    isActive: true,
  },
  {
    name: 'Urinalysis',
    code: 'UA',
    category: 'Urinalysis',
    description: 'Complete urinalysis with microscopy',
    parameters: [
      { id: '1', name: 'Color', unit: 'Result', referenceMin: 0, referenceMax: 1 },
      { id: '2', name: 'Clarity', unit: 'Result', referenceMin: 0, referenceMax: 1 },
      { id: '3', name: 'pH', unit: 'Units', referenceMin: 4.5, referenceMax: 8 },
      { id: '4', name: 'Specific Gravity', unit: 'g/mL', referenceMin: 1.005, referenceMax: 1.030 },
    ],
    price: 150,
    turnaroundTime: 24,
    isActive: true,
  },
];

export async function seedTestMaster(organizationId: string, userId: string) {
  try {
    const testsRef = collection(db, 'organizations', organizationId, 'tests');

    // Check if tests already exist
    const existingTests = await getDocs(testsRef);
    if (existingTests.size > 0) {
      console.log('Tests already seeded for this organization');
      return;
    }

    // Seed standard tests
    for (const test of STANDARD_TESTS) {
      const testId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const testDoc: TestMaster = {
        id: testId,
        organizationId,
        ...test,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: userId,
      };

      await setDoc(doc(testsRef, testId), testDoc);
    }

    console.log(`Successfully seeded ${STANDARD_TESTS.length} tests`);
  } catch (error) {
    console.error('Error seeding test master:', error);
    throw error;
  }
}
