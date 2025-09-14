import {
  downloadFile,
  generateFilename,
  stripHtmlTags,
} from '../../utils/exportUtils';

type Props = {
  content: string;
};

const ExportButton = ({ content }: Props) => {
  const handleExport = () => {
    if (!content || content.trim() === '') {
      alert('Nothing to export! Please write something first.');
      return;
    }

    // Convert HTML to plain text for .txt export
    const plainTextContent = stripHtmlTags(content);

    // Generate a smart filename based on content
    const filename = `${generateFilename(content)}.txt`;

    const success = downloadFile(plainTextContent, filename);

    if (success) {
      console.log(`Exported as: ${filename}`);
    } else {
      alert('Export failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded 
                 text-sm transition-colors duration-200 cursor-pointer
                 disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
      aria-label="Export document as text file"
    >
      Export as .txt
    </button>
  );
};

export default ExportButton;
