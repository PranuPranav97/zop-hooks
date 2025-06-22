import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import { useClipboard } from "../";

describe("useClipboard", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  it("should read and return clipboard content", async () => {
    const mockClipboardContent = "Test clipboard data";

    // Mock the clipboard API
    Object.assign(navigator, {
      clipboard: {
        readText: jest.fn().mockResolvedValue(mockClipboardContent),
      },
    });

    const { result } = renderHook(() => useClipboard());

    await waitFor(() => {
      expect(result.current).toBe(mockClipboardContent);
    });

    expect(navigator.clipboard.readText).toHaveBeenCalledTimes(1);
  });

  it("should handle clipboard read failure gracefully", async () => {
    const mockError = new Error("Clipboard read failed");

    Object.assign(navigator, {
      clipboard: {
        readText: jest.fn().mockRejectedValue(mockError),
      },
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useClipboard());

    await waitFor(() => {
      expect(result.current).toBeUndefined();
    });

    expect(navigator.clipboard.readText).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

    consoleErrorSpy.mockRestore();
  });
});
