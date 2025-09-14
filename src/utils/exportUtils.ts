export const sanitizeFilename = (filename: string): string => {
  // Remove HTML tags and replace invalid filename characters
  return (
    filename
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
      .substring(0, 50) || // Limit length
    'untitled'
  ); // Fallback if empty
};

export const stripHtmlTags = (html: string): string => {
  // Create a temporary div to parse HTML
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
};

export const generateFilename = (content: string): string => {
  // Try to get a meaningful filename from the first line of content
  const plainText = stripHtmlTags(content);
  const firstLine = plainText.split('\n')[0];

  if (firstLine && firstLine.trim().length > 0) {
    return sanitizeFilename(firstLine);
  }

  // Fallback to timestamp if no meaningful content
  const now = new Date();
  const timestamp = now.toISOString().slice(0, 16).replace(/[T:]/g, '-');
  return `inkveil-note-${timestamp}`;
};

export const downloadFile = (
  content: string,
  filename: string,
  mimeType?: string
) => {
  const actualMimeType = mimeType || 'text/plain';
  try {
    const blob = new Blob([content], {
      type: `${actualMimeType};charset=utf-8`,
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Append to body, click, and remove (more reliable than just click())
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Export failed:', error);
    return false;
  }
};
