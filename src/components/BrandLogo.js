export default function BrandLogo({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      {/* 星星主体 */}
      <polygon points="28,4 33,20 52,20 36,31 42,48 28,38 14,48 20,31 4,20 23,20"
        fill="#ffe066" stroke="#f9ca24" strokeWidth="2" />
      {/* G字母 */}
      <text x="28" y="32" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#00b894" fontFamily="Comic Sans MS, Arial">
        G
      </text>
      {/* 学士帽 */}
      <rect x="18" y="7" width="20" height="6" rx="2" fill="#0984e3" transform="rotate(-10 28 10)" />
      <rect x="26" y="13" width="4" height="7" rx="2" fill="#636e72" />
      {/* 小加号 */}
      <g>
        <rect x="44" y="10" width="2" height="8" rx="1" fill="#00b894" />
        <rect x="41" y="13" width="8" height="2" rx="1" fill="#00b894" />
      </g>
      {/* 小乘号 */}
      <g>
        <rect x="8" y="44" width="2" height="8" rx="1" fill="#e17055" transform="rotate(45 9 48)" />
        <rect x="8" y="44" width="2" height="8" rx="1" fill="#e17055" transform="rotate(-45 9 48)" />
      </g>
    </svg>
  );
} 