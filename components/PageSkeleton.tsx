export default function PageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:max-w-4xl lg:px-10 xl:max-w-5xl xl:px-16">
      <div className="h-9 w-56 animate-pulse rounded bg-hairline" />
      <div className="mt-6 flex flex-col gap-3">
        <div className="h-4 w-full animate-pulse rounded bg-hairline" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-hairline" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-hairline" />
      </div>
    </div>
  )
}
