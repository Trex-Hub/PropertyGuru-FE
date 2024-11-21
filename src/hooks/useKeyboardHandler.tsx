import { useCallback } from 'react';
// New generic keyboard handler function
export default function useKeyboardHandler<T>({
  filteredItems,
  focusedIndex,
  setFocusedIndex,
  setSelectedItem,
  setSearchTerm,
  setOpen,
  focusSelectedItem,
  inputRef,
}: {
  filteredItems: T[];
  focusedIndex: number;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedItem: (item: T) => void;
  setSearchTerm: (term: T) => void;
  setOpen: (open: boolean) => void;
  focusSelectedItem: (index: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'Tab') {
        e.preventDefault();
        setFocusedIndex(prevIndex => {
          const newIndex =
            prevIndex < filteredItems.length - 1 ? prevIndex + 1 : prevIndex;
          focusSelectedItem(newIndex);
          return newIndex;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prevIndex => {
          if (prevIndex === 0) {
            inputRef.current?.focus();
            return -1;
          }
          const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
          focusSelectedItem(newIndex);
          return newIndex;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems.length === 1) {
          const selectedItem = filteredItems[0];
          setSelectedItem(selectedItem);
          setSearchTerm(selectedItem);
          setOpen(false);
        } else if (focusedIndex !== -1) {
          const selectedItem = filteredItems[focusedIndex];
          setSelectedItem(selectedItem);
          setSearchTerm(selectedItem);
          setOpen(false);
        }
      }
    },
    [
      filteredItems,
      focusedIndex,
      setFocusedIndex,
      setSelectedItem,
      setSearchTerm,
      setOpen,
      focusSelectedItem,
      inputRef,
    ]
  );
}
