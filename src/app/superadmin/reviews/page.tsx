'use client';

import { useState } from 'react';
import {
  Search,
  Star,
  Flag,
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Review {
  id: string;
  reviewNo: string;
  studioName: string;
  studioId: string;
  memberNo: string;
  memberName: string;
  productName: string;
  rating: number;
  content: string;
  createdAt: string;
  isReported: boolean;
  reportCount: number;
  status: 'active' | 'hidden' | 'deleted';
}

const initialReviews: Review[] = [
  {
    id: '1',
    reviewNo: 'RV20240115001',
    studioName: '스튜디오 루미에르',
    studioId: 'S001',
    memberNo: 'U20230315001',
    memberName: '김**',
    productName: '증명사진 스탠다드',
    rating: 5,
    content: '정말 만족스러운 촬영이었어요! 사진사분이 친절하시고 분위기도 편안해서 자연스러운 표정이 나왔어요.',
    createdAt: '2024-01-15',
    isReported: false,
    reportCount: 0,
    status: 'active',
  },
  {
    id: '2',
    reviewNo: 'RV20240114001',
    studioName: '포토랩 강남',
    studioId: 'S002',
    memberNo: 'U20230620002',
    memberName: '이**',
    productName: '프로필 프리미엄',
    rating: 4,
    content: '전체적으로 만족스럽습니다. 다만 대기 시간이 조금 길었던 점이 아쉬웠어요.',
    createdAt: '2024-01-14',
    isReported: false,
    reportCount: 0,
    status: 'active',
  },
  {
    id: '3',
    reviewNo: 'RV20240113001',
    studioName: '더스튜디오',
    studioId: 'S003',
    memberNo: 'U20230910003',
    memberName: '박**',
    productName: '가족사진 베이직',
    rating: 2,
    content: '예약 시간보다 30분이나 늦게 시작했어요. 결과물은 괜찮았지만 시간 관리가 아쉽습니다.',
    createdAt: '2024-01-13',
    isReported: true,
    reportCount: 3,
    status: 'active',
  },
  {
    id: '4',
    reviewNo: 'RV20240112001',
    studioName: '라이트룸 사진관',
    studioId: 'S004',
    memberNo: 'U20240110004',
    memberName: '정**',
    productName: '증명사진 프리미엄',
    rating: 1,
    content: '최악이었습니다. 광고와 전혀 다른 퀄리티...',
    createdAt: '2024-01-12',
    isReported: true,
    reportCount: 5,
    status: 'hidden',
  },
  {
    id: '5',
    reviewNo: 'RV20240111001',
    studioName: '스튜디오 루미에르',
    studioId: 'S001',
    memberNo: 'U20230620002',
    memberName: '이**',
    productName: '프로필 베이직',
    rating: 5,
    content: '두 번째 방문인데 역시나 만족스러워요. 다음에도 올게요!',
    createdAt: '2024-01-11',
    isReported: false,
    reportCount: 0,
    status: 'active',
  },
];

const statusConfig = {
  active: { label: '활성', color: 'bg-green-500/20 text-green-400' },
  hidden: { label: '숨김', color: 'bg-yellow-500/20 text-yellow-400' },
  deleted: { label: '삭제', color: 'bg-red-500/20 text-red-400' },
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showReportedOnly, setShowReportedOnly] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.reviewNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studioName.includes(searchTerm) ||
      r.memberNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      filterRating === 'all' ||
      (filterRating === 'low' ? r.rating <= 2 : r.rating === parseInt(filterRating));
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchesReported = !showReportedOnly || r.isReported;
    return matchesSearch && matchesRating && matchesStatus && matchesReported;
  });

  const handleHideReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'hidden' as const } : r))
    );
  };

  const handleShowReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'active' as const } : r))
    );
  };

  const handleDeleteReview = (id: string) => {
    if (!confirm('이 리뷰를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'deleted' as const } : r))
    );
  };

  const stats = {
    total: reviews.length,
    reported: reviews.filter((r) => r.isReported).length,
    lowRating: reviews.filter((r) => r.rating <= 2).length,
    hidden: reviews.filter((r) => r.status === 'hidden').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">전체 후기 관리</h1>
        <p className="text-sm text-gray-400 mt-1">
          플랫폼 전체 후기를 모니터링하고 관리합니다
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-gray-400">전체 리뷰</p>
          <p className="text-xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-red-900/50 p-4">
          <p className="text-sm text-red-400">신고된 리뷰</p>
          <p className="text-xl font-bold text-white">{stats.reported}</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-yellow-900/50 p-4">
          <p className="text-sm text-yellow-400">저평점 (2점 이하)</p>
          <p className="text-xl font-bold text-white">{stats.lowRating}</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-gray-400">숨김 처리</p>
          <p className="text-xl font-bold text-white">{stats.hidden}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="리뷰번호, 스튜디오명, 회원번호 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">모든 평점</option>
            <option value="5">5점</option>
            <option value="4">4점</option>
            <option value="3">3점</option>
            <option value="low">2점 이하</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">모든 상태</option>
            <option value="active">활성</option>
            <option value="hidden">숨김</option>
            <option value="deleted">삭제</option>
          </select>

          <label className="flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={showReportedOnly}
              onChange={(e) => setShowReportedOnly(e.target.checked)}
              className="rounded border-gray-600 bg-gray-800 text-red-500 focus:ring-red-500"
            />
            <span className="text-sm text-white whitespace-nowrap">신고된 리뷰만</span>
          </label>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className={cn(
              'bg-gray-800 rounded-xl border p-4',
              review.isReported ? 'border-red-900/50' : 'border-gray-700',
              review.status === 'hidden' && 'opacity-60'
            )}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              {/* Review Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm text-gray-400">
                        {review.reviewNo}
                      </span>
                      {review.isReported && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-medium rounded">
                          <Flag size={12} />
                          신고 {review.reportCount}
                        </span>
                      )}
                      <span
                        className={cn(
                          'px-2 py-0.5 text-xs font-medium rounded',
                          statusConfig[review.status].color
                        )}
                      >
                        {statusConfig[review.status].label}
                      </span>
                    </div>
                    <p className="text-white font-medium">{review.studioName}</p>
                    <p className="text-sm text-gray-400">
                      {review.productName} · 회원 {review.memberNo}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={cn(
                          i < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600'
                        )}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 mb-2">{review.content}</p>

                <p className="text-xs text-gray-500">{review.createdAt}</p>
              </div>

              {/* Actions */}
              <div className="flex lg:flex-col gap-2">
                <button
                  onClick={() => setSelectedReview(review)}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600"
                >
                  <Eye size={14} />
                  상세
                </button>
                {review.status === 'active' ? (
                  <button
                    onClick={() => handleHideReview(review.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-yellow-600/20 text-yellow-400 text-sm rounded-lg hover:bg-yellow-600/30"
                  >
                    <AlertTriangle size={14} />
                    숨김
                  </button>
                ) : review.status === 'hidden' ? (
                  <button
                    onClick={() => handleShowReview(review.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-green-600/20 text-green-400 text-sm rounded-lg hover:bg-green-600/30"
                  >
                    <CheckCircle size={14} />
                    표시
                  </button>
                ) : null}
                {review.status !== 'deleted' && (
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-600/20 text-red-400 text-sm rounded-lg hover:bg-red-600/30"
                  >
                    <Trash2 size={14} />
                    삭제
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredReviews.length === 0 && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center">
            <p className="text-gray-400">조건에 맞는 리뷰가 없습니다</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setSelectedReview(null)}
          />
          <div className="relative bg-gray-800 rounded-xl w-full max-w-md p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">리뷰 상세</h2>
              <button
                onClick={() => setSelectedReview(null)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">리뷰번호</span>
                <span className="font-mono text-white">{selectedReview.reviewNo}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">스튜디오</span>
                <span className="text-white">{selectedReview.studioName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">회원번호</span>
                <span className="font-mono text-white">{selectedReview.memberNo}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">상품</span>
                <span className="text-white">{selectedReview.productName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">평점</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={cn(
                        i < selectedReview.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-600'
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="py-2 border-b border-gray-700">
                <span className="text-gray-400 block mb-2">리뷰 내용</span>
                <p className="text-white">{selectedReview.content}</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">상태</span>
                <span
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded',
                    statusConfig[selectedReview.status].color
                  )}
                >
                  {statusConfig[selectedReview.status].label}
                </span>
              </div>
              {selectedReview.isReported && (
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">신고 횟수</span>
                  <span className="text-red-400">{selectedReview.reportCount}회</span>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="text-gray-400">작성일</span>
                <span className="text-gray-300">{selectedReview.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
