import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CourseReviewCardProps {
  courseId: string;
  courseName: string;
  existingRating?: number;
  existingReview?: string;
  onReviewSaved?: () => void;
}

export const CourseReviewCard: React.FC<CourseReviewCardProps> = ({
  courseId,
  courseName,
  existingRating,
  existingReview,
  onReviewSaved,
}) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(existingRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState(existingReview || '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!user || rating === 0) return;
    setSaving(true);

    const { error } = await supabase.from('course_reviews').upsert(
      {
        user_id: user.id,
        course_id: courseId,
        rating,
        review_text: reviewText || null,
      },
      { onConflict: 'user_id,course_id' }
    );

    setSaving(false);
    if (error) {
      toast.error('Could not save review');
      return;
    }
    toast.success('Review saved!');
    onReviewSaved?.();
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <p className="text-sm font-medium text-foreground">Rate "{courseName}"</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= (hoverRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground/30'
                }`}
              />
            </button>
          ))}
        </div>
        <Textarea
          placeholder="Write a review (optional)..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="text-sm min-h-[60px]"
        />
        <Button size="sm" onClick={handleSubmit} disabled={rating === 0 || saving}>
          {saving ? 'Saving...' : existingRating ? 'Update Review' : 'Submit Review'}
        </Button>
      </CardContent>
    </Card>
  );
};
