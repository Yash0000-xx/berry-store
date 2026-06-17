export default function BerryLogo() {
  return (
    <svg 
      width="38" 
      height="44" 
      viewBox="0 0 44 52" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      // ✨ HIGH-KEY MINIMALIST: Removed the glowing neon shadow, replaced with a subtle, physical drop shadow
      className="drop-shadow-sm"
    >
      <defs>
        {/* ✨ Obsidian Metallic Gradients */}
        <radialGradient id="berry-left" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#52525b" />   {/* zinc-600 */}
          <stop offset="70%" stopColor="#18181b" />  {/* zinc-900 */}
          <stop offset="100%" stopColor="#09090b" /> {/* zinc-950 */}
        </radialGradient>
        <radialGradient id="berry-right" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#3f3f46" />   {/* zinc-700 */}
          <stop offset="75%" stopColor="#09090b" />  {/* zinc-950 */}
          <stop offset="100%" stopColor="#000000" /> {/* black */}
        </radialGradient>
        <radialGradient id="berry-top" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#71717a" />   {/* zinc-500 */}
          <stop offset="70%" stopColor="#27272a" />  {/* zinc-800 */}
          <stop offset="100%" stopColor="#18181b" /> {/* zinc-900 */}
        </radialGradient>
        
        {/* ✨ Matte Dark Grey Leaf Gradients */}
        <linearGradient id="leaf-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3f3f46" />   {/* zinc-700 */}
          <stop offset="100%" stopColor="#18181b" /> {/* zinc-900 */}
        </linearGradient>
        <linearGradient id="leaf-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#52525b" />   {/* zinc-600 */}
          <stop offset="100%" stopColor="#09090b" /> {/* zinc-950 */}
        </linearGradient>
      </defs>

      {/* Stem */}
      <path 
        d="M22 14C22 8 26 4 32 3" 
        stroke="#27272a" 
        strokeWidth="3" 
        strokeLinecap="round" 
      />

      {/* Leaves */}
      <path 
        d="M22 14C14 10 6 13 4 18C4 24 14 22 22 14Z" 
        fill="url(#leaf-grad-1)" 
      />
      <path 
        d="M22 14C28 8 36 9 39 14C41 20 31 20 22 14Z" 
        fill="url(#leaf-grad-2)" 
      />

      {/* Berry 1: Bottom Left */}
      <circle cx="15" cy="37" r="11" fill="url(#berry-left)" />
      <circle cx="15" cy="37" r="11" fill="black" fillOpacity="0.2" />
      <ellipse cx="12.5" cy="32.5" rx="3" ry="1.5" transform="rotate(-30 12.5 32.5)" fill="white" fillOpacity="0.3" />
      <circle cx="10" cy="35" r="0.75" fill="white" fillOpacity="0.5" />

      {/* Berry 2: Bottom Right */}
      <circle cx="29" cy="37" r="11" fill="url(#berry-right)" />
      <circle cx="29" cy="37" r="11" fill="black" fillOpacity="0.2" />
      <ellipse cx="26.5" cy="32.5" rx="3" ry="1.5" transform="rotate(-30 26.5 32.5)" fill="white" fillOpacity="0.3" />
      <circle cx="24" cy="35" r="0.75" fill="white" fillOpacity="0.5" />

      {/* Berry 3: Top Center */}
      <circle cx="22" cy="25" r="12" fill="url(#berry-top)" />
      <ellipse cx="19.5" cy="20.5" rx="3.5" ry="1.8" transform="rotate(-30 19.5 20.5)" fill="white" fillOpacity="0.4" />
      <circle cx="16.5" cy="23" r="0.8" fill="white" fillOpacity="0.6" />
    </svg>
  );
}