import React from "react";

const styles: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    background: "white",
    transform: "translate(-50%, -50%)"
}

const loaderBlock: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "500px"
}

const roller: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
    width: "64px",
    height: "64px"
}

const rollerKeyframes = `
@keyframes lds-roller {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Inject keyframes into a <style> tag
const KeyframesStyle = () => (
  <style>
    {rollerKeyframes}
  </style>
);

const rollerDivStyle: React.CSSProperties = {
  animation: 'lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
  transformOrigin: '32px 32px',
  position: 'absolute',
};

const dotStyleBase: React.CSSProperties = {
  position: 'absolute',
  display: 'block',
  margin: '-3px 0 0 -3px',
  borderRadius: '50%',
  width: '6px',
  height: '6px',
  background: 'blue', // or replace with a direct color
  content: "' '",
};

const dots = [
  { delay: -0.036, top: 50, left: 50 },
  { delay: -0.072, top: 54, left: 45 },
  { delay: -0.108, top: 57, left: 39 },
  { delay: -0.144, top: 58, left: 32 },
  { delay: -0.18, top: 57, left: 25 },
  { delay: -0.216, top: 54, left: 19 },
  { delay: -0.252, top: 50, left: 14 },
  { delay: -0.288, top: 45, left: 10 },
];


export const Loader = ({ extraClass = "" }) => (
  <div className={`tw-col-span-12 ${extraClass}`} style={{...loaderBlock}}>
    <KeyframesStyle />
    <div style={styles}>
      <div style={roller}>
        {dots.map((dot, idx) => (
            <div
                key={idx}
                style={{
                    ...rollerDivStyle,
                    animationDelay: `${dot.delay}s`,
                }}
            >
                <div
                    style={{
                        ...dotStyleBase,
                        top: dot.top,
                        left: dot.left,
                    }}
                />
            </div>
        ))}
      </div>
    </div>
  </div>
);