// `useKeyboardShortcuts`, permet de gérer des raccourcis clavier (ctrl+arrowleft et ctrl+arrowright) pour changer d'apprentissage.
// prends un tableau de raccourcis, chacun étant défini par une combinaison de touches et le callback à exécuter lorsque la combinaison est détectée.
// on utilise `useEffect` pour ajouter un écouteur d'événements sur `keydown` lorsqu'un composant est monté, et le retire lorsqu'il est démonté.
// À chaque fois qu'une touche est down, la fonction `handleKeyDown` est appelée. Cette fonction vérifie si la combinaison de touches appuyées correspond à l'un des raccourcis définis.
// Si c'est le cas, on empêche le comportement par défaut du navigateur pour cette combinaison (via `event.preventDefault()`) et exécute le callback.
'use client';

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
