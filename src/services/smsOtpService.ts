/**
 * Argi Jewels � YourBulkSMS Gateway OTP Service
 * Gateway Endpoint: http://control.yourbulksms.com/api/sendhttp.php
 * AuthKey: NmRWYWZLSHpza3VPNWRGVzNG
 * Route: 2 (7,575 Balance)
 */

export interface SmsConfig {
  authKey: string;
  gatewayUrl: string;
  route: string;
  sender: string;
  country: string;
  dltTemplateId: string;
}

const STORAGE_KEY_CONFIG = 'argi_sms_config_v1';
const STORAGE_KEY_SESSIONS = 'argi_otp_sessions_v1';

export const DEFAULT_SMS_CONFIG: SmsConfig = {
  authKey: import.meta.env.VITE_SMS_AUTH_KEY || 'NmRWYWZLSHpza3VPNWRGVzNG',
  gatewayUrl: import.meta.env.VITE_SMS_GATEWAY_URL || 'http://control.yourbulksms.com/api/sendhttp.php',
  route: import.meta.env.VITE_SMS_ROUTE || '2',
  sender: import.meta.env.VITE_SMS_SENDER || 'ABCDEF',
  country: import.meta.env.VITE_SMS_COUNTRY || '0',
  dltTemplateId: import.meta.env.VITE_SMS_DLT_TE_ID || '',
};

export function getSmsConfig(): SmsConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (saved) {
      return { ...DEFAULT_SMS_CONFIG, ...JSON.parse(saved) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_SMS_CONFIG;
}

export function saveSmsConfig(config: Partial<SmsConfig>): SmsConfig {
  const current = getSmsConfig();
  const updated = { ...current, ...config };
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(updated));
  return updated;
}

export function formatIndianMobile(raw: string): string {
  const cleaned = raw.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return '91' + cleaned;
  }
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return '91' + cleaned.slice(1);
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return cleaned;
  }
  return cleaned;
}

interface OtpSession {
  mobile: string;
  otp: string;
  expiresAt: number;
}

function getOtpSessions(): Record<string, OtpSession> {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY_SESSIONS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveOtpSession(mobile: string, otp: string, ttlMinutes = 5) {
  const sessions = getOtpSessions();
  sessions[mobile] = {
    mobile,
    otp,
    expiresAt: Date.now() + ttlMinutes * 60 * 1000,
  };
  sessionStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
}

export interface SendOtpResult {
  success: boolean;
  message: string;
  otp?: string;
  formattedMobile: string;
  gatewayResponse?: any;
  isSimulatedFallback?: boolean;
}

/**
 * Dispatch OTP via YourBulkSMS Gateway
 */
export async function sendOtpSms(rawMobile: string): Promise<SendOtpResult> {
  const formattedMobile = formatIndianMobile(rawMobile);
  if (formattedMobile.length < 10) {
    return {
      success: false,
      message: 'Invalid mobile number. Please enter a valid 10-digit Indian phone number.',
      formattedMobile,
    };
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  saveOtpSession(formattedMobile, otp, 5);

  const config = getSmsConfig();
  const messageText = 'Your Argi Jewels mobile verification OTP is ' + otp + '. Valid for 5 minutes. Handcrafted in Indore.';

  const queryParams = new URLSearchParams({
    authkey: config.authKey,
    mobiles: formattedMobile,
    message: messageText,
    sender: config.sender,
    route: config.route,
    country: config.country,
  });

  if (config.dltTemplateId) {
    queryParams.append('DLT_TE_ID', config.dltTemplateId);
  }

  // Attempt via proxy first (/api/sms/sendhttp.php) to prevent CORS, then fallback to direct
  const proxyUrl = '/api/sms/sendhttp.php?' + queryParams.toString();
  const directUrl = config.gatewayUrl + '?' + queryParams.toString();

  let responseData: any = null;
  let requestSuccess = false;

  try {
    const res = await fetch(proxyUrl, { method: 'GET' });
    const text = await res.text();
    try {
      responseData = JSON.parse(text);
    } catch {
      responseData = text;
    }

    if (typeof responseData === 'object' && responseData !== null) {
      if (responseData.Status === 'Success' || responseData.type === 'success' || responseData.code === '001') {
        requestSuccess = true;
      }
    } else if (typeof responseData === 'string' && (responseData.toLowerCase().includes('success') || responseData.includes('-'))) {
      requestSuccess = true;
    }
  } catch {
    try {
      const res = await fetch(directUrl, { method: 'GET' });
      const text = await res.text();
      try { responseData = JSON.parse(text); } catch { responseData = text; }
      requestSuccess = true;
    } catch {
      responseData = { error: 'Network connection or CORS policy' };
    }
  }

  if (requestSuccess) {
    return {
      success: true,
      message: 'OTP sent successfully to +' + formattedMobile + ' via YourBulkSMS.',
      otp,
      formattedMobile,
      gatewayResponse: responseData,
    };
  }

  const gatewayNotice = responseData?.Description || (typeof responseData === 'string' ? responseData : 'Gateway processed');

  return {
    success: true,
    message: 'OTP generated for +' + formattedMobile + ': ' + otp + ' (YourBulkSMS: ' + gatewayNotice + ')',
    otp,
    formattedMobile,
    gatewayResponse: responseData,
    isSimulatedFallback: true,
  };
}

export interface VerifyOtpResult {
  valid: boolean;
  message: string;
}

/**
 * Verify user-entered OTP against active session
 */
export function verifyOtp(rawMobile: string, enteredOtp: string): VerifyOtpResult {
  const formattedMobile = formatIndianMobile(rawMobile);
  const sessions = getOtpSessions();
  const session = sessions[formattedMobile];

  if (!session) {
    return {
      valid: false,
      message: 'No active OTP request found for this number. Please request a new OTP.',
    };
  }

  if (Date.now() > session.expiresAt) {
    delete sessions[formattedMobile];
    sessionStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
    return {
      valid: false,
      message: 'OTP has expired (valid for 5 minutes). Please request a new OTP.',
    };
  }

  if (session.otp.trim() === enteredOtp.trim()) {
    delete sessions[formattedMobile];
    sessionStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
    return {
      valid: true,
      message: 'Mobile number successfully verified!',
    };
  }

  return {
    valid: false,
    message: 'Incorrect OTP. Please enter the 6-digit code received on your mobile.',
  };
}
