import ExportButton from './ExportButton';

type Props = {
  content: string;
  onSave: () => void;
};

const Toolbar = ({ content, onSave }: Props) => {
  const wordCount = content
    .replace(/<[^>]*>/g, '')
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const charCount = content.replace(/<[^>]*>/g, '').length;

  return (
    <div className="mt-8 pt-6 border-t border-slate-200">
      <div className="flex items-center justify-between">
        {/* Writing stats */}
        <div className="flex items-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <span className="font-medium text-slate-600">{wordCount}</span>
            <span>words</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="font-medium text-slate-600">{charCount}</span>
            <span>characters</span>
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSave}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-md 
                       text-sm font-medium transition-colors duration-200 cursor-pointer
                       disabled:opacity-50 disabled:cursor-not-allowed
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="button"
            aria-label="Save document"
          >
            Save
          </button>
          <ExportButton content={content} />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
