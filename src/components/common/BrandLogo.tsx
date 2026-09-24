import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const textColor = 
    variant === 'light' 
      ? 'text-white' 
      : variant === 'gold' 
      ? 'text-[#DFC168]' 
      : 'text-[#083335]';

  const subtitleColor = 
    variant === 'light' 
      ? 'text-[#DFC168]' 
      : variant === 'gold' 
      ? 'text-white/80' 
      : 'text-[#C5A059]';

  const textSize = 
    size === 'sm' 
      ? 'text-xl tracking-[0.16em]' 
      : size === 'lg' 
      ? 'text-3xl sm:text-4xl tracking-[0.18em]' 
      : size === 'xl' 
      ? 'text-4xl sm:text-5xl tracking-[0.2em]' 
      : 'text-2xl sm:text-3xl tracking-[0.18em]';

  const diamondColor = 
    variant === 'light' 
      ? '#DFC168' 
      : variant === 'gold' 
      ? '#DFC168' 
      : '#C5A059';

  return (
    <div className={`inline-flex flex-col text-left ${className}`}>
      <div className={`flex items-baseline font-serif font-bold ${textColor} ${textSize} leading-none select-none`}>
        <span>ARG</span>
        {/* The signature "i" with diamond crown in exact line with ARG */}
        <svg
          className="inline-block align-baseline h-[0.73em] w-auto ml-[0.04em] shrink-0 overflow-visible transition-transform duration-300 group-hover:scale-105"
          viewBox="0 0 54 172"
          fill="none"
          aria-label="i"
        >
          {/* Faceted Diamond Crown: Top aligns with cap-height */}
          <g
            stroke={diamondColor}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={diamondColor}
            fillOpacity="0.18"
          >
            {/* Table facet (flat top) */}
            <polygon points="15,9 35,5 39,12 19,16" />
            {/* Crown facets */}
            <polygon points="15,9 19,16 9,18 6,13" />
            <polygon points="35,5 39,12 47,11 43,6" />
            <polygon points="19,16 39,12 47,11 27,21 9,18" />
            {/* Pavilion facets tapering down to culet point */}
            <polygon points="6,13 9,18 26,40" />
            <polygon points="9,18 27,21 26,40" />
            <polygon points="27,21 47,11 26,40" />
            <polygon points="47,11 43,6 26,40" strokeOpacity="0.5" />
            {/* Diamond facet gleam lines */}
            <line x1="19" y1="16" x2="26" y2="40" strokeOpacity="0.75" />
            <line x1="39" y1="12" x2="26" y2="40" strokeOpacity="0.75" />
          </g>

          {/* Classical serif stem: rests flat on baseline */}
          <path
            d="M 14,53 H 38 C 34,55 33,59 33,65 V 160 C 33,166 34,170 38,172 H 14 C 18,170 19,166 19,160 V 65 C 19,59 18,55 14,53 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {showSubtitle && (
        <span className={`text-[9px] sm:text-[10px] tracking-[0.32em] uppercase font-medium mt-1 ${subtitleColor}`}>
          Indore • Pure 925 Silver
        </span>
      )}
    </div>
  );
};
