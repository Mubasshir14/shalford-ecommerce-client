/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Star, Send, User, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  createReview,
  deleteReview,
  getProductReview,
} from "@/components/Services/Review";
import { useUser } from "@/components/context/UserContext";
import Image from "next/image";

interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
    image?: string;
  };
  comment: string;
  rating: number;
  createdAt: string;
}

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const { user } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch reviews
  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getProductReview(productId);
      setReviews(response?.data || []);
    } catch (err: any) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  // Submit review
  const handleSubmitReview = async () => {
    const toastId = "submit-review";

    if (!user) {
      toast.error("Please log in to submit a review", { id: toastId });
      return;
    }

    if (user.role !== "user") {
      toast.error("Only customers can submit reviews", { id: toastId });
      return;
    }

    if (rating === 0) {
      toast.warning("Please select a rating", { id: toastId });
      return;
    }

    if (!comment.trim()) {
      toast.warning("Please write a comment", { id: toastId });
      return;
    }

    try {
      setSubmitting(true);
      const reviewData = {
        product: productId,
        rating: rating.toString(),
        comment: comment.trim(),
        user: user.userId,
      };
      const response = await createReview(reviewData);

      if (response?.success) {
        toast.success("Review submitted successfully!", { id: toastId });
        setRating(0);
        setComment("");
        fetchReviews();
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to submit review";
      toast.error(message, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteReview = async (reviewId: string) => {
    const toastId = "delete-review";

    try {
      setLoading(true);
      await deleteReview(reviewId);
      toast.success("Review deleted successfully!", { id: toastId });
      fetchReviews();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete review",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 space-y-8">
      {/* Reviews Header */}
      <div className="border-t border-amber-200 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-amber-700">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(Number(averageRating))
                        ? "fill-amber-500 text-amber-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-amber-600">
                {averageRating} out of 5
              </span>
              <span className="text-gray-500 text-sm">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>

        {user && user.role === "user" && (
          <div className="bg-gradient-to-br from-amber-50/50 to-white border border-amber-200 rounded-xl p-6 mb-8 shadow-md">
            <h3 className="text-xl font-semibold text-amber-700 mb-4">
              Write a Review
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-amber-700 mb-2">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform  hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating)
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300"
                      }`}
                    />
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                rows={4}
              />
            </div>

            <Button
              onClick={handleSubmitReview}
              disabled={submitting || rating === 0 || !comment.trim()}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 bg-amber-50/30 rounded-lg border border-amber-200">
              <p className="text-gray-600">
                No reviews yet. Be the first to review this product!
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white border border-amber-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* User Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {review.user.image ? (
                      <Image
                        src={review.user.image}
                        alt={review.user.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover border-2 border-amber-200"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-amber-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    {/* <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {review.user.name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                    </div> */}

                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {review.user.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </span>

                        {user?.role === "admin" && (
                          <Button
                            onClick={() => handleDeleteReview(review._id)}
                            className="text-amber-600 hover:text-amber-800 transition-colors"
                            title="Delete Review"
                          >
                            <Trash className="w-5 h-5" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "fill-amber-500 text-amber-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
