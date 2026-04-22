import { cn } from '@/shared/lib/utils';

type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface EthosCoreLogoProps {
  size?: LogoSize;
  showText?: boolean;
  className?: string;
}

const sizeConfig: Record<LogoSize, { icon: number; text: string; gap: string }> = {
  xs: { icon: 20, text: 'text-sm', gap: 'gap-1.5' },
  sm: { icon: 24, text: 'text-base', gap: 'gap-2' },
  md: { icon: 32, text: 'text-lg', gap: 'gap-2' },
  lg: { icon: 40, text: 'text-2xl', gap: 'gap-3' },
  xl: { icon: 64, text: 'text-4xl', gap: 'gap-4' },
};

/**
 * EthosCoreLogo - A custom shield-based logo representing Trust + Technology
 * 
 * The design combines:
 * - A hexagonal shield shape (representing security, trust, authority)
 * - An inner checkmark/verification symbol (representing validation, credibility)
 * - A small blue accent dot (brand identity)
 * 
 * Adapts to light/dark mode: Black in light mode, White in dark mode
 */
export function EthosCoreLogo({ size = 'md', showText = true, className }: EthosCoreLogoProps) {
  const config = sizeConfig[size];
  
  return (
    <div className={cn('flex items-center', config.gap, className)}>
      {/* Custom Shield Icon */}
      <div className="relative flex-shrink-0">
        <svg
          width={config.icon}
          height={config.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground"
        >
          {/* Hexagonal Shield Base */}
          <path
            d="M24 4L42 14V28C42 36.837 34.837 44 26 44H22C13.163 44 6 36.837 6 28V14L24 4Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          
          {/* Inner Shield Detail */}
          <path
            d="M24 10L36 17V27C36 33.075 31.075 38 25 38H23C16.925 38 12 33.075 12 27V17L24 10Z"
            fill="currentColor"
            fillOpacity="0.12"
          />
          
          {/* Checkmark Symbol - Verification/Trust */}
          <path
            d="M17 24L22 29L31 19"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Blue Accent Dot - Brand Identity */}
          <circle
            cx="38"
            cy="10"
            r="4"
            className="fill-ethoshub-blue"
          />
        </svg>
      </div>
      
      {/* Text */}
      {showText && (
        <span className={cn('font-sora tracking-tight', config.text)}>
          <span className="font-bold text-foreground">Ethos</span>
          <span className="font-light text-foreground">Hub</span>
        </span>
      )}
    </div>
  );
}

/**
 * Compact version for small spaces (favicon-style, icon only)
 */
export function EthosLogoIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-foreground', className)}
    >
      <path
        d="M24 4L42 14V28C42 36.837 34.837 44 26 44H22C13.163 44 6 36.837 6 28V14L24 4Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 10L36 17V27C36 33.075 31.075 38 25 38H23C16.925 38 12 33.075 12 27V17L24 10Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path
        d="M17 24L22 29L31 19"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="38"
        cy="10"
        r="4"
        className="fill-ethoshub-blue"
      />
    </svg>
  );
}
