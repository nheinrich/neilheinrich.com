/**
 * Maps content format types to their corresponding icon types
 * This keeps the Icon component decoupled from content-specific logic
 */
export function getIconForFormat(format: string): string {
  const formatIconMap: Record<string, string> = {
    'Essay': 'burst',      // TODO: Change to unique essay icon
    'Experiment': 'diamond', // TODO: Change to unique experiment icon
    'Note': 'burst',       // TODO: Change to unique note icon
  }

  return formatIconMap[format] || 'burst'
}
