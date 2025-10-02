'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneSchema } from '@/lib/validation';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Loader2, Phone } from 'lucide-react';

export default function LoginForm({ onOTPSent }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: '+91',
      phoneNumber: '',
    },
  });

  // Fetch countries data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags');
        const formattedCountries = response.data
          .filter((country) => country.idd?.root)
          .map((country) => ({
            name: country.name.common,
            code: country.cca2,
            dialCode: country.idd.root + (country.idd.suffixes?.[0] || ''),
            flag: country.flags.svg,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(formattedCountries);
        setLoadingCountries(false);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        
        // Agar API fail ho jaye toh ye countries dikhao
        const fallbackCountries = [
          { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳' },
          { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸' },
          { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧' },
        ];
        
        setCountries(fallbackCountries);
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    // Simulate OTP send
    setTimeout(() => {
      setLoading(false);
      toast.success('OTP sent successfully!');
      onOTPSent(data.countryCode, data.phoneNumber);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
          <Phone className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your phone number to continue
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Country Code Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Country Code
          </label>
          <select
            {...register('countryCode')}
            disabled={loadingCountries}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
          >
            {loadingCountries ? (
              <option>Loading countries...</option>
            ) : (
              countries.map((country) => (
                <option key={country.code} value={country.dialCode}>
                  {country.flag} {country.name} ({country.dialCode})
                </option>
              ))
            )}
          </select>
          {errors.countryCode && (
            <p className="mt-1 text-sm text-red-600">{errors.countryCode.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            {...register('phoneNumber')}
            placeholder="1234567890"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || loadingCountries}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Sending OTP...
            </>
          ) : (
            'Send OTP'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}