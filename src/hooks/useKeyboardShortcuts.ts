import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  preventDefault?: boolean;
  handler: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const isMac = navigator.userAgent.toLowerCase().includes('mac');

      for (const shortcut of shortcuts) {
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

        // Handle cross-platform modifier keys
        let modifierMatch = false;

        if (shortcut.ctrl && shortcut.meta) {
          // Use the appropriate one for the platform
          modifierMatch = isMac ? e.metaKey : e.ctrlKey;
        } else if (shortcut.ctrl) {
          modifierMatch = e.ctrlKey;
        } else if (shortcut.meta) {
          modifierMatch = e.metaKey;
        } else {
          modifierMatch = true; // No modifier required
        }

        const shiftMatch =
          shortcut.shift !== undefined ? e.shiftKey === shortcut.shift : true;

        if (keyMatch && modifierMatch && shiftMatch) {
          if (shortcut.preventDefault) {
            e.preventDefault();
          }
          shortcut.handler();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [shortcuts]);
}
