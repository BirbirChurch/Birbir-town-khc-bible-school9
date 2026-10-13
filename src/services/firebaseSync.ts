import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { Course, GradeBreakdown, Student } from '../types.ts';

export interface FirebaseSystemState {
  students?: Student[];
  teachers?: string[];
  courses?: Course[];
  grades?: Record<string, GradeBreakdown>;
  photos?: Record<string, string>;
  userPasswords?: Record<string, string>;
  availableYears?: string[];
  systemLocked?: boolean;
  gradePublished?: boolean;
  currentYear?: string;
  currentSemester?: string;
}

export async function loadInitialFromFirestore(): Promise<FirebaseSystemState | null> {
  try {
    const metaDoc = await getDoc(doc(db, 'system_state', 'meta'));
    const studentsDoc = await getDoc(doc(db, 'system_state', 'students'));
    const coursesDoc = await getDoc(doc(db, 'system_state', 'courses'));
    const gradesDoc = await getDoc(doc(db, 'system_state', 'grades'));
    const passwordsDoc = await getDoc(doc(db, 'system_state', 'passwords'));
    const photosDoc = await getDoc(doc(db, 'system_state', 'photos'));

    const state: FirebaseSystemState = {};

    if (metaDoc.exists()) {
      const data = metaDoc.data();
      if (typeof data.systemLocked === 'boolean') state.systemLocked = data.systemLocked;
      if (typeof data.gradePublished === 'boolean') state.gradePublished = data.gradePublished;
      if (data.currentYear) state.currentYear = data.currentYear;
      if (data.currentSemester) state.currentSemester = data.currentSemester;
      if (Array.isArray(data.availableYears)) state.availableYears = data.availableYears;
      if (Array.isArray(data.teachers)) state.teachers = data.teachers;
    }

    if (studentsDoc.exists()) {
      const data = studentsDoc.data();
      if (Array.isArray(data.list) && data.list.length > 0) state.students = data.list;
    }

    if (coursesDoc.exists()) {
      const data = coursesDoc.data();
      if (Array.isArray(data.list) && data.list.length > 0) state.courses = data.list;
    }

    if (gradesDoc.exists()) {
      const data = gradesDoc.data();
      if (data.data) state.grades = data.data;
    }

    if (passwordsDoc.exists()) {
      const data = passwordsDoc.data();
      if (data.data) state.userPasswords = data.data;
    }

    if (photosDoc.exists()) {
      const data = photosDoc.data();
      if (data.data) state.photos = data.data;
    }

    return state;
  } catch (error) {
    console.warn('Firebase initial load skipped or not yet initialized:', error);
    return null;
  }
}

export async function syncMetaToFirestore(meta: {
  systemLocked: boolean;
  gradePublished: boolean;
  currentYear: string;
  currentSemester: string;
  availableYears: string[];
  teachers: string[];
}) {
  try {
    await setDoc(doc(db, 'system_state', 'meta'), meta, { merge: true });
  } catch (e) {
    console.warn('Error saving meta to Firestore:', e);
  }
}

export async function syncStudentsToFirestore(students: Student[]) {
  try {
    await setDoc(doc(db, 'system_state', 'students'), { list: students }, { merge: true });
  } catch (e) {
    console.warn('Error saving students to Firestore:', e);
  }
}

export async function syncCoursesToFirestore(courses: Course[]) {
  try {
    await setDoc(doc(db, 'system_state', 'courses'), { list: courses }, { merge: true });
  } catch (e) {
    console.warn('Error saving courses to Firestore:', e);
  }
}

export async function syncGradesToFirestore(grades: Record<string, GradeBreakdown>) {
  try {
    await setDoc(doc(db, 'system_state', 'grades'), { data: grades }, { merge: true });
  } catch (e) {
    console.warn('Error saving grades to Firestore:', e);
  }
}

export async function syncPasswordsToFirestore(userPasswords: Record<string, string>) {
  try {
    await setDoc(doc(db, 'system_state', 'passwords'), { data: userPasswords }, { merge: true });
  } catch (e) {
    console.warn('Error saving passwords to Firestore:', e);
  }
}

export async function syncPhotosToFirestore(photos: Record<string, string>) {
  try {
    await setDoc(doc(db, 'system_state', 'photos'), { data: photos }, { merge: true });
  } catch (e) {
    console.warn('Error saving photos to Firestore:', e);
  }
}
