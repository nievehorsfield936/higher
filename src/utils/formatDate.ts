export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const sameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (sameDay) {
    return 'Edited Today';
  }

  return `Edited ${date.toLocaleDateString()}`;
}