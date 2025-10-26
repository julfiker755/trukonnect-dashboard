import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

export function Pagination({ current_page, total, per_page, onClick, className }: any) {
  const totalPages = Math.ceil(total / per_page);
  const disablePrev = current_page <= 1;
  const disableNext = current_page >= totalPages;

  const handlePrev = () => {
    if (!disablePrev) {
      onClick(current_page - 1);
    }
  };

  const handleNext = () => {
    if (!disableNext) {
      onClick(current_page + 1);
    }
  };

  if (total <= per_page) return null;

  return (
    <div className={cn('flex justify-between items-center border-t mt-6 py-2', className)}>
      <div className="text-sm">
        Page {current_page} of {totalPages}
      </div>
      <div className="flex space-x-2">
        <Button
          className={cn('bg-white hover:bg-white disabled:opacity-100 text-black', {
            'cursor-not-allowed': disablePrev,
            'cursor-pointer': !disablePrev,
          })}
          onClick={handlePrev}
          disabled={disablePrev}
          aria-label="Previous page"
        >
          Previous
        </Button>
        <Button
          className={cn('bg-white disabled:opacity-100 hover:bg-white text-black', {
            'cursor-not-allowed': disableNext,
            'cursor-pointer': !disableNext,
          })}
          onClick={handleNext}
          disabled={disableNext}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
