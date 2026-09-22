import { useState, useEffect } from 'react';

type Platform = 'desktop' | 'mobile';

interface UseDevicePlatformOptions {
    mobileBreakpoint?: number;
}

export const usePlatform = (options: UseDevicePlatformOptions = {}): Platform => {
    const { mobileBreakpoint = 768 } = options;

    const [platform, setPlatform] = useState<Platform>(() => {
        return getPlatform(window.innerWidth, mobileBreakpoint);
    });

    useEffect(() => {
        const handleResize = () => {
            const newPlatform = getPlatform(window.innerWidth, mobileBreakpoint);
            setPlatform(newPlatform);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [mobileBreakpoint]);

    return platform;
};

const getPlatform = (screenWidth: number, mobileBreakpoint: number): Platform => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

    if (isMobileUserAgent || screenWidth < mobileBreakpoint) {
        return 'mobile';
    }

    return 'desktop';
};