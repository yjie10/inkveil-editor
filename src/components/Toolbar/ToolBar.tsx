import ExportButton from './ExportButton';

type Props = {
  content: string;
};

const Toolbar = ({ content }: Props) => {
  return (
    <div className="flex items-center justify-between py-4 border-t border-zinc-700 mt-4">
      <div className="flex items-center gap-2">
        {/* Word count display */}
        <span className="text-zinc-400 text-sm">
          {
            content
              .replace(/<[^>]*>/g, '')
              .trim()
              .split(/\s+/)
              .filter((word) => word.length > 0).length
          }{' '}
          words
        </span>
      </div>

      <div className="flex items-center gap-2">
        <ExportButton content={content} />
      </div>
    </div>
  );
};

export default Toolbar;
