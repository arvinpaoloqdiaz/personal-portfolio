import { SkeletonCard } from '@/components/Skeleton/Skeleton';

export default function StatsCardsSkeleton() {
  return (
    <>
      <div className="col-12 col-md-4 order-3 order-md-2">
        <SkeletonCard />
      </div>
      <div className="col-12 col-md-4 order-4 order-md-2">
        <SkeletonCard />
      </div>
      <div className="col-12 col-md-4 order-5 order-md-2">
        <SkeletonCard />
      </div>
    </>
  );
}
