import { renderHook, act } from '@testing-library/react';
import { useInterviewSession } from '../useInterviewSession';

global.fetch = jest.fn();

describe('useInterviewSession hook', () => {
  const sessionId = 'test-session-id';
  const mockSessionData = {
    jobDescription: 'Test job description',
    cvText: 'Test CV text',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads session data and sets countdown', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSessionData,
    });

    const { result } = renderHook(() => useInterviewSession(sessionId));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.sessionData).toEqual(mockSessionData);
    expect(result.current.countdown).toBe(3);
    expect(result.current.error).toBe('');
  });

  it('handles fetch error gracefully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Something went wrong' }),
    });

    const { result } = renderHook(() => useInterviewSession(sessionId));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.sessionData).toBeNull();
    expect(result.current.error).toBe('Failed to load session data.');
  });

  it('does nothing if no sessionId is provided', async () => {
    const { result } = renderHook(() => useInterviewSession(null));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.sessionData).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });
});