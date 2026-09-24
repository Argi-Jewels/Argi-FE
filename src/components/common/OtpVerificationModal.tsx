import React, { useState, useEffect, useRef } from 'react';
import { X, ShieldCheck, Smartphone, ArrowRight, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { sendOtpSms, verifyOtp, SendOtpResult } from '../../services/smsOtpService';
import { useStore } from '../../context/StoreContext';
import confetti from 'canvas-confetti';

interface OtpVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPhone?: string;
  onVerified: (verifiedPhone: string) => void;
  title?: string;
  subtitle?: string;
}

export const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  isOpen,
  onClose,
  initialPhone = '',
  onVerified,
  title = 'Verify Mobile Number',
  subtitle = 'Verify your phone number for secure delivery notifications & order updates',
}) => {
  const { loginWithGoogle, setIsLoginModalOpen } = useStore();
  const [phone, setPhone] = useState(initialPhone);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sendResult, setSendResult] = useState<SendOtpResult | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (initialPhone) {
      const clean = initialPhone.replace(/\D/g, '').replace(/^91/, '');
      setPhone(clean);
    }
  }, [initialPhone]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (step === 'otp' && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    const cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSending(true);
    try {
      const res = await sendOtpSms(cleanDigits);
      setSendResult(res);
      setStep('otp');
      setCountdown(60);
      setCanResend(false);
      setOtpDigits(['', '', '', '', '', '']);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch {
      setErrorMessage('Failed to connect to YourBulkSMS gateway. Please retry.');
    } finally {
      setIsSending(false);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    const digit = val.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify when 6 digits are entered
    if (index === 5 && digit && newDigits.every(d => d !== '')) {
      handleVerify(newDigits.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (otpString?: string) => {
    const code = otpString || otpDigits.join('');
    if (code.length < 6) {
      setErrorMessage('Please enter all 6 digits of the OTP.');
      return;
    }

    setIsVerifying(true);
    setErrorMessage('');

    setTimeout(() => {
      const cleanPhone = phone.replace(/\D/g, '');
      const result = verifyOtp(cleanPhone, code);

      if (result.valid) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#083335', '#DFC168', '#C5A059', '#10b981'],
        });
        onVerified(cleanPhone);
        onClose();
      } else {
        setErrorMessage(result.message);
      }
      setIsVerifying(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-[#083335]/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-700 transition-colors rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-[#083335] text-[#DFC168] flex items-center justify-center border border-[#0c4346] shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#083335]">
              YourBulkSMS Gateway Verified
            </span>
            <h3 className="font-serif text-xl font-bold text-[#083335]">{title}</h3>
          </div>
        </div>

        <p className="text-xs text-stone-500 mb-6">{subtitle}</p>

        {/* Gateway Badge */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#FAF7F2] border border-[#E5E0DC] rounded-xl text-[11px] mb-5">
          <div className="flex items-center gap-1.5 text-stone-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Gateway: <strong>YourBulkSMS (Route 2)</strong></span>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
            Live Token Active
          </span>
        </div>

        {errorMessage && (
          <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {step === 'phone' ? (
          <div className="space-y-4">
            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={() => {
                onClose();
                setIsLoginModalOpen(true);
              }}
              className="w-full py-3 px-4 bg-white hover:bg-stone-50 active:bg-stone-100 text-[#1f1f1f] font-semibold text-xs rounded-xl border border-[#DADCE0] hover:border-stone-400 shadow-xs flex items-center justify-center gap-3 transition-all duration-200 transform active:scale-98"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="tracking-wide text-[13px]">Continue with Google</span>
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#E5E0DC]" />
              <span className="flex-shrink mx-3 text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400">
                or use mobile otp
              </span>
              <div className="flex-grow border-t border-[#E5E0DC]" />
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Mobile Number (India)
              </label>
              <div className="relative flex rounded-xl border border-[#E5E0DC] bg-[#FBF9F7] focus-within:border-[#083335] transition-colors">
                <div className="flex items-center px-3 bg-stone-100 border-r border-[#E5E0DC] rounded-l-xl text-xs font-bold text-[#083335]">
                  <span>???? +91</span>
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit mobile no."
                  className="flex-1 px-3 py-2.5 bg-transparent text-sm font-mono focus:outline-none"
                  autoFocus
                />
              </div>
              <p className="text-[10px] text-stone-400 mt-1">
                Standard SMS charges do not apply. An instant 6-digit OTP will be dispatched.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSending || phone.length < 10}
              className="w-full py-3 bg-[#083335] hover:bg-[#052224] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Dispatching OTP via YourBulkSMS...</span>
                </>
              ) : (
                <>
                  <span>Send Verification OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">
                OTP sent to: <strong className="text-[#083335] font-mono">+91 {phone}</strong>
              </span>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-[#083335] font-bold text-[11px] hover:underline"
              >
                Change No.
              </button>
            </div>

            {/* Test Helper Banner if simulated fallback */}
            {sendResult?.isSimulatedFallback && sendResult.otp && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5" /> Testing Code Available:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const digits = sendResult.otp!.split('');
                      setOtpDigits(digits);
                      handleVerify(sendResult.otp);
                    }}
                    className="text-[10px] font-bold bg-[#083335] text-[#DFC168] px-2 py-0.5 rounded hover:bg-[#052224]"
                  >
                    Auto-Fill Code
                  </button>
                </div>
                <div className="font-mono font-bold text-sm tracking-widest text-[#083335]">
                  {sendResult.otp}
                </div>
                <div className="text-[10px] text-stone-500">
                  (YourBulkSMS note: {sendResult.gatewayResponse?.Description || 'Gateway connected'}). To receive directly on phone, map your approved DLT Sender-ID.
                </div>
              </div>
            )}

            {/* 6 Digit Input Boxes */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2 text-center">
                Enter 6-Digit Verification Code
              </label>
              <div className="flex justify-between gap-2">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-12 h-13 text-center text-xl font-bold font-mono bg-[#FBF9F7] border border-[#E5E0DC] rounded-xl focus:outline-none focus:border-[#083335] focus:bg-white focus:ring-2 focus:ring-[#083335]/20 transition-all"
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleVerify()}
              disabled={isVerifying || otpDigits.some(d => !d)}
              className="w-full py-3 bg-[#083335] hover:bg-[#052224] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Verify & Proceed</span>
                </>
              )}
            </button>

            {/* Resend Countdown */}
            <div className="text-center text-xs text-stone-500">
              {canResend ? (
                <button
                  type="button"
                  onClick={() => handleSendOtp()}
                  className="text-[#083335] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend OTP via YourBulkSMS</span>
                </button>
              ) : (
                <span>Resend OTP in <strong>{countdown}s</strong></span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
