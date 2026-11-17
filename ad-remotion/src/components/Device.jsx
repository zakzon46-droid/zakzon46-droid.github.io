// =====================================================================
// Cadres matériels (laptop / téléphone) — style SaaS premium, CSS pur.
// Les écrans accueillent les VRAIES captures (ou placeholders).
// =====================================================================

export const LaptopFrame = ({width, style = {}, children}) => {
  const bezel = Math.max(6, width * 0.012);
  const screenH = width * 0.625;
  return (
    <div style={{width, ...style}}>
      <div
        style={{
          width: '100%',
          height: screenH,
          background: '#05070C',
          borderRadius: 10,
          border: `${bezel}px solid #1E2430`,
          boxShadow: '0 34px 70px rgba(0,0,0,0.55)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {children}
      </div>
      <div
        style={{
          width: '118%',
          height: Math.max(10, width * 0.03),
          marginLeft: '-9%',
          background: 'linear-gradient(#2A3140, #161B26)',
          borderRadius: '0 0 14px 14px',
        }}
      />
    </div>
  );
};

export const PhoneFrame = ({width, style = {}, children}) => {
  const h = width * 2.05;
  const border = Math.max(8, width * 0.05);
  return (
    <div
      style={{
        width,
        height: h,
        background: '#05070C',
        borderRadius: width * 0.14,
        border: `${border}px solid #1E2430`,
        boxShadow: '0 34px 70px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: width * 0.05,
          left: '50%',
          transform: 'translateX(-50%)',
          width: width * 0.34,
          height: width * 0.09,
          background: '#1E2430',
          borderRadius: 99,
          zIndex: 2,
        }}
      />
      {children}
    </div>
  );
};
