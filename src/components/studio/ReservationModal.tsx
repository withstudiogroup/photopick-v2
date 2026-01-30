'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/common';
import { Product, Studio } from '@/types';
import { formatPrice, cn } from '@/lib/utils';

interface ReservationModalProps {
  studio: Studio;
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: Date, time: string) => void;
}

export default function ReservationModal({
  studio,
  product,
  isOpen,
  onClose,
  onConfirm,
}: ReservationModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (!isOpen) return null;

  const discountedPrice = product.discountRate > 0
    ? Math.floor(product.basePrice * (1 - product.discountRate / 100))
    : product.basePrice;

  const times = [
    '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00',
  ];

  const unavailableTimes = ['12:00', '15:00'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDateDisabled = (date: Date) => {
    return date < today;
  };

  const isSameDate = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const formatMonthYear = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm(selectedDate, selectedTime);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold">날짜 및 시간 선택</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft size={20} />
              </button>
              <span className="font-semibold text-gray-900">{formatMonthYear(currentMonth)}</span>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                <span
                  key={day}
                  className={cn(
                    'text-xs font-medium py-2',
                    index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-500'
                  )}
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="h-10" />;
                }

                const disabled = isDateDisabled(date);
                const isSelected = isSameDate(date, selectedDate);
                const isToday = isSameDate(date, today);
                const dayOfWeek = date.getDay();

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => !disabled && setSelectedDate(date)}
                    disabled={disabled}
                    className={cn(
                      'h-10 rounded-lg text-sm font-medium transition-all',
                      disabled && 'text-gray-300 cursor-not-allowed',
                      !disabled && !isSelected && 'hover:bg-gray-100',
                      !disabled && dayOfWeek === 0 && 'text-red-500',
                      !disabled && dayOfWeek === 6 && 'text-blue-500',
                      isSelected && 'bg-[#0152CC] text-white',
                      isToday && !isSelected && 'border border-[#0152CC] text-[#0152CC]'
                    )}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">시간 선택</h3>
              <div className="grid grid-cols-5 gap-2">
                {times.map((time) => {
                  const isUnavailable = unavailableTimes.includes(time);
                  const isSelected = selectedTime === time;

                  return (
                    <button
                      key={time}
                      onClick={() => !isUnavailable && setSelectedTime(time)}
                      disabled={isUnavailable}
                      className={cn(
                        'py-2.5 rounded-lg text-sm font-medium transition-all',
                        isUnavailable && 'bg-gray-100 text-gray-300 cursor-not-allowed',
                        !isUnavailable && !isSelected && 'border border-gray-200 hover:border-[#0152CC] hover:text-[#0152CC]',
                        isSelected && 'bg-[#0152CC] text-white'
                      )}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-gray-500">* 회색: 예약 불가</p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">{product.name}</p>
              <p className="font-bold text-lg text-gray-900">{formatPrice(discountedPrice)}원</p>
            </div>
            {selectedDate && selectedTime && (
              <div className="text-right">
                <p className="text-sm text-gray-500">선택한 일시</p>
                <p className="font-medium text-gray-900">
                  {selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })} {selectedTime}
                </p>
              </div>
            )}
          </div>
          <Button
            fullWidth
            size="lg"
            disabled={!selectedDate || !selectedTime}
            onClick={handleConfirm}
          >
            {selectedDate && selectedTime ? (
              <span className="flex items-center gap-2">
                <Check size={18} />
                선택 완료
              </span>
            ) : (
              '날짜와 시간을 선택해주세요'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
