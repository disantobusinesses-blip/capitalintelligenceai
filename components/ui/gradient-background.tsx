'use client';
import type React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type GradientBackgroundProps = React.ComponentProps<'div'> & {
	// Animation customisation
	gradients?: string[];
	animationDuration?: number;
	animationDelay?: number;

	// Layout customisation
	enableCenterContent?: boolean;

	// Visual customisation
	overlay?: boolean;
	overlayOpacity?: number;
};

const DEFAULT_GRADIENTS = [
	'linear-gradient(135deg, #000000 0%, #1A0F08 100%)',
	'linear-gradient(135deg, #0A0705 0%, #2E1A0E 100%)',
	'linear-gradient(180deg, #1A0F08 0%, #000000 100%)',
	'linear-gradient(225deg, #2E1A0E 0%, #0A0705 100%)',
	'linear-gradient(135deg, #000000 0%, #1A0F08 100%)',
];

export function GradientBackground({
	children,
	className = '',
	gradients = DEFAULT_GRADIENTS,
	animationDuration = 8,
	animationDelay = 0.5,
	overlay = false,
	overlayOpacity = 0.3,
}: GradientBackgroundProps) {
	return (
		<div className={cn('w-full relative min-h-screen overflow-hidden', className)}>
			{/* Animated gradient background */}
			<motion.div
				className="absolute inset-0"
				style={{ background: gradients[0] }}
				animate={{ background: gradients }}
				transition={{
					delay: animationDelay,
					duration: animationDuration,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
			/>

			{/* Optional overlay */}
			{overlay && (
				<div
					className="absolute inset-0 bg-black"
					style={{ opacity: overlayOpacity }}
				/>
			)}

			{/* Content wrapper */}
			{children && (
				<div
					className={cn(
						'relative z-10 flex min-h-screen items-center justify-center',
					)}
				>
					{children}
				</div>
			)}
		</div>
	);
}
