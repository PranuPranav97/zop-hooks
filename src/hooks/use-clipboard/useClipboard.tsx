import { useState, useEffect } from "react";

function useClipboard(): string | undefined {
  const [clipboardContent, setClipboardContent] = useState<
    string | undefined
  >();

  useEffect(() => {
    async function getClipboardContent() {
      try {
        const clipboardContent = await navigator.clipboard.readText();
        setClipboardContent(clipboardContent);
      } catch (error) {
        console.error(error);
      }
    }
    if ("clipboard" in navigator) {
      getClipboardContent();
    }
  }, []);

  return clipboardContent;
}

export { useClipboard };
