export const editorCommands = {
  bold: () => document.execCommand('bold', false),
  italic: () => document.execCommand('italic', false),
  underline: () => document.execCommand('underline', false),
} as const;
