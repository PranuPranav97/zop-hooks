import { renderHook } from "@testing-library/react-hooks";
import { useClipboard } from "../hooks/use-clipboard/useClipboard";

describe("useClipboard", () => {
  beforeAll(() => {
    // Mock the clipboard API
    global.navigator.clipboard = {
      readText: jest.fn(),
    };
  });

  it("should return undefined initially", () => {
    const { result } = renderHook(() => useClipboard());

    // Initially, clipboard content should be undefined
    expect(result.current).toBeUndefined();
  });

  it("should fetch clipboard content successfully", async () => {
    // Mock the clipboard content
    const mockClipboardContent = "This is some text";
    navigator.clipboard.readText.mockResolvedValue(mockClipboardContent);

    const { result, waitForNextUpdate } = renderHook(() => useClipboard());

    // Wait for the update after clipboard content is fetched
    await waitForNextUpdate();

    // Check if clipboard content is set correctly
    expect(result.current).toBe(mockClipboardContent);
  });

  it("should handle errors when fetching clipboard content", async () => {
    // Mock an error while fetching clipboard content
    navigator.clipboard.readText.mockRejectedValue(
      new Error("Clipboard access denied")
    );

    const { result, waitForNextUpdate } = renderHook(() => useClipboard());

    // Wait for the update after an error occurs
    await waitForNextUpdate();

    // Ensure the state is still undefined (no content retrieved)
    expect(result.current).toBeUndefined();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
