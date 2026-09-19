import React from 'react';
import { 
  Building2, 
  Building, 
  School, 
  GraduationCap, 
  Trees, 
  TreePine, 
  Train, 
  Radio, 
  Wifi, 
  Sun, 
  Zap, 
  Bike, 
  Heart, 
  Sparkles, 
  Send, 
  Landmark, 
  BookOpen, 
  Compass, 
  ShieldCheck, 
  Globe2 
} from 'lucide-react';

export const DigitalCityBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
      {/* 
        High-Tech Smart City of Kindness (Thành phố Trắc ẩn Số 4.0)
        Lively Animated City Background with Iconic Architecture, Eco Parks, 
        Sky Metro Transit, Clean Energy, and Floating Holographic City Nodes
      */}
      
      {/* Base Sky & Atmosphere Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#38BDF8]/20 via-[#E0F2FE]/45 via-50% to-[#F8FAFC]" />
      
      {/* High-Resolution Futuristic Architecture Wallpaper Layer */}
      <div className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2070&auto=format&fit=crop"
          alt="Smart Futuristic City of Kindness"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter saturate-125"
        />
      </div>

      {/* Sunlight Flare at Upper Sky */}
      <div className="absolute -top-24 left-1/3 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(186,230,253,0.5)_50%,transparent_80%)] blur-2xl pointer-events-none" />

      {/* Cyber Grid Ground Mesh */}
      <div 
        className="absolute bottom-0 inset-x-0 h-96 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(22, 119, 255, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(600px) rotateX(60deg)',
          transformOrigin: 'bottom center'
        }}
      />

      {/* =========================================================================
          VECTOR SMART CITY SKYLINE, BUILDINGS, HIGHWAYS & ANIMATED TRANSIT
      ========================================================================== */}
      <svg 
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 1920 1080" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradients for Distant Skyline */}
          <linearGradient id="bgSkyTowerFar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#BAE6FD" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.5" />
          </linearGradient>

          {/* Gradients for Prominent Glass High-Rises */}
          <linearGradient id="towerGlassCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#7DD3FC" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#0284C7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="towerGlassDeep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#0284C7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0C4A6E" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="towerFacetWhite" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.6" />
          </linearGradient>

          {/* Viaduct / Elevated Bridge Gradients */}
          <linearGradient id="viaductPillar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="highwayRoadTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="30%" stopColor="#E0F2FE" stopOpacity="0.92" />
            <stop offset="70%" stopColor="#BAE6FD" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="highwaySideBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="cyanNeonGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#38D6FF" />
            <stop offset="100%" stopColor="#008CFF" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="neonBeamFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =============================================================
            1. DISTANT SKYLINE TOWERS (Far Background)
        ============================================================= */}
        <g opacity="0.85">
          {/* Far Left Towers */}
          <rect x="80" y="240" width="55" height="460" fill="url(#bgSkyTowerFar)" rx="3" />
          <polygon points="107,190 80,240 135,240" fill="#7DD3FC" opacity="0.8" />
          <rect x="155" y="280" width="60" height="420" fill="url(#bgSkyTowerFar)" rx="3" />
          <rect x="235" y="210" width="80" height="490" fill="url(#bgSkyTowerFar)" rx="4" />
          <polygon points="275,150 235,210 315,210" fill="#38BDF8" opacity="0.85" />
          
          {/* Mid-Left Landmark Diagonal Tower */}
          <polygon points="360,230 410,160 460,230 460,700 360,700" fill="url(#towerFacetWhite)" />
          <polygon points="410,160 460,230 460,700 410,700" fill="url(#towerGlassCyan)" opacity="0.85" />

          {/* Center-Left Towers */}
          <rect x="490" y="260" width="65" height="440" fill="url(#bgSkyTowerFar)" rx="3" />
          <polygon points="522,210 490,260 555,260" fill="#60A5FA" opacity="0.75" />
          <rect x="580" y="220" width="85" height="480" fill="url(#bgSkyTowerFar)" rx="4" />
          <polygon points="622,160 580,220 665,220" fill="#38BDF8" opacity="0.85" />
          
          {/* Center Skyline Landmark */}
          <polygon points="710,200 760,130 820,220 820,700 710,700" fill="url(#towerFacetWhite)" />
          <polygon points="760,130 820,220 820,700 760,700" fill="url(#towerGlassCyan)" opacity="0.9" />
          <line x1="760" y1="130" x2="760" y2="700" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.9" />

          {/* Mid-Center Towers */}
          <rect x="850" y="290" width="55" height="410" fill="url(#bgSkyTowerFar)" rx="3" />
          <rect x="925" y="230" width="70" height="470" fill="url(#bgSkyTowerFar)" rx="3" />
          <polygon points="960,180 925,230 995,230" fill="#60A5FA" opacity="0.8" />
        </g>

        {/* =============================================================
            2. PROMINENT MODERN SMART CITY GLASS SKYSCRAPERS (Midground)
        ============================================================= */}
        <g opacity="0.95">
          {/* Center-Right Tower with Spire */}
          <rect x="1030" y="190" width="75" height="510" fill="url(#towerGlassCyan)" rx="4" stroke="#BAE6FD" strokeWidth="1.5" />
          <line x1="1067" y1="190" x2="1067" y2="700" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
          <polygon points="1067,140 1030,190 1105,190" fill="#0284C7" />
          <line x1="1067" y1="140" x2="1067" y2="90" stroke="#00E5FF" strokeWidth="3" />
          <circle cx="1067" cy="90" r="5" fill="#00E5FF" filter="url(#neonBeamFilter)" />

          {/* Skybridge 1 */}
          <rect x="1105" y="340" width="45" height="22" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2" rx="3" />

          {/* Tall Mega-Skyscraper (Center-Right Landmark with Antenna Radar) */}
          <rect x="1150" y="120" width="110" height="580" fill="url(#towerGlassDeep)" rx="5" stroke="#93C5FD" strokeWidth="2" />
          <polygon points="1205,50 1150,120 1260,120" fill="url(#cyanNeonGlowGrad)" />
          <line x1="1205" y1="50" x2="1205" y2="10" stroke="#00E5FF" strokeWidth="3.5" />
          <circle cx="1205" cy="10" r="6" fill="#38D6FF" filter="url(#neonBeamFilter)" />
          
          {/* Radiating Beacon Radar Waves on Antenna */}
          <circle cx="1205" cy="10" r="14" stroke="#00E5FF" strokeWidth="1.5" fill="none" opacity="0.8" className="animate-ping origin-center" />
          <circle cx="1205" cy="10" r="28" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.4" className="animate-pulse origin-center" />

          <line x1="1205" y1="120" x2="1205" y2="700" stroke="#FFFFFF" strokeWidth="3" opacity="0.85" />
          
          {/* High-tech glass gridlines */}
          <line x1="1150" y1="200" x2="1260" y2="200" stroke="#E0F2FE" strokeWidth="1.5" strokeDasharray="8,5" opacity="0.8" />
          <line x1="1150" y1="290" x2="1260" y2="290" stroke="#E0F2FE" strokeWidth="1.5" strokeDasharray="8,5" opacity="0.8" />
          <line x1="1150" y1="380" x2="1260" y2="380" stroke="#E0F2FE" strokeWidth="1.5" strokeDasharray="8,5" opacity="0.8" />

          {/* Right Tower 2 */}
          <rect x="1290" y="210" width="85" height="490" fill="url(#towerGlassCyan)" rx="4" stroke="#BAE6FD" strokeWidth="1.5" />
          <polygon points="1332,160 1290,210 1375,210" fill="#38BDF8" />

          {/* Skybridge 2 */}
          <rect x="1375" y="360" width="40" height="20" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2" rx="3" />

          {/* Mega Glass Tower Right (Illuminated Facade) */}
          <rect x="1415" y="90" width="130" height="610" fill="url(#towerGlassCyan)" rx="6" stroke="#60A5FA" strokeWidth="2.5" />
          <polygon points="1480,20 1415,90 1545,90" fill="url(#cyanNeonGlowGrad)" />
          <line x1="1480" y1="20" x2="1480" y2="-10" stroke="#00E5FF" strokeWidth="4" />
          <circle cx="1480" cy="-10" r="7" fill="#00E5FF" filter="url(#neonBeamFilter)" />
          <line x1="1480" y1="90" x2="1480" y2="700" stroke="#FFFFFF" strokeWidth="3.5" opacity="0.9" />

          {/* Far Right Towers */}
          <rect x="1565" y="170" width="100" height="530" fill="url(#towerGlassDeep)" rx="4" />
          <polygon points="1615,120 1565,170 1665,170" fill="#38BDF8" />
          <rect x="1685" y="130" width="140" height="570" fill="url(#towerGlassCyan)" rx="5" stroke="#93C5FD" strokeWidth="2" />
          <polygon points="1755,60 1685,130 1825,130" fill="#0284C7" />
          <line x1="1755" y1="60" x2="1755" y2="20" stroke="#38D6FF" strokeWidth="3" />
          <circle cx="1755" cy="20" r="6" fill="#38D6FF" filter="url(#neonBeamFilter)" />
        </g>

        {/* =============================================================
            3. HOLOGRAPHIC DATA NODES & DIGITAL CONSTELLATION
        ============================================================= */}
        <g opacity="0.85">
          {/* Tech data lines linking city nodes */}
          <path d="M 300 320 Q 550 180 820 220 T 1205 120 T 1600 200" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="6,6" fill="none" opacity="0.6" />
          <path d="M 460 280 Q 760 380 1067 190 T 1480 90" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.5" />

          {/* Glowing kindness pulse nodes */}
          <circle cx="300" cy="320" r="5" fill="#38BDF8" filter="url(#neonBeamFilter)" />
          <circle cx="820" cy="220" r="6" fill="#00E5FF" filter="url(#neonBeamFilter)" />
          <circle cx="1205" cy="120" r="7" fill="#38BDF8" filter="url(#neonBeamFilter)" />
          <circle cx="1480" cy="90" r="6" fill="#00E5FF" filter="url(#neonBeamFilter)" />
          <circle cx="1600" cy="200" r="5" fill="#38BDF8" filter="url(#neonBeamFilter)" />
        </g>

        {/* =============================================================
            4. LUSH ECO PARK GREENERY & CLEAN ENERGY WIND TURBINES
        ============================================================= */}
        <g opacity="0.95">
          <ellipse cx="60" cy="620" rx="100" ry="42" fill="#15803D" />
          <ellipse cx="160" cy="600" rx="120" ry="46" fill="#22C55E" />
          <ellipse cx="280" cy="615" rx="150" ry="52" fill="#16A34A" />
          <ellipse cx="440" cy="630" rx="170" ry="58" fill="#4ADE80" />
          <ellipse cx="610" cy="620" rx="140" ry="50" fill="#22C55E" />
          <ellipse cx="760" cy="635" rx="160" ry="54" fill="#15803D" />
          <ellipse cx="920" cy="625" rx="150" ry="52" fill="#16A34A" />
          <ellipse cx="1080" cy="630" rx="170" ry="58" fill="#22C55E" />
          <ellipse cx="1250" cy="625" rx="150" ry="52" fill="#4ADE80" />
          <ellipse cx="1410" cy="630" rx="160" ry="54" fill="#16A34A" />
          <ellipse cx="1580" cy="620" rx="150" ry="50" fill="#15803D" />
          <ellipse cx="1740" cy="610" rx="140" ry="48" fill="#22C55E" />
          <ellipse cx="1880" cy="620" rx="130" ry="45" fill="#16A34A" />

          {/* Clean Energy Wind Turbines on Eco Hills */}
          {/* Wind Turbine 1 */}
          <g transform="translate(480, 560)" opacity="0.85">
            <line x1="0" y1="0" x2="0" y2="46" stroke="#94A3B8" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="3" fill="#64748B" />
            <g className="animate-[spin_7s_linear_infinite] origin-center">
              <line x1="0" y1="0" x2="0" y2="-22" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="0" x2="19" y2="11" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="0" x2="-19" y2="11" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          {/* Wind Turbine 2 */}
          <g transform="translate(680, 565)" opacity="0.8">
            <line x1="0" y1="0" x2="0" y2="40" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="0" cy="0" r="2.5" fill="#64748B" />
            <g className="animate-[spin_9s_linear_infinite] origin-center">
              <line x1="0" y1="0" x2="0" y2="-18" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="0" x2="15.5" y2="9" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="0" x2="-15.5" y2="9" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* =============================================================
            5. ELEVATED FUTURISTIC VIADUCT & CYBER LIGHT HIGHWAYS
        ============================================================= */}
        <g opacity="0.95">
          {/* Viaduct Support Columns */}
          <rect x="220" y="660" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="420" y="650" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="620" y="655" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="820" y="660" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="1020" y="660" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="1220" y="655" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="1420" y="665" width="30" height="90" fill="url(#viaductPillar)" rx="4" />

          {/* Arched Viaduct Bridge with Glowing Electric Cyan Rails */}
          <path 
            id="viaductBridgePath"
            d="M -100 750 C 350 660, 850 640, 1350 680 C 1650 705, 1880 760, 2020 800" 
            stroke="url(#highwaySideBody)" 
            strokeWidth="32" 
            strokeLinecap="round" 
            opacity="0.65" 
          />
          <path 
            d="M -100 735 C 350 645, 850 625, 1350 665 C 1650 690, 1880 745, 2020 785" 
            stroke="url(#highwayRoadTop)" 
            strokeWidth="22" 
            strokeLinecap="round" 
          />
          <path 
            d="M -100 724 C 350 634, 850 614, 1350 654 C 1650 679, 1880 734, 2020 774" 
            stroke="#00E5FF" 
            strokeWidth="4" 
            strokeLinecap="round" 
            filter="url(#neonBeamFilter)"
            opacity="0.95" 
          />

          {/* LIVELY ANIMATED SKY METRO TRAIN 1 (Traversing Viaduct Track) */}
          <g>
            <animateMotion
              path="M -100 735 C 350 645, 850 625, 1350 665 C 1650 690, 1880 745, 2020 785"
              dur="16s"
              repeatCount="indefinite"
              rotate="auto"
            />
            {/* Metro Train Pod Body */}
            <rect x="-42" y="-9" width="84" height="18" rx="6" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <rect x="-38" y="-5" width="76" height="4" rx="2" fill="#00E5FF" filter="url(#neonBeamFilter)" />
            {/* Passenger cabin LED windows */}
            <circle cx="-28" cy="1" r="2.2" fill="#0284C7" />
            <circle cx="-16" cy="1" r="2.2" fill="#0284C7" />
            <circle cx="-4" cy="1" r="2.2" fill="#0284C7" />
            <circle cx="8" cy="1" r="2.2" fill="#0284C7" />
            <circle cx="20" cy="1" r="2.2" fill="#0284C7" />
            <circle cx="30" cy="1" r="2.2" fill="#0284C7" />
            {/* Headlight beam */}
            <polygon points="42,-3 90,-12 90,12 42,3" fill="url(#cyanNeonGlowGrad)" opacity="0.45" />
          </g>

          {/* Main Lower Cyber Highway Structure */}
          <path 
            d="M -50 910 C 420 780, 920 740, 1420 790 C 1700 820, 1890 880, 2020 930" 
            stroke="#475569" 
            strokeWidth="56" 
            strokeLinecap="round" 
            opacity="0.25" 
          />
          <path 
            d="M -50 890 C 420 760, 920 720, 1420 770 C 1700 800, 1890 860, 2020 910" 
            stroke="url(#highwayRoadTop)" 
            strokeWidth="46" 
            strokeLinecap="round" 
          />
          <path 
            d="M -50 868 C 420 738, 920 698, 1420 748 C 1700 778, 1890 838, 2020 888" 
            stroke="#FFFFFF" 
            strokeWidth="6" 
            strokeLinecap="round" 
          />
          {/* Vibrant Glowing Electric Cyan Neon Railing */}
          <path 
            d="M -20 878 C 440 750, 930 710, 1420 760 C 1700 790, 1890 850, 2000 898" 
            stroke="url(#cyanNeonGlowGrad)" 
            strokeWidth="6" 
            strokeLinecap="round" 
            filter="url(#neonBeamFilter)" 
            opacity="0.98" 
          />
          {/* High-speed Digital Light Dash Line */}
          <path 
            d="M 60 900 C 470 776, 940 736, 1420 786 C 1690 816, 1870 872, 1980 916" 
            stroke="#38BDF8" 
            strokeWidth="3.5" 
            strokeDasharray="24,14" 
            strokeLinecap="round" 
            opacity="0.95" 
          />

          {/* ANIMATED HIGHWAY VEHICLE 2 (Traveling Opposite Direction on Lower Track) */}
          <g opacity="0.9">
            <animateMotion
              path="M 2020 890 C 1890 840, 1700 780, 1420 750 C 920 700, 420 740, -50 870"
              dur="22s"
              repeatCount="indefinite"
              rotate="auto"
            />
            <rect x="-32" y="-7" width="64" height="14" rx="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
            <rect x="-26" y="-3.5" width="52" height="3" rx="1.5" fill="#38BDF8" />
            {/* Taillights */}
            <circle cx="30" cy="-2" r="1.5" fill="#EF4444" />
            <circle cx="30" cy="2" r="1.5" fill="#EF4444" />
            {/* Soft beam glow */}
            <polygon points="-32,-2 -70,-8 -70,8 -32,2" fill="#BAE6FD" opacity="0.4" />
          </g>
        </g>
      </svg>

      {/* =========================================================================
          6. VIBRANT SMART CITY ICON CLUSTERS & HOLOGRAPHIC FLOATING BADGES
      ========================================================================== */}
      
      {/* City Badge 1: Top-Left Smart Skyscraper Hub */}
      <div className="absolute top-24 left-4 sm:left-10 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-sky-200/80 shadow-md text-sky-900 animate-float-gentle">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-xs">
          <Building2 className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-bold leading-tight flex items-center gap-1.5">
            <span>Đô Thị Số 4.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-[10px] text-slate-500 font-mono">Hạ tầng trường học xanh</div>
        </div>
      </div>

      {/* City Badge 2: Mid-Left School & Education Hub */}
      <div className="absolute top-64 left-2 sm:left-8 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-200/70 shadow-sm text-blue-900 animate-float-delayed">
        <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
          <School className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[11px] font-bold leading-tight">Trường Học Hạnh Phúc</div>
          <div className="text-[9px] text-slate-500">Lan tỏa yêu thương mỗi ngày</div>
        </div>
      </div>

      {/* City Badge 3: Lower-Left Eco Urban Park & Green Mobility */}
      <div className="absolute bottom-24 left-6 sm:left-14 hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/85 backdrop-blur-md border border-emerald-200/80 shadow-md text-emerald-950 animate-float-slow">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
          <Trees className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <div className="text-[11px] font-bold leading-tight flex items-center gap-1">
            <span>Công Viên Tử Tế</span>
            <Bike className="w-3 h-3 text-emerald-500" />
          </div>
          <div className="text-[10px] text-slate-500">Môi trường số an lành</div>
        </div>
      </div>

      {/* City Badge 4: Top-Center Solar / Clean Energy */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-white/75 backdrop-blur-md border border-amber-200/80 shadow-2xs text-amber-900 animate-float-gentle">
        <Sun className="w-3.5 h-3.5 text-amber-500 animate-spin [animation-duration:12s]" />
        <span className="text-[10px] font-bold tracking-wide">NĂNG LƯỢNG TÍCH CỰC & TRẮC ẨN</span>
        <Zap className="w-3 h-3 text-amber-500 fill-amber-400" />
      </div>

      {/* City Badge 5: Top-Right Kindness 5G Transmission Hub */}
      <div className="absolute top-24 right-4 sm:right-10 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-cyan-200/80 shadow-md text-cyan-950 animate-float-delayed">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white flex items-center justify-center shadow-xs">
          <Radio className="w-4 h-4 animate-pulse" />
        </div>
        <div>
          <div className="text-[11px] font-bold leading-tight flex items-center gap-1.5">
            <span>Trạm Phát Sóng 432Hz</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div className="text-[10px] text-slate-500 font-mono">Tần số thấu cảm học đường</div>
        </div>
      </div>

      {/* City Badge 6: Mid-Right Sky Metro & 34 Provinces Link */}
      <div className="absolute top-64 right-2 sm:right-8 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-sky-200/70 shadow-sm text-sky-900 animate-float-gentle">
        <div className="w-7 h-7 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
          <Train className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[11px] font-bold leading-tight">Sky Metro Yêu Thương</div>
          <div className="text-[9px] text-slate-500">Tuyến xe kết nối 34 tỉnh thành</div>
        </div>
      </div>

      {/* City Badge 7: Bottom-Right Compassion Landmark */}
      <div className="absolute bottom-28 right-6 sm:right-14 hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/85 backdrop-blur-md border border-rose-200/80 shadow-md text-rose-950 animate-float-slow">
        <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-bounce" />
        </div>
        <div>
          <div className="text-[11px] font-bold leading-tight flex items-center gap-1">
            <span>1,400+ Điểm Chạm Tử Tế</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>
          <div className="text-[10px] text-slate-500">Mỗi hành động là một đóa hoa</div>
        </div>
      </div>

      {/* City Icon Silhouette Horizon Decals (Row of cute architectural icons across the background) */}
      <div className="absolute bottom-16 inset-x-0 hidden md:flex items-center justify-around px-8 opacity-25 pointer-events-none text-sky-700">
        <div className="flex items-center gap-1"><Building className="w-5 h-5" /><span className="text-[9px] font-mono">Tòa thị chính</span></div>
        <div className="flex items-center gap-1"><Landmark className="w-5 h-5" /><span className="text-[9px] font-mono">Bảo tàng ký ức</span></div>
        <div className="flex items-center gap-1"><BookOpen className="w-5 h-5" /><span className="text-[9px] font-mono">Thư viện số</span></div>
        <div className="flex items-center gap-1"><GraduationCap className="w-5 h-5" /><span className="text-[9px] font-mono">Học viện trắc ẩn</span></div>
        <div className="flex items-center gap-1"><TreePine className="w-5 h-5" /><span className="text-[9px] font-mono">Vườn thông sinh thái</span></div>
        <div className="flex items-center gap-1"><ShieldCheck className="w-5 h-5" /><span className="text-[9px] font-mono">Không gian an toàn</span></div>
      </div>

      {/* Cyber City Telemetry HUD Chips Floating in Sky */}
      <div className="absolute top-36 left-8 sm:left-14 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-sky-200/80 text-[11px] font-mono text-[#0369A1] shadow-2xs">
        <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-ping" />
        <span>KẾT NỐI KHÔNG GIAN SỐ: 34 TỈNH THÀNH</span>
      </div>

      <div className="absolute top-36 right-8 sm:right-14 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-cyan-200/80 text-[11px] font-mono text-[#0284C7] shadow-2xs">
        <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
        <span>TẦN SỐ ĐỒNG ĐIỆU: 432Hz HARMONY</span>
      </div>

      {/* Soft Vignette & Seamless Bottom Blend to Content */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent pointer-events-none" />
    </div>
  );
};
