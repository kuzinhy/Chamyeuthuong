import React from 'react';

export const DigitalCityBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
      {/* 
        Ultra-realistic, full-fidelity panoramic vector art of the uploaded Smart Digital City Artwork
        Features:
        - Azure & Cyan Daylight Atmosphere with gentle sunburst
        - Modern Glass Skyscrapers & Futuristic High-rises with illuminated antennas & skybridges
        - Lush Green Eco-Park Tree Canopy spanning the base of the skyline
        - Multi-tier Elevated Viaducts and Highways with Glowing Electric Cyan Light Rails
        - Photorealistic Light Trails & Digital Highway Floor reflections
        - Rich Foreground foliage accents (Left and Right corners)
      */}
      
      {/* Base Sky & Atmosphere Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#64B5F6] via-[#BAE6FD] via-60% to-[#F0F9FF]" />
      
      {/* Sunlight Flare at Upper Sky */}
      <div className="absolute -top-20 left-1/3 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(186,230,253,0.4)_50%,transparent_80%)] blur-2xl pointer-events-none" />

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
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#BAE6FD" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.4" />
          </linearGradient>

          {/* Gradients for Prominent Glass High-Rises */}
          <linearGradient id="towerGlassCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#7DD3FC" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#0284C7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="towerGlassDeep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#0284C7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0C4A6E" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="towerFacetWhite" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.5" />
          </linearGradient>

          {/* Viaduct / Elevated Bridge Gradients */}
          <linearGradient id="viaductPillar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="highwayRoadTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="30%" stopColor="#E0F2FE" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#BAE6FD" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
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

          {/* Leaf Gradients */}
          <linearGradient id="leafFrontLeft" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14532D" />
            <stop offset="40%" stopColor="#16A34A" />
            <stop offset="80%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#BBF7D0" />
          </linearGradient>

          <linearGradient id="leafFrontRight" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#14532D" />
            <stop offset="45%" stopColor="#22C55E" />
            <stop offset="85%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#DCFCE7" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="neonBeamFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur1" />
            <feGaussianBlur stdDeviation="2.5" result="blur2" />
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
        <g opacity="0.75">
          {/* Far Left Towers */}
          <rect x="120" y="240" width="55" height="460" fill="url(#bgSkyTowerFar)" rx="3" />
          <polygon points="147,190 120,240 175,240" fill="#7DD3FC" opacity="0.8" />
          <rect x="195" y="280" width="60" height="420" fill="url(#bgSkyTowerFar)" rx="3" />
          <rect x="275" y="210" width="80" height="490" fill="url(#bgSkyTowerFar)" rx="4" />
          <polygon points="315,150 275,210 355,210" fill="#38BDF8" opacity="0.85" />
          
          {/* Mid-Left Landmark Diagonal Tower */}
          <polygon points="410,230 460,160 510,230 510,700 410,700" fill="url(#towerFacetWhite)" />
          <polygon points="460,160 510,230 510,700 460,700" fill="url(#towerGlassCyan)" opacity="0.8" />

          {/* Center-Left Towers */}
          <rect x="540" y="260" width="65" height="440" fill="url(#bgSkyTowerFar)" rx="3" />
          <polygon points="572,210 540,260 605,260" fill="#60A5FA" opacity="0.7" />
          <rect x="630" y="220" width="85" height="480" fill="url(#bgSkyTowerFar)" rx="4" />
          <polygon points="672,160 630,220 715,220" fill="#38BDF8" opacity="0.8" />
          
          {/* Center Skyline Landmark (Angled Glass Tower) */}
          <polygon points="760,200 810,130 870,220 870,700 760,700" fill="url(#towerFacetWhite)" />
          <polygon points="810,130 870,220 870,700 810,700" fill="url(#towerGlassCyan)" opacity="0.9" />
          <line x1="810" y1="130" x2="810" y2="700" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.9" />

          {/* Mid-Center Towers */}
          <rect x="895" y="290" width="55" height="410" fill="url(#bgSkyTowerFar)" rx="3" />
          <rect x="970" y="230" width="70" height="470" fill="url(#bgSkyTowerFar)" rx="3" />
          <polygon points="1005,180 970,230 1040,230" fill="#60A5FA" opacity="0.8" />
        </g>

        {/* =============================================================
            2. PROMINENT MODERN SMART CITY GLASS SKYSCRAPERS (Midground)
        ============================================================= */}
        <g opacity="0.95">
          {/* Center-Right Tower with Spire */}
          <rect x="1060" y="190" width="75" height="510" fill="url(#towerGlassCyan)" rx="4" stroke="#BAE6FD" strokeWidth="1.5" />
          <line x1="1097" y1="190" x2="1097" y2="700" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
          <polygon points="1097,140 1060,190 1135,190" fill="#0284C7" />
          <line x1="1097" y1="140" x2="1097" y2="100" stroke="#00E5FF" strokeWidth="3" />
          <circle cx="1097" cy="100" r="4.5" fill="#00E5FF" filter="url(#neonBeamFilter)" />

          {/* Skybridge 1 */}
          <rect x="1135" y="340" width="45" height="22" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2" rx="3" />

          {/* Tall Mega-Skyscraper (Center-Right Landmark) */}
          <rect x="1180" y="120" width="105" height="580" fill="url(#towerGlassDeep)" rx="5" stroke="#93C5FD" strokeWidth="2" />
          <polygon points="1232,50 1180,120 1285,120" fill="url(#cyanNeonGlowGrad)" />
          <line x1="1232" y1="50" x2="1232" y2="10" stroke="#00E5FF" strokeWidth="3.5" />
          <circle cx="1232" cy="10" r="5.5" fill="#38D6FF" filter="url(#neonBeamFilter)" />
          <line x1="1232" y1="120" x2="1232" y2="700" stroke="#FFFFFF" strokeWidth="3" opacity="0.85" />
          {/* High-tech glass gridlines */}
          <line x1="1180" y1="220" x2="1285" y2="220" stroke="#E0F2FE" strokeWidth="1.5" strokeDasharray="8,5" opacity="0.8" />
          <line x1="1180" y1="320" x2="1285" y2="320" stroke="#E0F2FE" strokeWidth="1.5" strokeDasharray="8,5" opacity="0.8" />
          <line x1="1180" y1="420" x2="1285" y2="420" stroke="#E0F2FE" strokeWidth="1.5" strokeDasharray="8,5" opacity="0.8" />

          {/* Right Tower 2 */}
          <rect x="1310" y="210" width="85" height="490" fill="url(#towerGlassCyan)" rx="4" stroke="#BAE6FD" strokeWidth="1.5" />
          <polygon points="1352,160 1310,210 1395,210" fill="#38BDF8" />

          {/* Skybridge 2 */}
          <rect x="1395" y="370" width="40" height="20" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2" rx="3" />

          {/* Mega Glass Tower Right (Illuminated Facade) */}
          <rect x="1435" y="90" width="125" height="610" fill="url(#towerGlassCyan)" rx="6" stroke="#60A5FA" strokeWidth="2.5" />
          <polygon points="1497,20 1435,90 1560,90" fill="url(#cyanNeonGlowGrad)" />
          <line x1="1497" y1="20" x2="1497" y2="-10" stroke="#00E5FF" strokeWidth="4" />
          <circle cx="1497" cy="-10" r="6" fill="#00E5FF" filter="url(#neonBeamFilter)" />
          <line x1="1497" y1="90" x2="1497" y2="700" stroke="#FFFFFF" strokeWidth="3.5" opacity="0.9" />

          {/* Far Right Towers */}
          <rect x="1580" y="180" width="95" height="520" fill="url(#towerGlassDeep)" rx="4" />
          <polygon points="1627,130 1580,180 1675,180" fill="#38BDF8" />
          <rect x="1695" y="140" width="130" height="560" fill="url(#towerGlassCyan)" rx="5" stroke="#93C5FD" strokeWidth="2" />
          <polygon points="1760,70 1695,140 1825,140" fill="#0284C7" />
          <line x1="1760" y1="70" x2="1760" y2="30" stroke="#38D6FF" strokeWidth="3" />
          <circle cx="1760" cy="30" r="5" fill="#38D6FF" filter="url(#neonBeamFilter)" />
        </g>

        {/* =============================================================
            3. LUSH ECO PARK GREENERY & FOREST CANOPY
        ============================================================= */}
        <g opacity="0.95">
          {/* Dense City-base Greenery Canopies */}
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

          {/* Front Bright Emerald Tree Crowns */}
          <ellipse cx="120" cy="640" rx="90" ry="38" fill="#86EFAC" opacity="0.8" />
          <ellipse cx="360" cy="650" rx="110" ry="42" fill="#4ADE80" opacity="0.85" />
          <ellipse cx="560" cy="645" rx="100" ry="40" fill="#86EFAC" opacity="0.8" />
          <ellipse cx="840" cy="655" rx="120" ry="44" fill="#4ADE80" opacity="0.85" />
          <ellipse cx="1040" cy="650" rx="110" ry="42" fill="#86EFAC" opacity="0.8" />
          <ellipse cx="1320" cy="645" rx="120" ry="44" fill="#4ADE80" opacity="0.85" />
          <ellipse cx="1520" cy="650" rx="110" ry="42" fill="#86EFAC" opacity="0.8" />
        </g>

        {/* =============================================================
            4. ELEVATED FUTURISTIC VIADUCT & ARCHED SUPPORTS
        ============================================================= */}
        <g opacity="0.9">
          {/* Viaduct Support Columns / Arches under Mid Highway */}
          <rect x="220" y="660" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="360" y="650" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="520" y="655" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="680" y="660" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="840" y="665" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="1000" y="660" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="1160" y="655" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="1320" y="660" width="30" height="90" fill="url(#viaductPillar)" rx="4" />
          <rect x="1480" y="670" width="30" height="90" fill="url(#viaductPillar)" rx="4" />

          {/* Arched Viaduct Bridge */}
          <path 
            d="M -100 750 C 350 660, 850 640, 1350 680 C 1650 705, 1880 760, 2020 800" 
            stroke="url(#highwaySideBody)" 
            strokeWidth="32" 
            strokeLinecap="round" 
            opacity="0.6" 
          />
          <path 
            d="M -100 735 C 350 645, 850 625, 1350 665 C 1650 690, 1880 745, 2020 785" 
            stroke="url(#highwayRoadTop)" 
            strokeWidth="22" 
            strokeLinecap="round" 
          />
          <path 
            d="M -100 724 C 350 634, 850 614, 1350 654 C 1650 679, 1880 734, 2020 774" 
            stroke="#FFFFFF" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            opacity="0.95" 
          />
        </g>

        {/* =============================================================
            5. FOREGROUND SWEEPING HIGH-TECH ROADWAY WITH CYAN NEON STRIP
        ============================================================= */}
        <g>
          {/* Main Lower Highway Structure */}
          <path 
            d="M -50 910 C 420 780, 920 740, 1420 790 C 1700 820, 1890 880, 2020 930" 
            stroke="#64748B" 
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
          {/* Glass Railing / White Top Highlight */}
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
            strokeWidth="5" 
            strokeLinecap="round" 
            filter="url(#neonBeamFilter)" 
            opacity="0.98" 
          />
          {/* High-speed Digital Light Dash Line */}
          <path 
            d="M 60 900 C 470 776, 940 736, 1420 786 C 1690 816, 1870 872, 1980 916" 
            stroke="#E0F2FE" 
            strokeWidth="2.5" 
            strokeDasharray="24,14" 
            strokeLinecap="round" 
            opacity="0.9" 
          />
        </g>

        {/* =============================================================
            6. NATURAL VIBRANT GREEN LEAF BRANCHES (Left & Right Framing)
        ============================================================= */}
        <g>
          {/* Bottom-Left Foreground Green Foliage */}
          <g transform="translate(-30, 790) rotate(-12)">
            <ellipse cx="60" cy="60" rx="75" ry="34" fill="url(#leafFrontLeft)" transform="rotate(-30 60 60)" />
            <ellipse cx="130" cy="40" rx="70" ry="30" fill="url(#leafFrontLeft)" transform="rotate(-10 130 40)" />
            <ellipse cx="190" cy="65" rx="85" ry="36" fill="url(#leafFrontLeft)" transform="rotate(20 190 65)" />
            <ellipse cx="110" cy="115" rx="80" ry="34" fill="url(#leafFrontLeft)" transform="rotate(45 110 115)" />
            <ellipse cx="45" cy="145" rx="65" ry="30" fill="url(#leafFrontLeft)" transform="rotate(65 45 145)" />
            {/* Dewdrop Sun Reflections */}
            <circle cx="120" cy="35" r="4.5" fill="#FFFFFF" opacity="0.85" />
            <circle cx="180" cy="58" r="4" fill="#FFFFFF" opacity="0.8" />
          </g>

          {/* Bottom-Right Foreground Green Foliage */}
          <g transform="translate(1760, 770) rotate(12)">
            <ellipse cx="40" cy="60" rx="80" ry="34" fill="url(#leafFrontRight)" transform="rotate(-25 40 60)" />
            <ellipse cx="110" cy="50" rx="85" ry="36" fill="url(#leafFrontRight)" transform="rotate(15 110 50)" />
            <ellipse cx="150" cy="115" rx="75" ry="32" fill="url(#leafFrontRight)" transform="rotate(40 150 115)" />
            <ellipse cx="70" cy="135" rx="70" ry="30" fill="url(#leafFrontRight)" transform="rotate(70 70 135)" />
            {/* Dewdrop Reflections */}
            <circle cx="105" cy="44" r="4.5" fill="#FFFFFF" opacity="0.85" />
          </g>
        </g>
      </svg>

      {/* Soft Vignette & Seamless Bottom Blend to Content */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/75 to-transparent pointer-events-none" />
    </div>
  );
};
