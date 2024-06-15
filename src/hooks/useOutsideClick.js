import { useEffect } from 'react';

/**
 * Custom hook that listens for clicks outside the specified element.
 * 
 * @param {MutableRefObject} ref - The ref of the element to detect outside clicks for.
 * @param {Function} handler - The function to call when an outside click is detected.
 */
export default function useOutsideClick(ref, handler) {
    useEffect(() => {
        // Function to be called when clicking outside
        const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
            return;
        }

        handler(event);
        };

        // Set up
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        // Clean up
        return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]); // Ensure effect runs only if ref or handler changes
}
