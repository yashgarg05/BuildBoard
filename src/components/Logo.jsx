import React from 'react';
import './Logo.css';

/**
 * BuildBoard Official Brand Logo Component
 * Features the signature stylized gradient 'B' icon + 'BuildBoard' wordmark + version badge
 */
export const Logo = ({
  size = 'md',
  showBadge = true,
  versionText = 'v1.0',
  theme = 'auto',
  iconOnly = false,
  className = ''
}) => {
  const iconDimensions = {
    xs: { width: 20, height: 19 },
    sm: { width: 26, height: 25 },
    md: { width: 34, height: 32 },
    lg: { width: 44, height: 42 },
    xl: { width: 56, height: 53 }
  }[size] || { width: 34, height: 32 };

  const idSuffix = React.useId().replace(/:/g, '');

  return (
    <div className={`bb-logo-wrapper bb-logo-${size} bb-theme-${theme} ${className}`}>
      {/* Stylized Gradient 'B' Mark */}
      <svg
        className="bb-logo-icon"
        width={iconDimensions.width}
        height={iconDimensions.height}
        viewBox="0 0 106 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Left Vertical Pillar Gradient */}
          <linearGradient id={`bb-p-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA86E" />
            <stop offset="45%" stopColor="#FF7D42" />
            <stop offset="100%" stopColor="#E8481E" />
          </linearGradient>

          {/* Top Lobe Gradient */}
          <linearGradient id={`bb-t-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA36B" />
            <stop offset="50%" stopColor="#FF7338" />
            <stop offset="100%" stopColor="#E84419" />
          </linearGradient>

          {/* Bottom Lobe Gradient */}
          <linearGradient id={`bb-b-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7F44" />
            <stop offset="60%" stopColor="#EF4E21" />
            <stop offset="100%" stopColor="#D7350A" />
          </linearGradient>

          {/* Subtle Soft Highlight */}
          <linearGradient id={`bb-h-${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Left Rounded Pillar */}
        <rect x="2" y="4" width="23" height="92" rx="11.5" fill={`url(#bb-p-${idSuffix})`} />
        <rect x="2" y="4" width="23" height="42" rx="11.5" fill={`url(#bb-h-${idSuffix})`} />

        {/* Top Rounded Lobe */}
        <rect x="33" y="4" width="70" height="43" rx="17" fill={`url(#bb-t-${idSuffix})`} />
        <rect x="33" y="4" width="70" height="22" rx="14" fill={`url(#bb-h-${idSuffix})`} />

        {/* Bottom Rounded Lobe */}
        <rect x="33" y="53" width="70" height="43" rx="17" fill={`url(#bb-b-${idSuffix})`} />
        <rect x="33" y="53" width="70" height="20" rx="14" fill={`url(#bb-h-${idSuffix})`} opacity="0.6" />
      </svg>

      {/* Wordmark Text + Badge */}
      {!iconOnly && (
        <div className="bb-logo-text-group">
          <span className="bb-brand-name">
            <span className="bb-brand-build">Build</span>
            <span className="bb-brand-board">Board</span>
          </span>

          {showBadge && (
            <span className="bb-version-badge">{versionText}</span>
          )}
        </div>
      )}
    </div>
  );
};
