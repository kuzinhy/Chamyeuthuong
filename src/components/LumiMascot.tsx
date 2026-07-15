import { motion } from 'motion/react';

interface LumiMascotProps {
  className?: string;
  size?: number;
  animateHeart?: boolean;
  animateSway?: boolean;
}

export default function LumiMascot({
  className = '',
  size = 200,
  animateHeart = true,
  animateSway = true,
}: LumiMascotProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <motion.svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        animate={animateSway ? {
          y: [0, -6, 0],
          rotate: [0, 1.5, -1.5, 0],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Shadow under Lumi */}
        <ellipse cx="200" cy="370" rx="90" ry="12" fill="rgba(14, 165, 233, 0.12)" />

        <g id="lumi-character">
          {/* Main Body - Teardrop/Droplet Shape */}
          <path
            d="M200 45 C110 160, 90 240, 90 290 C90 350, 140 360, 200 360 C260 360, 310 350, 310 290 C310 240, 290 160, 200 45 Z"
            fill="url(#bodyGradient)"
            stroke="url(#bodyStrokeGradient)"
            strokeWidth="4"
          />

          {/* Highlights on Body */}
          <path
            d="M195 65 C145 150, 120 220, 120 280 C120 310, 140 325, 170 325"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.35"
          />
          <circle cx="160" cy="110" r="14" fill="white" opacity="0.25" filter="blur(2px)" />

          {/* Orange Headphones */}
          <g id="headphones">
            {/* Headband */}
            <path
              d="M120 220 C120 120, 280 120, 280 220"
              stroke="url(#headphonesBandGradient)"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            {/* Headband inner cushions */}
            <path
              d="M128 215 C128 130, 272 130, 272 215"
              stroke="url(#headphonesBandAccent)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Left Ear Cup */}
            <motion.g
              whileHover={{ scale: 1.05 }}
              className="origin-[105px_225px]"
            >
              {/* Outer orange cup */}
              <rect x="75" y="195" width="40" height="70" rx="20" fill="url(#orangeGradient)" stroke="#ea580c" strokeWidth="3" />
              {/* Inner cushion */}
              <rect x="95" y="205" width="16" height="50" rx="8" fill="#fbbf24" />
              {/* Connection jack */}
              <circle cx="95" cy="230" r="6" fill="#f97316" />
            </motion.g>

            {/* Right Ear Cup */}
            <motion.g
              whileHover={{ scale: 1.05 }}
              className="origin-[295px_225px]"
            >
              {/* Outer orange cup */}
              <rect x="285" y="195" width="40" height="70" rx="20" fill="url(#orangeGradient)" stroke="#ea580c" strokeWidth="3" />
              {/* Inner cushion */}
              <rect x="289" y="205" width="16" height="50" rx="8" fill="#fbbf24" />
              {/* Connection jack */}
              <circle cx="305" cy="230" r="6" fill="#f97316" />
            </motion.g>

            {/* Glowing signal waves from headphones */}
            <motion.path
              d="M55 210 A 40 40 0 0 0 55 250"
              stroke="#0ea5e9"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
              d="M40 200 A 60 60 0 0 0 40 260"
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />

            <motion.path
              d="M345 210 A 40 40 0 0 1 345 250"
              stroke="#0ea5e9"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
              d="M360 200 A 60 60 0 0 1 360 260"
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </g>

          {/* Eyes (Cute big anime-style sparkling eyes) */}
          <g id="eyes">
            {/* Left Eye */}
            <g>
              <ellipse cx="165" cy="215" rx="18" ry="24" fill="#0f172a" />
              {/* Blue iris highlight */}
              <ellipse cx="165" cy="217" rx="14" ry="18" fill="#0284c7" />
              {/* Large highlight */}
              <circle cx="159" cy="204" r="8" fill="white" />
              {/* Secondary highlight */}
              <circle cx="171" cy="224" r="4" fill="white" />
              {/* Eyelash details */}
              <path d="M145 205 C150 195, 175 195, 183 205" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            </g>

            {/* Right Eye */}
            <g>
              <ellipse cx="235" cy="215" rx="18" ry="24" fill="#0f172a" />
              {/* Blue iris highlight */}
              <ellipse cx="235" cy="217" rx="14" ry="18" fill="#0284c7" />
              {/* Large highlight */}
              <circle cx="229" cy="204" r="8" fill="white" />
              {/* Secondary highlight */}
              <circle cx="241" cy="224" r="4" fill="white" />
              {/* Eyelash details */}
              <path d="M217 205 C225 195, 250 195, 255 205" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            </g>
          </g>

          {/* Cute Rosy Blushing Cheeks */}
          <g id="cheeks">
            <circle cx="138" cy="235" r="12" fill="#ef4444" opacity="0.3" filter="blur(3px)" />
            <circle cx="262" cy="235" r="12" fill="#ef4444" opacity="0.3" filter="blur(3px)" />
          </g>

          {/* Little Happy Mouth */}
          <path
            d="M188 238 C188 238, 200 252, 212 238"
            stroke="#0f172a"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Mouth open tongue */}
          <path
            d="M192 241 C194 246, 206 246, 208 241 Z"
            fill="#f87171"
          />

          {/* Hands holding the Golden-Orange Heart */}
          <g id="hands-and-heart">
            {/* The Heart */}
            <motion.path
              d="M200 278 C200 278, 170 248, 170 230 C170 216, 183 206, 196 215 C200 218, 200 218, 200 218 C200 218, 200 218, 204 215 C217 206, 230 216, 230 230 C230 248, 200 278, 200 278 Z"
              fill="url(#heartGradient)"
              stroke="#ea580c"
              strokeWidth="3.5"
              className="origin-[200px_245px]"
              animate={animateHeart ? {
                scale: [1, 1.08, 1],
              } : {}}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Left Hand hugging the heart */}
            <path
              d="M135 285 C150 280, 172 265, 182 258"
              stroke="url(#bodyGradient)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M135 285 C150 280, 172 265, 182 258"
              stroke="url(#bodyStrokeGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />

            {/* Right Hand hugging the heart */}
            <path
              d="M265 285 C250 280, 228 265, 218 258"
              stroke="url(#bodyGradient)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M265 285 C250 280, 228 265, 218 258"
              stroke="url(#bodyStrokeGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </g>

          {/* Little feet/shoes */}
          <g id="feet">
            {/* Left Foot */}
            <path
              d="M140 345 C130 345, 115 352, 120 365 C125 375, 155 375, 160 365 C162 355, 150 345, 140 345 Z"
              fill="url(#orangeGradient)"
              stroke="#d97706"
              strokeWidth="2.5"
            />
            {/* Right Foot */}
            <path
              d="M260 345 C270 345, 285 352, 280 365 C275 375, 245 375, 240 365 C238 355, 250 345, 260 345 Z"
              fill="url(#orangeGradient)"
              stroke="#d97706"
              strokeWidth="2.5"
            />
          </g>
        </g>

        {/* Gradients definitions */}
        <defs>
          {/* Main body light sky blue gradient */}
          <linearGradient id="bodyGradient" x1="200" y1="45" x2="200" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="40%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Main body stroke */}
          <linearGradient id="bodyStrokeGradient" x1="200" y1="45" x2="200" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          {/* Headphones earcups orange gradient */}
          <linearGradient id="orangeGradient" x1="0" y1="195" x2="0" y2="265" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Headphones band orange-gold */}
          <linearGradient id="headphonesBandGradient" x1="120" y1="120" x2="280" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="headphonesBandAccent" x1="120" y1="120" x2="280" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          {/* Heart soft glowing gold-orange-red */}
          <linearGradient id="heartGradient" x1="200" y1="200" x2="200" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#facc15" />
            <stop offset="70%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
