export function generateDynamicUrl() {
  const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
  return `https://yourdomain.com/upload/${uniqueId}`;
}