import { useCallback } from 'react';

/**
 * useAnalytics hook and utility.
 * 
 * Provides a trackEvent function that bridges to window.ALPlayableAnalytics.trackEvent.
 * This is used for tracking events in playable ads (e.g., AppLovin).
 */

// Define a standalone tracking function for use outside of React components
export const trackEvent = (eventName, eventValue = "") => {
  // Global log for all events, used for pushing to mraid.open at the end
  window.ALAnalyticsLog = window.ALAnalyticsLog || [];
  window.ALAnalyticsLog.push({
    eventName,
    eventValue,
    timestamp: new Date().toISOString(),
  });

  if (window.ALPlayableAnalytics && typeof window.ALPlayableAnalytics.trackEvent === 'function') {
    try {
      // Ensure the value is a string if it's an object, as required by many playable APIs
      const valueToTrack = typeof eventValue === 'object' ? JSON.stringify(eventValue) : String(eventValue);
      window.ALPlayableAnalytics.trackEvent(eventName, valueToTrack);
    } catch (error) {
      console.error("Analytics Tracking Error:", error);
    }
  } else {
    // Development/Fallback logging
    console.log(`[Analytics Mock] ${eventName}:`, eventValue);
  }
};

const useAnalytics = () => {
  /**
   * trackEvent function to be called from components.
   */
  const trackEventHook = useCallback((eventName, eventValue = "") => {
    trackEvent(eventName, eventValue);
  }, []);

  return { trackEvent: trackEventHook };
};

export default useAnalytics;
