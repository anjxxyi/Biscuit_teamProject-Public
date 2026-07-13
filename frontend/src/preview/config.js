// Collaboration switch: preview mode uses the local adapter; live mode uses the real API.
// Every VITE_* value is public in the browser bundle, so secrets must stay on the server.
export const isPreviewMode = import.meta.env.VITE_UI_PREVIEW_MODE === 'true'
export const apiHost = import.meta.env.VITE_API_HOST?.trim() || undefined
