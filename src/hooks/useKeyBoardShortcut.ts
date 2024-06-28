import { useEffect } from 'react';

interface Shortcut {
  keyCombo: string;
  callback: () => void;
}

const useKeyboardShortcuts = (shortcuts: Shortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isCtrl = event.ctrlKey;

      shortcuts.forEach(({ keyCombo, callback }) => {
        const [ctrlKey, shortcutKey] = keyCombo.split('+');
        if (isCtrl === (ctrlKey === 'ctrl') && key === shortcutKey.toLowerCase()) {
          event.preventDefault();
          callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
};

export default useKeyboardShortcuts;
