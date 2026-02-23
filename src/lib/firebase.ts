// =============================================================================
// BasisGuard - Firebase Configuration
// =============================================================================
// Initialize Firebase for authentication and Firestore.
//
// Required environment variables:
//   NEXT_PUBLIC_FIREBASE_API_KEY
//   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
//   NEXT_PUBLIC_FIREBASE_PROJECT_ID
//   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
//   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
//   NEXT_PUBLIC_FIREBASE_APP_ID
//   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID (optional)
// =============================================================================

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { UserSession, PricingTier } from './types';

// =============================================================================
// Firebase Configuration from Environment Variables
// =============================================================================

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// =============================================================================
// Initialization (Singleton)
// =============================================================================

function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }

  // Validate required config
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error(
      'Firebase configuration is incomplete. Ensure NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID environment variables are set.',
    );
  }

  return initializeApp(firebaseConfig);
}

/** Get the Firebase Auth instance */
export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

/** Get the Firestore instance */
export function getFirebaseFirestore(): Firestore {
  return getFirestore(getFirebaseApp());
}

// =============================================================================
// Authentication Helpers
// =============================================================================

const googleProvider = new GoogleAuthProvider();

/**
 * Sign in with Google via popup.
 * Returns the Firebase User on success.
 */
export async function signInWithGoogle(): Promise<User> {
  const auth = getFirebaseAuth();
  const result = await signInWithPopup(auth, googleProvider);

  // Create or update user session in Firestore
  await upsertUserSession(result.user);

  return result.user;
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  const auth = getFirebaseAuth();
  await firebaseSignOut(auth);
}

/**
 * Subscribe to auth state changes.
 * Returns an unsubscribe function.
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
}

/**
 * Get the current authenticated user, or null if not signed in.
 */
export function getCurrentUser(): User | null {
  const auth = getFirebaseAuth();
  return auth.currentUser;
}

// =============================================================================
// User Session Management (Firestore)
// =============================================================================

/**
 * Create or update a user session document in Firestore.
 */
async function upsertUserSession(user: User): Promise<void> {
  const db = getFirebaseFirestore();
  const userRef = doc(db, 'users', user.uid);

  const existing = await getDoc(userRef);

  if (existing.exists()) {
    // Update last active timestamp
    await updateDoc(userRef, {
      lastActiveAt: serverTimestamp(),
      email: user.email,
      displayName: user.displayName,
    });
  } else {
    // Create new user document
    const session: Omit<UserSession, 'createdAt' | 'lastActiveAt'> & {
      createdAt: ReturnType<typeof serverTimestamp>;
      lastActiveAt: ReturnType<typeof serverTimestamp>;
    } = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      tier: 'free' as PricingTier,
      isPaid: false,
      stripeCustomerId: '',
      createdAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
    };

    await setDoc(userRef, session);
  }
}

/**
 * Get the user session data from Firestore.
 */
export async function getUserSession(uid: string): Promise<UserSession | null> {
  const db = getFirebaseFirestore();
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserSession;
}

/**
 * Update the user's pricing tier after a successful Stripe purchase.
 */
export async function updateUserTier(
  uid: string,
  tier: PricingTier,
  stripeCustomerId: string,
): Promise<void> {
  const db = getFirebaseFirestore();
  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    tier,
    isPaid: tier !== 'free',
    stripeCustomerId,
    lastActiveAt: serverTimestamp(),
  });
}

// =============================================================================
// Analysis Results Storage
// =============================================================================

/**
 * Save analysis results to Firestore for later retrieval.
 */
export async function saveAnalysisResults(
  uid: string,
  analysisId: string,
  data: Record<string, unknown>,
): Promise<void> {
  const db = getFirebaseFirestore();
  const analysisRef = doc(db, 'users', uid, 'analyses', analysisId);

  await setDoc(analysisRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/**
 * Retrieve a saved analysis by ID.
 */
export async function getAnalysisResults(
  uid: string,
  analysisId: string,
): Promise<Record<string, unknown> | null> {
  const db = getFirebaseFirestore();
  const analysisRef = doc(db, 'users', uid, 'analyses', analysisId);
  const snapshot = await getDoc(analysisRef);

  return snapshot.exists() ? (snapshot.data() as Record<string, unknown>) : null;
}
