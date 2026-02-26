export default function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-void-card rounded w-3/4"></div>
      <div className="h-4 bg-void-card rounded w-full"></div>
      <div className="h-4 bg-void-card rounded w-5/6"></div>
      <div className="space-y-3">
        <div className="h-24 bg-void-card rounded"></div>
        <div className="h-24 bg-void-card rounded"></div>
      </div>
    </div>
  )
}
