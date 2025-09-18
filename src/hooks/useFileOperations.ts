import { useState, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';

interface FileState {
  filePath: string | null;
  isSaved: boolean;
  hasUnsavedChanges: boolean;
}

export const useFileOperations = () => {
  const [fileState, setFileState] = useState<FileState>({
    filePath: null,
    isSaved: false,
    hasUnsavedChanges: false,
  });
  const { showToast } = useToast();

  const saveFile = useCallback(
    async (content: string) => {
      try {
        // Check if Electron API is available
        if (!(window as any).electronAPI) {
          showToast({
            message:
              'File operations not available in browser mode. Please run the Electron app.',
            type: 'error',
            duration: 4000,
          });
          return false;
        }

        const result = await (window as any).electronAPI.saveFile(
          content,
          fileState.filePath || undefined
        );

        if (result.success) {
          setFileState((prev) => ({
            ...prev,
            filePath: result.filePath || prev.filePath,
            isSaved: true,
            hasUnsavedChanges: false,
          }));

          // No toast for successful saves - status bar shows this

          return true;
        } else {
          // Don't show toast for "Save canceled" - user just changed their mind
          if (result.error && result.error !== 'Save canceled') {
            showToast({
              message: result.error || 'Failed to save file',
              type: 'error',
              duration: 3000,
            });
          }
          return false;
        }
      } catch (error) {
        console.error('Save error:', error);
        showToast({
          message:
            "Failed to save file. Make sure you're running the Electron app.",
          type: 'error',
          duration: 4000,
        });
        return false;
      }
    },
    [fileState.filePath, showToast]
  );

  const saveAsFile = useCallback(
    async (content: string) => {
      try {
        // Check if Electron API is available
        if (!(window as any).electronAPI) {
          showToast({
            message:
              'File operations not available in browser mode. Please run the Electron app.',
            type: 'error',
            duration: 4000,
          });
          return false;
        }

        const result = await (window as any).electronAPI.saveAsFile(content);

        if (result.success) {
          setFileState((prev) => ({
            ...prev,
            filePath: result.filePath || null,
            isSaved: true,
            hasUnsavedChanges: false,
          }));

          // No toast for successful saves - status bar shows this

          return true;
        } else {
          // Don't show toast for "Save canceled" - user just changed their mind
          if (result.error && result.error !== 'Save canceled') {
            showToast({
              message: result.error || 'Failed to save file',
              type: 'error',
              duration: 3000,
            });
          }
          return false;
        }
      } catch (error) {
        console.error('Save as error:', error);
        showToast({
          message:
            "Failed to save file. Make sure you're running the Electron app.",
          type: 'error',
          duration: 4000,
        });
        return false;
      }
    },
    [showToast]
  );

  const openFile = useCallback(async () => {
    try {
      // Check if Electron API is available
      if (!window.electronAPI) {
        showToast({
          message:
            'File operations not available in browser mode. Please run the Electron app.',
          type: 'error',
          duration: 4000,
        });
        return null;
      }

      const result = await (window as any).electronAPI.openFile();

      if (result.success && result.content && result.filePath) {
        setFileState({
          filePath: result.filePath,
          isSaved: true,
          hasUnsavedChanges: false,
        });

        // No toast for successful file opens - status bar shows this

        return { content: result.content, filePath: result.filePath };
      } else {
        if (result.error && result.error !== 'Open canceled') {
          showToast({
            message: result.error,
            type: 'error',
            duration: 3000,
          });
        }
        // Don't show toast for "Open canceled" - user just changed their mind
        return null;
      }
    } catch (error) {
      console.error('Open error:', error);
      showToast({
        message:
          "Failed to open file. Make sure you're running the Electron app.",
        type: 'error',
        duration: 4000,
      });
      return null;
    }
  }, [showToast]);

  const markAsChanged = useCallback(() => {
    setFileState((prev) => ({
      ...prev,
      hasUnsavedChanges: true,
      isSaved: false,
    }));
  }, []);

  const getFileName = useCallback(() => {
    if (!fileState.filePath) return 'Untitled';
    return fileState.filePath.split('/').pop() || 'Untitled';
  }, [fileState.filePath]);

  const newDocument = useCallback(() => {
    setFileState({
      filePath: null,
      isSaved: false,
      hasUnsavedChanges: false,
    });
  }, []);

  return {
    fileState,
    saveFile,
    saveAsFile,
    openFile,
    markAsChanged,
    getFileName,
    newDocument,
  };
};
