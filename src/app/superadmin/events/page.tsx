'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Tag,
  Eye,
  EyeOff,
  X,
  Gift,
  Store,
  Check,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Studio {
  id: string;
  studioId: string;
  name: string;
  grade: 'basic' | 'premium' | 'vip';
  category: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'discount' | 'coupon' | 'special';
  discountRate?: number;
  couponCode?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  participantCount: number;
  participatingStudios: string[];
}

const mockStudios: Studio[] = [
  { id: '1', studioId: 'S001', name: '스튜디오 루미에르', grade: 'vip', category: '증명사진' },
  { id: '2', studioId: 'S002', name: '포토랩 강남', grade: 'premium', category: '프로필' },
  { id: '3', studioId: 'S003', name: '더스튜디오', grade: 'basic', category: '가족사진' },
  { id: '4', studioId: 'S004', name: '라이트룸 사진관', grade: 'premium', category: '증명사진' },
  { id: '5', studioId: 'S005', name: '포토에디션', grade: 'vip', category: '웨딩' },
  { id: '6', studioId: 'S006', name: '스냅샷 스튜디오', grade: 'basic', category: '프로필' },
  { id: '7', studioId: 'S007', name: '시그니처 포토', grade: 'premium', category: '가족사진' },
  { id: '8', studioId: 'S008', name: '클래식 스튜디오', grade: 'basic', category: '증명사진' },
];

const initialEvents: Event[] = [
  {
    id: '1',
    title: '신년 맞이 20% 할인',
    description: '2024년 새해를 맞아 모든 증명사진 촬영 20% 할인!',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600',
    type: 'discount',
    discountRate: 20,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    isActive: true,
    participantCount: 1234,
    participatingStudios: ['S001', 'S002', 'S004'],
  },
  {
    id: '2',
    title: '첫 예약 5,000원 할인 쿠폰',
    description: '신규 가입 고객 대상 첫 예약 시 사용 가능한 5,000원 할인 쿠폰',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
    type: 'coupon',
    couponCode: 'WELCOME2024',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    participantCount: 5678,
    participatingStudios: ['S001', 'S002', 'S003', 'S004', 'S005', 'S006', 'S007', 'S008'],
  },
  {
    id: '3',
    title: '프리미엄 스튜디오 특별전',
    description: '엄선된 프리미엄 스튜디오에서 특별한 촬영 경험을 만나보세요',
    image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=600',
    type: 'special',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    isActive: true,
    participantCount: 890,
    participatingStudios: ['S001', 'S005'],
  },
  {
    id: '4',
    title: '가족사진 시즌 이벤트',
    description: '가족과 함께하는 따뜻한 촬영, 15% 할인 혜택',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600',
    type: 'discount',
    discountRate: 15,
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    isActive: false,
    participantCount: 2345,
    participatingStudios: ['S003', 'S007'],
  },
];

const typeConfig = {
  discount: { label: '할인', color: 'bg-red-500', icon: Tag },
  coupon: { label: '쿠폰', color: 'bg-blue-500', icon: Gift },
  special: { label: '특별전', color: 'bg-purple-500', icon: Calendar },
};

const gradeConfig = {
  basic: { label: '기본', color: 'bg-gray-500' },
  premium: { label: '프리미엄', color: 'bg-blue-500' },
  vip: { label: 'VIP', color: 'bg-yellow-500' },
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [selectedEventForStudios, setSelectedEventForStudios] = useState<Event | null>(null);
  const [studioSearchTerm, setStudioSearchTerm] = useState('');
  const [tempSelectedStudios, setTempSelectedStudios] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    type: 'discount' as 'discount' | 'coupon' | 'special',
    discountRate: 0,
    couponCode: '',
    startDate: '',
    endDate: '',
    participatingStudios: [] as string[],
  });

  const handleOpenModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        image: event.image,
        type: event.type,
        discountRate: event.discountRate || 0,
        couponCode: event.couponCode || '',
        startDate: event.startDate,
        endDate: event.endDate,
        participatingStudios: event.participatingStudios,
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        type: 'discount',
        discountRate: 0,
        couponCode: '',
        startDate: '',
        endDate: '',
        participatingStudios: [],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleOpenStudioModal = (event: Event) => {
    setSelectedEventForStudios(event);
    setTempSelectedStudios([...event.participatingStudios]);
    setStudioSearchTerm('');
    setIsStudioModalOpen(true);
  };

  const handleCloseStudioModal = () => {
    setIsStudioModalOpen(false);
    setSelectedEventForStudios(null);
    setTempSelectedStudios([]);
  };

  const handleSaveStudios = () => {
    if (selectedEventForStudios) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === selectedEventForStudios.id
            ? { ...ev, participatingStudios: tempSelectedStudios }
            : ev
        )
      );
    }
    handleCloseStudioModal();
  };

  const toggleStudioSelection = (studioId: string) => {
    setTempSelectedStudios((prev) =>
      prev.includes(studioId)
        ? prev.filter((id) => id !== studioId)
        : [...prev, studioId]
    );
  };

  const selectAllStudios = () => {
    setTempSelectedStudios(mockStudios.map((s) => s.studioId));
  };

  const deselectAllStudios = () => {
    setTempSelectedStudios([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id
            ? { ...ev, ...formData }
            : ev
        )
      );
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        participantCount: 0,
      };
      setEvents((prev) => [...prev, newEvent]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (!confirm('이 이벤트를 삭제하시겠습니까?')) return;
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, isActive: !ev.isActive } : ev
      )
    );
  };

  const filteredStudios = mockStudios.filter(
    (studio) =>
      studio.name.includes(studioSearchTerm) ||
      studio.studioId.toLowerCase().includes(studioSearchTerm.toLowerCase()) ||
      studio.category.includes(studioSearchTerm)
  );

  const activeEvents = events.filter((e) => e.isActive);
  const endedEvents = events.filter((e) => !e.isActive);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">이벤트 관리</h1>
          <p className="text-sm text-gray-400 mt-1">
            프로모션과 이벤트를 등록하고 참여 업체를 지정합니다
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          <Plus size={18} />
          이벤트 등록
        </button>
      </div>

      {/* Active Events */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">
          진행중인 이벤트 ({activeEvents.length})
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {activeEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              studios={mockStudios}
              onEdit={() => handleOpenModal(event)}
              onDelete={() => handleDelete(event.id)}
              onToggle={() => handleToggleActive(event.id)}
              onManageStudios={() => handleOpenStudioModal(event)}
            />
          ))}
          {activeEvents.length === 0 && (
            <div className="col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
              <p className="text-gray-400">진행중인 이벤트가 없습니다</p>
            </div>
          )}
        </div>
      </div>

      {/* Ended Events */}
      {endedEvents.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">
            종료된 이벤트 ({endedEvents.length})
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {endedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                studios={mockStudios}
                onEdit={() => handleOpenModal(event)}
                onDelete={() => handleDelete(event.id)}
                onToggle={() => handleToggleActive(event.id)}
                onManageStudios={() => handleOpenStudioModal(event)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Event Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={handleCloseModal}
          />
          <div className="relative bg-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">
                {editingEvent ? '이벤트 수정' : '이벤트 등록'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  이벤트명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  이벤트 유형 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {(['discount', 'coupon', 'special'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={cn(
                        'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        formData.type === type
                          ? `${typeConfig[type].color} text-white`
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      )}
                    >
                      {typeConfig[type].label}
                    </button>
                  ))}
                </div>
              </div>

              {formData.type === 'discount' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    할인율 (%)
                  </label>
                  <input
                    type="number"
                    value={formData.discountRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountRate: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="0"
                    max="100"
                  />
                </div>
              )}

              {formData.type === 'coupon' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    쿠폰 코드
                  </label>
                  <input
                    type="text"
                    value={formData.couponCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        couponCode: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="예: WELCOME2024"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  설명
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  이미지 URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    시작일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    종료일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-3">
                <p className="text-sm text-gray-400">
                  참여 업체는 이벤트 등록 후 &apos;참여업체 관리&apos; 버튼을 통해 지정할 수 있습니다.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  {editingEvent ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Studio Selection Modal */}
      {isStudioModalOpen && selectedEventForStudios && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={handleCloseStudioModal}
          />
          <div className="relative bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden p-6 border border-gray-700 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">참여 업체 관리</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {selectedEventForStudios.title}
                </p>
              </div>
              <button
                onClick={handleCloseStudioModal}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search and Select All */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="스튜디오명, 스튜디오ID, 카테고리 검색"
                  value={studioSearchTerm}
                  onChange={(e) => setStudioSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={selectAllStudios}
                  className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600"
                >
                  전체 선택
                </button>
                <button
                  onClick={deselectAllStudios}
                  className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600"
                >
                  전체 해제
                </button>
              </div>
            </div>

            {/* Selected Count */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-sm text-gray-400">
                전체 {mockStudios.length}개 업체
              </span>
              <span className="text-sm text-purple-400 font-medium">
                {tempSelectedStudios.length}개 선택됨
              </span>
            </div>

            {/* Studio List */}
            <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
              {filteredStudios.map((studio) => {
                const isSelected = tempSelectedStudios.includes(studio.studioId);
                return (
                  <button
                    key={studio.id}
                    onClick={() => toggleStudioSelection(studio.studioId)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left',
                      isSelected
                        ? 'bg-purple-600/20 border-purple-500'
                        : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                    )}
                  >
                    <div
                      className={cn(
                        'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0',
                        isSelected
                          ? 'bg-purple-600 border-purple-600'
                          : 'border-gray-500'
                      )}
                    >
                      {isSelected && <Check size={14} className="text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white truncate">
                          {studio.name}
                        </span>
                        <span
                          className={cn(
                            'px-1.5 py-0.5 text-xs rounded text-white flex-shrink-0',
                            gradeConfig[studio.grade].color
                          )}
                        >
                          {gradeConfig[studio.grade].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <span className="font-mono">{studio.studioId}</span>
                        <span>•</span>
                        <span>{studio.category}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
              {filteredStudios.length === 0 && (
                <div className="py-8 text-center text-gray-400">
                  검색 결과가 없습니다
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-3 pt-4 mt-4 border-t border-gray-700">
              <button
                onClick={handleCloseStudioModal}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSaveStudios}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                저장 ({tempSelectedStudios.length}개 업체)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EventCard({
  event,
  studios,
  onEdit,
  onDelete,
  onToggle,
  onManageStudios,
}: {
  event: Event;
  studios: Studio[];
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  onManageStudios: () => void;
}) {
  const TypeIcon = typeConfig[event.type].icon;
  const participatingStudioNames = event.participatingStudios
    .map((id) => studios.find((s) => s.studioId === id)?.name)
    .filter(Boolean);

  return (
    <div
      className={cn(
        'bg-gray-800 rounded-xl border overflow-hidden',
        event.isActive ? 'border-gray-700' : 'border-gray-700/50 opacity-60'
      )}
    >
      <div className="relative h-40">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <span
            className={cn(
              'px-2 py-1 text-xs font-medium rounded text-white',
              typeConfig[event.type].color
            )}
          >
            <TypeIcon size={12} className="inline mr-1" />
            {typeConfig[event.type].label}
            {event.type === 'discount' && event.discountRate && (
              <> {event.discountRate}%</>
            )}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <button
            onClick={onToggle}
            className="p-1.5 bg-gray-900/80 rounded hover:bg-gray-900"
          >
            {event.isActive ? (
              <Eye size={16} className="text-green-400" />
            ) : (
              <EyeOff size={16} className="text-red-400" />
            )}
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white mb-1">{event.title}</h3>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {event.description}
        </p>

        {/* Participating Studios Info */}
        <div className="bg-gray-700/50 rounded-lg p-2 mb-3">
          <div className="flex items-center gap-2 text-xs">
            <Store size={14} className="text-purple-400 flex-shrink-0" />
            <span className="text-gray-300">
              참여 업체: <span className="text-white font-medium">{event.participatingStudios.length}개</span>
            </span>
          </div>
          {participatingStudioNames.length > 0 && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-1 ml-5">
              {participatingStudioNames.slice(0, 3).join(', ')}
              {participatingStudioNames.length > 3 && ` 외 ${participatingStudioNames.length - 3}개`}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>
            {event.startDate} ~ {event.endDate}
          </span>
          <span className="text-purple-400">
            참여 {event.participantCount.toLocaleString()}명
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onManageStudios}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-600/20 text-purple-400 text-sm font-medium rounded-lg hover:bg-purple-600/30 transition-colors"
          >
            <Store size={14} />
            참여업체
          </button>
          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Edit2 size={14} />
            수정
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
