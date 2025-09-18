declare global {
  interface Window {
    electronAPI: {
      saveFile: (
        content: string,
        filePath?: string
      ) => Promise<{ success: boolean; filePath?: string; error?: string }>;
      openFile: () => Promise<{
        success: boolean;
        content?: string;
        filePath?: string;
        error?: string;
      }>;
      saveAsFile: (
        content: string
      ) => Promise<{ success: boolean; filePath?: string; error?: string }>;
      onFileChanged: (callback: (filePath: string) => void) => void;
      removeAllListeners: (channel: string) => void;
    };
  }
}

export {};
