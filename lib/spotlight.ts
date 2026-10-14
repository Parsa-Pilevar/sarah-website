type SpotlightFields = {
  showSpotlight?: boolean | null
  spotlightTitle?: string | null
  spotlightBody?: unknown[] | null
}

// Off unless the editor explicitly switched it on, and even then only if there's something to show.
export function shouldShowSpotlight(data: SpotlightFields | null | undefined): boolean {
  if (data?.showSpotlight !== true) return false
  return Boolean(data.spotlightTitle?.trim()) || (data.spotlightBody?.length ?? 0) > 0
}
