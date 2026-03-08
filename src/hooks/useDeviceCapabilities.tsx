import { useState, useEffect, useCallback } from 'react';

export interface DeviceCapabilities {
  camera: boolean;
  geolocation: boolean;
  notifications: boolean;
  offline: boolean;
  storage: boolean;
  vibration: boolean;
  share: boolean;
  clipboard: boolean;
  fullscreen: boolean;
  wakeLock: boolean;
  bluetooth: boolean;
  usb: boolean;
  mediaDevices: boolean;
  speechRecognition: boolean;
  speechSynthesis: boolean;
  deviceOrientation: boolean;
  battery: boolean;
  networkInfo: boolean;
}

export interface DeviceInfo {
  platform: 'windows' | 'macos' | 'linux' | 'android' | 'ios' | 'unknown';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPWA: boolean;
  isOnline: boolean;
  browser: string;
}

const detectPlatform = (): DeviceInfo['platform'] => {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return 'android';
  if (/iPad|iPhone|iPod/i.test(ua)) return 'ios';
  if (/Windows/i.test(ua)) return 'windows';
  if (/Mac OS/i.test(ua)) return 'macos';
  if (/Linux/i.test(ua)) return 'linux';
  return 'unknown';
};

const detectBrowser = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  return 'Unknown';
};

export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    camera: false, geolocation: false, notifications: false, offline: false,
    storage: false, vibration: false, share: false, clipboard: false,
    fullscreen: false, wakeLock: false, bluetooth: false, usb: false,
    mediaDevices: false, speechRecognition: false, speechSynthesis: false,
    deviceOrientation: false, battery: false, networkInfo: false,
  });

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    platform: 'unknown', isMobile: false, isTablet: false, isDesktop: true,
    isPWA: false, isOnline: true, browser: 'Unknown',
  });

  useEffect(() => {
    // Detect capabilities
    const caps: DeviceCapabilities = {
      camera: !!(navigator.mediaDevices?.getUserMedia),
      geolocation: 'geolocation' in navigator,
      notifications: 'Notification' in window,
      offline: 'serviceWorker' in navigator,
      storage: 'storage' in navigator && 'estimate' in (navigator.storage || {}),
      vibration: 'vibrate' in navigator,
      share: 'share' in navigator,
      clipboard: 'clipboard' in navigator,
      fullscreen: !!document.documentElement.requestFullscreen,
      wakeLock: 'wakeLock' in navigator,
      bluetooth: 'bluetooth' in navigator,
      usb: 'usb' in navigator,
      mediaDevices: !!navigator.mediaDevices,
      speechRecognition: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
      speechSynthesis: 'speechSynthesis' in window,
      deviceOrientation: 'DeviceOrientationEvent' in window,
      battery: 'getBattery' in navigator,
      networkInfo: 'connection' in navigator,
    };
    setCapabilities(caps);

    // Detect device info
    const platform = detectPlatform();
    const ua = navigator.userAgent;
    const isMobile = /iPhone|Android.*Mobile|webOS|BlackBerry/i.test(ua);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);

    setDeviceInfo({
      platform,
      isMobile,
      isTablet,
      isDesktop: !isMobile && !isTablet,
      isPWA: window.matchMedia('(display-mode: standalone)').matches,
      isOnline: navigator.onLine,
      browser: detectBrowser(),
    });

    // Listen for online/offline
    const onOnline = () => setDeviceInfo(prev => ({ ...prev, isOnline: true }));
    const onOffline = () => setDeviceInfo(prev => ({ ...prev, isOnline: false }));
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  // Camera access
  const openCamera = useCallback(async (facingMode: 'user' | 'environment' = 'environment') => {
    if (!capabilities.camera) throw new Error('Camera not supported');
    return navigator.mediaDevices.getUserMedia({
      video: { facingMode },
      audio: false,
    });
  }, [capabilities.camera]);

  // Take photo from camera
  const takePhoto = useCallback(async (facingMode: 'user' | 'environment' = 'environment'): Promise<Blob> => {
    const stream = await openCamera(facingMode);
    const video = document.createElement('video');
    video.srcObject = stream;
    await video.play();

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);

    stream.getTracks().forEach(t => t.stop());

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Failed to capture')), 'image/jpeg', 0.9);
    });
  }, [openCamera]);

  // Geolocation
  const getLocation = useCallback((): Promise<GeolocationPosition> => {
    if (!capabilities.geolocation) return Promise.reject(new Error('Geolocation not supported'));
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      });
    });
  }, [capabilities.geolocation]);

  // Share
  const shareContent = useCallback(async (data: ShareData) => {
    if (capabilities.share) {
      await navigator.share(data);
    } else {
      // Fallback: copy to clipboard
      const text = data.url || data.text || data.title || '';
      await navigator.clipboard.writeText(text);
    }
  }, [capabilities.share]);

  // Vibrate
  const vibrate = useCallback((pattern: number | number[] = 200) => {
    if (capabilities.vibration) navigator.vibrate(pattern);
  }, [capabilities.vibration]);

  // Wake Lock (keep screen on)
  const requestWakeLock = useCallback(async () => {
    if (!capabilities.wakeLock) return null;
    try {
      return await (navigator as any).wakeLock.request('screen');
    } catch { return null; }
  }, [capabilities.wakeLock]);

  // Storage estimate
  const getStorageEstimate = useCallback(async () => {
    if (!capabilities.storage) return null;
    return navigator.storage.estimate();
  }, [capabilities.storage]);

  return {
    capabilities,
    deviceInfo,
    openCamera,
    takePhoto,
    getLocation,
    shareContent,
    vibrate,
    requestWakeLock,
    getStorageEstimate,
  };
}
