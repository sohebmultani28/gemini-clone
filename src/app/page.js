'use client';

import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import OTPInput from '@/components/auth/OTPInput';

export default function Home() {
  const [step, setStep] = useState('login');
  const [phoneData, setPhoneData] = useState({ countryCode: '', phoneNumber: '' });

  const handleOTPSent = (countryCode, phoneNumber) => {
    setPhoneData({ countryCode, phoneNumber });
    setStep('otp');
  };

  const handleOTPVerified = () => {
    // Direct redirect without auth check for now
    window.location.href = '/dashboard';
  };

  const handleBackToLogin = () => {
    setStep('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {step === 'login' ? (
        <LoginForm onOTPSent={handleOTPSent} />
      ) : (
        <OTPInput
          phoneNumber={phoneData.phoneNumber}
          countryCode={phoneData.countryCode}
          onVerify={handleOTPVerified}
          onBack={handleBackToLogin}
        />
      )}
    </div>
  );
}