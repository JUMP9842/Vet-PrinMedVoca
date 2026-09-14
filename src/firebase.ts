import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import config from '../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(config) : getApp();

export const db: Firestore = getFirestore(app, config.firestoreDatabaseId || '(default)');
export const auth: Auth = getAuth(app);
