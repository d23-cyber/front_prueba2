import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface EthosCoreLogoProps {
  size?: LogoSize;
  showText?: boolean;
  className?: string;
  animate?: boolean;
}

const sizeConfig: Record<LogoSize, { icon: number; text: string; gap: string }> = {
  xs: { icon: 20, text: 'text-sm', gap: 'gap-1.5' },
  sm: { icon: 24, text: 'text-base', gap: 'gap-2' },
  md: { icon: 32, text: 'text-lg', gap: 'gap-2' },
  lg: { icon: 40, text: 'text-2xl', gap: 'gap-3' },
  xl: { icon: 64, text: 'text-4xl', gap: 'gap-4' },
};

/**
 * EthosCoreLogo - Premium brand logo with animated shield icon
 * 
 * Features:
 * - Shield design representing trust & technology
 * - EthosHub Blue (#0066FF) gradient accent
 * - Hover glow effect with spring animation
 * - "Ethos" Bold + "Hub" Light typography (Sora font)
 */
export function EthosCoreLogo({ 
  size = 'md', 
  showText = true, 
  className,
  animate = true 
}: EthosCoreLogoProps) {
  const config = sizeConfig[size];
  
  const LogoIcon = (
    <svg
      width={config.icon}
      height={config.icon}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="shieldGradient" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0066FF" stopOpacity="0.15" />
          <stop offset="1" stopColor="#0066FF" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="strokeGradient" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0066FF" />
          <stop offset="1" stopColor="#0044CC" />
        </linearGradient>
        <linearGradient id="innerGradient" x1="12" y1="10" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0066FF" stopOpacity="0.2" />
          <stop offset="1" stopColor="#0066FF" stopOpacity="0.08" />
        </linearGradient>
        <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Hexagonal Shield Base */}
      <path
        d="M24 4L42 14V28C42 36.837 34.837 44 26 44H22C13.163 44 6 36.837 6 28V14L24 4Z"
        fill="url(#shieldGradient)"
        stroke="url(#strokeGradient)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      
      {/* Inner Shield Detail */}
      <path
        d="M24 10L36 17V27C36 33.075 31.075 38 25 38H23C16.925 38 12 33.075 12 27V17L24 10Z"
        fill="url(#innerGradient)"
      />
      
      {/* Checkmark Symbol - Trust/Verification with blue accent */}
      <path
        d="M17 24L22 29L31 19"
        stroke="#0066FF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glowFilter)"
      />
      
      {/* Blue Accent Dot - Brand Identity */}
      <circle
        cx="38"
        cy="10"
        r="4"
        fill="#0066FF"
      />
    </svg>
  );
  
  return (
    <div className={cn('flex items-center', config.gap, className)}>
      {/* Animated Icon Container */}
      {animate ? (
        <motion.div
          className="relative flex-shrink-0"
          whileHover={{ 
            scale: 1.05,
            filter: 'drop-shadow(0 0 12px rgba(0, 102, 255, 0.5))'
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 20 
          }}
        >
          {LogoIcon}
        </motion.div>
      ) : (
        <div className="relative flex-shrink-0">
          {LogoIcon}
        </div>
      )}
      
      {/* Text - Ethos (Bold) + Hub (Light) */}
      {showText && (
        <span className={cn('font-sora tracking-tight', config.text)}>
          <span className="font-bold text-foreground">Ethos</span>
          <span className="font-light text-ethoshub-blue">Hub</span>
        </span>
      )}
    </div>
  );
}

/**
 * Compact version for small spaces (favicon-style, icon only)
 */
export function EthosLogoIcon({ 
  size = 32, 
  className,
  animate = true 
}: { 
  size?: number; 
  className?: string;
  animate?: boolean;
}) {
  const IconSvg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="shieldGradientCompact" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0066FF" stopOpacity="0.15" />
          <stop offset="1" stopColor="#0066FF" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="strokeGradientCompact" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0066FF" />
          <stop offset="1" stopColor="#0044CC" />
        </linearGradient>
        <linearGradient id="innerGradientCompact" x1="12" y1="10" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0066FF" stopOpacity="0.2" />
          <stop offset="1" stopColor="#0066FF" stopOpacity="0.08" />
        </linearGradient>
        <filter id="glowFilterCompact" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d="M24 4L42 14V28C42 36.837 34.837 44 26 44H22C13.163 44 6 36.837 6 28V14L24 4Z"
        fill="url(#shieldGradientCompact)"
        stroke="url(#strokeGradientCompact)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 10L36 17V27C36 33.075 31.075 38 25 38H23C16.925 38 12 33.075 12 27V17L24 10Z"
        fill="url(#innerGradientCompact)"
      />
      <path
        d="M17 24L22 29L31 19"
        stroke="#0066FF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glowFilterCompact)"
      />
      <circle
        cx="38"
        cy="10"
        r="4"
        fill="#0066FF"
      />
    </svg>
  );

  if (animate) {
    return (
      <motion.div
        whileHover={{ 
          scale: 1.05,
          filter: 'drop-shadow(0 0 12px rgba(0, 102, 255, 0.5))'
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 20 
        }}
      >
        {IconSvg}
      </motion.div>
    );
  }

  return IconSvg;
}
