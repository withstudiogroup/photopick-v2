'use client';

import { CreditCard, Wallet, Building2, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

const methods = [
  {
    id: 'card',
    name: '카드결제',
    icon: CreditCard,
    description: '신용/체크카드',
  },
  {
    id: 'easy',
    name: '간편결제',
    icon: Smartphone,
    description: '카카오페이, 네이버페이, 토스',
  },
  {
    id: 'bank',
    name: '무통장입금',
    icon: Building2,
    description: '가상계좌 발급',
  },
  {
    id: 'photopick',
    name: 'PhotoPick 페이',
    icon: Wallet,
    description: '추가 2% 적립',
  },
];

export default function PaymentMethod({
  selectedMethod,
  onMethodChange,
}: PaymentMethodProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">결제 수단</h2>

      <div className="space-y-2">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              className={cn(
                'w-full flex items-center gap-3 p-4 rounded-xl border transition-all',
                isSelected
                  ? 'border-[#0152CC] bg-[#F0F7FF]'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                  isSelected ? 'border-[#0152CC]' : 'border-gray-300'
                )}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0152CC]" />
                )}
              </div>

              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  isSelected ? 'bg-[#0152CC] text-white' : 'bg-gray-100 text-gray-500'
                )}
              >
                <Icon size={20} />
              </div>

              <div className="flex-1 text-left">
                <p className={cn('font-medium', isSelected ? 'text-[#0152CC]' : 'text-gray-900')}>
                  {method.name}
                </p>
                <p className="text-xs text-gray-500">{method.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
