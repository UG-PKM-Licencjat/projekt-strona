`use client`;

import { useState } from "react";
import { trpc } from "~/trpc/react";


const Reviews = ({ offerId, userId }: ReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);

  const {data, refetch: re} = 

  // Handle posting a new review or a reply
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { data } = mockdata;

      setReviews((prev) => [...prev, data] as Review[]);
      setNewComment("");
      setReplyTo(null);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  // Render the review recursively for replies
  const renderReviews = (parentId: number | null = null) => {
    return reviews
      .filter((review) => review.replyTo === parentId)
      .map((review) => (
        <div key={review.id} className={`ml-${parentId ? "4" : "0"} mb-4`}>
          <div className="rounded-md border p-2">
            <p className="font-semibold">{review.userId}</p>
            <p>{review.comment}</p>
            <button
              className="mt-1 text-sm text-blue-500"
              onClick={() => setReplyTo(review.id)}
            >
              Reply
            </button>
          </div>
          {renderReviews(review.id)}
        </div>
      ));
  };

  return (
    <div className="reviews-container">
      <h3 className="mb-4 text-xl font-semibold">Reviews</h3>
      {renderReviews()}

      <form onSubmit={handleSubmit} className="mt-6">
        {replyTo && (
          <p className="mb-2 text-sm">
            Replying to review #{replyTo}
            <button
              type="button"
              className="ml-2 text-red-500"
              onClick={() => setReplyTo(null)}
            >
              Cancel
            </button>
          </p>
        )}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full rounded-md border p-2"
          rows={3}
          placeholder="Write a review or reply..."
        />
        <button
          type="submit"
          className="mt-2 rounded-md bg-blue-500 px-3 py-1 text-white"
        >
          {replyTo ? "Reply" : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default Reviews;
