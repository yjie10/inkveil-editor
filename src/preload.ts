import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  saveFile: (content: string, filePath?: string) =>
    ipcRenderer.invoke('save-file', content, filePath),
  openFile: () => ipcRenderer.invoke('open-file'),
  saveAsFile: (content: string) => ipcRenderer.invoke('save-as-file', content),

  // File system events
  onFileChanged: (callback: (filePath: string) => void) => {
    ipcRenderer.on('file-changed', (_, filePath) => callback(filePath));
  },

  // Remove listeners
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },
});
