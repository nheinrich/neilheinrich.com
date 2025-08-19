/**
 * Maps content format types to their corresponding icon types
 * This keeps the Icon component decoupled from content-specific logic
 */
export function getIconForFormat(format: string): string {
	const formatIconMap: Record<string, string> = {
		Essay: 'notebook',
		Experiment: 'draw',
		Note: 'highlighter'
	};

	return formatIconMap[format] || 'draw';
}
