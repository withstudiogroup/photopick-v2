'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  MessageSquare,
  Flag,
  CheckCircle,
  Search,
  Filter,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Review {
  id: string;
  customerName: string;
  customerImage: string;
  productName: string;
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
  reply?: string;
  repliedAt?: string;
  isReported: boolean;
}

// 임시 데이터
const initialReviews: Review[] = [
  {
    id: '1',
    customerName: '김민지',
    customerImage: 'https://i.pravatar.cc/150?img=1',
    productName: '증명사진 스탠다드',
    rating: 5,
    content:
      '정말 만족스러운 촬영이었어요! 사진사분이 친절하시고 분위기도 편안해서 자연스러운 표정이 나왔어요. 보정도 자연스럽게 잘 해주셨습니다.',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    ],
    createdAt: '2024-01-15',
    reply:
      '김민지 고객님, 소중한 후기 감사합니다! 다음에도 좋은 서비스로 보답하겠습니다.',
    repliedAt: '2024-01-16',
    isReported: false,
  },
  {
    id: '2',
    customerName: '이서준',
    customerImage: 'https://i.pravatar.cc/150?img=2',
    productName: '프로필 프리미엄',
    rating: 4,
    content:
      '전체적으로 만족스럽습니다. 다만 대기 시간이 조금 길었던 점이 아쉬웠어요. 결과물은 훌륭합니다!',
    images: [],
    createdAt: '2024-01-14',
    isReported: false,
  },
  {
    id: '3',
    customerName: '박지현',
    customerImage: 'https://i.pravatar.cc/150?img=3',
    productName: '가족사진 베이직',
    rating: 5,
    content:
      '가족 모두 만족했어요. 아이가 많이 움직여서 걱정했는데 사진사분이 잘 달래주셔서 예쁜 사진이 나왔습니다. 추천해요!',
    images: [
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200',
      'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=200',
    ],
    createdAt: '2024-01-13',
    isReported: false,
  },
  {
    id: '4',
    customerName: '최유진',
    customerImage: 'https://i.pravatar.cc/150?img=4',
    productName: '증명사진 스탠다드',
    rating: 2,
    content: '예약 시간보다 30분이나 늦게 시작했어요. 결과물은 괜찮았지만 시간 관리가 아쉽습니다.',
    images: [],
    createdAt: '2024-01-12',
    isReported: true,
  },
];

const ratingFilters = [
  { label: '전체', value: 'all' },
  { label: '5점', value: '5' },
  { label: '4점', value: '4' },
  { label: '3점', value: '3' },
  { label: '2점 이하', value: '2' },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedRating, setSelectedRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showOnlyNoReply, setShowOnlyNoReply] = useState(false);

  const filteredReviews = reviews.filter((review) => {
    const matchesRating =
      selectedRating === 'all' ||
      (selectedRating === '2'
        ? review.rating <= 2
        : review.rating === parseInt(selectedRating));
    const matchesSearch =
      review.customerName.includes(searchTerm) ||
      review.content.includes(searchTerm) ||
      review.productName.includes(searchTerm);
    const matchesNoReply = !showOnlyNoReply || !review.reply;
    return matchesRating && matchesSearch && matchesNoReply;
  });

  const handleReply = (reviewId: string) => {
    if (!replyContent.trim()) return;

    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              reply: replyContent,
              repliedAt: new Date().toISOString().split('T')[0],
            }
          : review
      )
    );
    setReplyingTo(null);
    setReplyContent('');
  };

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (rating) => reviews.filter((r) => r.rating === rating).length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">리뷰 관리</h1>
        <p className="text-sm text-gray-500 mt-1">
          고객 리뷰를 확인하고 답변을 관리합니다
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <Star size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">평균 평점</p>
              <p className="text-xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <MessageSquare size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">총 리뷰</p>
              <p className="text-xl font-bold text-gray-900">{reviews.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">답변 완료</p>
              <p className="text-xl font-bold text-gray-900">
                {reviews.filter((r) => r.reply).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <Flag size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">미답변</p>
              <p className="text-xl font-bold text-gray-900">
                {reviews.filter((r) => !r.reply).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h2 className="font-bold text-gray-900 mb-4">평점 분포</h2>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="w-8 text-sm text-gray-600">{rating}점</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{
                    width: `${(ratingCounts[index] / reviews.length) * 100}%`,
                  }}
                />
              </div>
              <span className="w-8 text-sm text-gray-500 text-right">
                {ratingCounts[index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="고객명, 상품명, 리뷰 내용 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
            />
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <div className="flex gap-1">
              {ratingFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedRating(filter.value)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    selectedRating === filter.value
                      ? 'bg-[#0152CC] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* No Reply Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyNoReply}
              onChange={(e) => setShowOnlyNoReply(e.target.checked)}
              className="rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
            />
            <span className="text-sm text-gray-600">미답변만</span>
          </label>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className={cn(
              'bg-white rounded-xl border p-4',
              review.isReported ? 'border-red-200' : 'border-gray-200'
            )}
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Image
                  src={review.customerImage}
                  alt={review.customerName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {review.customerName}
                    </span>
                    {review.isReported && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                        신고됨
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{review.productName}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={cn(
                        i < review.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      )}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">{review.createdAt}</p>
              </div>
            </div>

            {/* Review Content */}
            <p className="text-gray-700 mb-3">{review.content}</p>

            {/* Review Images */}
            {review.images.length > 0 && (
              <div className="flex gap-2 mb-3">
                {review.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`리뷰 이미지 ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Reply Section */}
            {review.reply ? (
              <div className="bg-gray-50 rounded-lg p-3 mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-[#0152CC]">
                    사장님 답변
                  </span>
                  <span className="text-xs text-gray-400">
                    {review.repliedAt}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{review.reply}</p>
              </div>
            ) : replyingTo === review.id ? (
              <div className="mt-3">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="답변을 입력해주세요..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent resize-none"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyContent('');
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => handleReply(review.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#0152CC] hover:bg-[#0141a3] rounded-lg"
                  >
                    답변 등록
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setReplyingTo(review.id)}
                className="mt-3 text-sm text-[#0152CC] font-medium hover:underline"
              >
                답변 작성
              </button>
            )}
          </div>
        ))}

        {filteredReviews.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">조건에 맞는 리뷰가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
