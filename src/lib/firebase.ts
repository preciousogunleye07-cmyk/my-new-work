import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId || "ai-studio-studioportfolio-edeff602-ec26-4be7-b82f-dcc43021e9de");
export const auth = getAuth(app);

// Error Handling from firebase-integration skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Inquiries Firestore persistence functions
export interface InquiryData {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  status: 'Pending' | 'Reviewed' | 'Archived';
}

export const addInquiryToFirestore = async (name: string, email: string, message: string): Promise<string> => {
  const path = 'inquiries';
  try {
    const id = Math.random().toString(36).substring(2, 15);
    const docRef = doc(db, path, id);
    await setDoc(docRef, {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      status: 'Pending'
    });
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const updateInquiryStatusInFirestore = async (id: string, status: 'Pending' | 'Reviewed' | 'Archived'): Promise<void> => {
  const path = `inquiries/${id}`;
  try {
    const docRef = doc(db, 'inquiries', id);
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

export const deleteInquiryFromFirestore = async (id: string): Promise<void> => {
  const path = `inquiries/${id}`;
  try {
    const docRef = doc(db, 'inquiries', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

export const subscribeToInquiries = (
  onNext: (inquiries: InquiryData[]) => void,
  onError: (error: Error) => void
) => {
  const path = 'inquiries';
  const q = query(collection(db, path), orderBy('timestamp', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const inquiries: InquiryData[] = [];
      snapshot.forEach((doc) => {
        inquiries.push({
          id: doc.id,
          ...doc.data()
        } as InquiryData);
      });
      onNext(inquiries);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (err: any) {
        onError(err);
      }
    }
  );
};


const provider = new GoogleAuthProvider();
// Add Gmail send scope and Google Sheets spreadsheet scope
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');

// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// Cache the access token in memory (never store in localStorage/sessionStorage as per workspace integration guidelines)
let cachedAccessToken: string | null = null;

// Initialize auth state listener. Call this on app load.
export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Auth');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// UTF-8 safe base64url encoder
const base64UrlEncode = (str: string): string => {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  const len = utf8Bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// Create RFC 2822 email
const makeEmail = (
  from: string,
  to: string,
  replyToName: string,
  replyToEmail: string,
  subject: string,
  body: string
): string => {
  const str = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    `Reply-To: ${replyToName} <${replyToEmail}>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    body
  ].join('\r\n');
  return base64UrlEncode(str);
};

// Send email using Gmail API
export const sendGmailMessage = async (
  ownerEmail: string,
  visitorName: string,
  visitorEmail: string,
  messageText: string
): Promise<any> => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('No Gmail API Access Token available. Please connect Gmail.');
  }

  // 1. Send notification email to the portfolio owner
  const ownerSubject = `New Portfolio Inquiry from ${visitorName}`;
  const ownerBody = `Hi! You have received a new consultation request from your portfolio website.

Details:
------------------------------------------
Sender Name:  ${visitorName}
Sender Email: ${visitorEmail}
Message:
${messageText}
------------------------------------------
You can reply directly to this email to coordinate with ${visitorName}.`;

  const ownerRawEmail = makeEmail(
    `"Portfolio Inquiries" <${ownerEmail}>`,
    ownerEmail,
    visitorName,
    visitorEmail,
    ownerSubject,
    ownerBody
  );

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: ownerRawEmail
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 401) {
      cachedAccessToken = null;
    }
    throw new Error(errorData.error?.message || 'Failed to send notification email via Gmail API.');
  }

  // 2. Send professional auto-responder confirmation email to the visitor!
  try {
    const visitorSubject = `Inquiry Received - Creative Studio`;
    const visitorBody = `Hi ${visitorName},

Thank you for reaching out through my portfolio website. I have successfully received your consultation request and message!

Here is a record of the details you submitted:
------------------------------------------
Name:    ${visitorName}
Email:   ${visitorEmail}
Message:
${messageText}
------------------------------------------

I will review your message and get back to you as soon as possible.

Best regards,
Creative Studio`;

    const visitorRawEmail = makeEmail(
      `"Creative Studio" <${ownerEmail}>`,
      visitorEmail,
      'Creative Studio',
      ownerEmail,
      visitorSubject,
      visitorBody
    );

    await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        raw: visitorRawEmail
      })
    });
  } catch (visitorErr) {
    console.error("Failed to send auto-responder to visitor:", visitorErr);
  }

  return response.json();
};

// Append row of data to Google Sheets
export const appendRowToSheets = async (
  visitorName: string,
  visitorEmail: string,
  messageText: string
): Promise<{ spreadsheetId: string }> => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('No Google Sheets API Access Token available. Please connect Google Account.');
  }

  // Get or Create the Spreadsheet
  let spreadsheetId = localStorage.getItem('portfolio_spreadsheet_id');

  const checkAndCreateSpreadsheet = async (): Promise<string> => {
    if (spreadsheetId) {
      // Check if it exists and is accessible
      try {
        const checkRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (checkRes.ok) {
          return spreadsheetId;
        }
      } catch (e) {
        console.warn("Spreadsheet check failed, creating a new one...", e);
      }
    }

    // Create a new Spreadsheet
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          title: 'Portfolio Consultation Inquiries'
        }
      })
    });

    if (!createRes.ok) {
      const errorData = await createRes.json().catch(() => ({}));
      throw new Error(errorData.error?.message || 'Failed to create a new spreadsheet.');
    }

    const sheetData = await createRes.json();
    const newId = sheetData.spreadsheetId;
    localStorage.setItem('portfolio_spreadsheet_id', newId);

    // Append the headers
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${newId}/values/A1:append?valueInputOption=USER_ENTERED`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [['Date Submitted', 'Visitor Name', 'Visitor Email', 'Message']]
      })
    });

    return newId;
  };

  const targetId = await checkAndCreateSpreadsheet();

  const timestamp = new Date().toLocaleString();
  const appendRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${targetId}/values/A1:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: [[timestamp, visitorName, visitorEmail, messageText]]
    })
  });

  if (!appendRes.ok) {
    const errorData = await appendRes.json().catch(() => ({}));
    if (appendRes.status === 401) {
      cachedAccessToken = null;
    }
    throw new Error(errorData.error?.message || 'Failed to append inquiry to Google Sheets.');
  }

  return { spreadsheetId: targetId };
};
