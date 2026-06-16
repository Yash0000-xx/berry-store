export default function BerryLogo() {
  return (
    <svg 
      width="38" 
      height="44" 
      viewBox="0 0 44 52" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
    >
      <defs>
        {/* Berry Gradients */}
        <radialGradient id="berry-left" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="70%" stopColor="#4C1D95" />
          <stop offset="100%" stopColor="#2E1065" />
        </radialGradient>
        <radialGradient id="berry-right" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="75%" stopColor="#581C87" />
          <stop offset="100%" stopColor="#3B0764" />
        </radialGradient>
        <radialGradient id="berry-top" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#D8B4FE" />
          <stop offset="70%" stopColor="#7E22CE" />
          <stop offset="100%" stopColor="#6B21A8" />
        </radialGradient>
        
        {/* Leaf Gradients */}
        <linearGradient id="leaf-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
        <linearGradient id="leaf-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
      </defs>

      {/* Stem */}
      <path 
        d="M22 14C22 8 26 4 32 3" 
        stroke="#92400E" 
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
      <circle cx="15" cy="37" r="11" fill="black" fillOpacity="0.1" />
      <ellipse cx="12.5" cy="32.5" rx="3" ry="1.5" transform="rotate(-30 12.5 32.5)" fill="white" fillOpacity="0.4" />
      <circle cx="10" cy="35" r="0.75" fill="white" fillOpacity="0.6" />

      {/* Berry 2: Bottom Right */}
      <circle cx="29" cy="37" r="11" fill="url(#berry-right)" />
      <circle cx="29" cy="37" r="11" fill="black" fillOpacity="0.1" />
      <ellipse cx="26.5" cy="32.5" rx="3" ry="1.5" transform="rotate(-30 26.5 32.5)" fill="white" fillOpacity="0.4" />
      <circle cx="24" cy="35" r="0.75" fill="white" fillOpacity="0.6" />

      {/* Berry 3: Top Center */}
      <circle cx="22" cy="25" r="12" fill="url(#berry-top)" />
      <ellipse cx="19.5" cy="20.5" rx="3.5" ry="1.8" transform="rotate(-30 19.5 20.5)" fill="white" fillOpacity="0.5" />
      <circle cx="16.5" cy="23" r="0.8" fill="white" fillOpacity="0.7" />
    </svg>
  );
}