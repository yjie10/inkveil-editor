export interface EditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

// Import electron types
import './electron.d';
