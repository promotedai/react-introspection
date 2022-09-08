import { css, keyframes } from '@emotion/react'

export const Checkmark = () => {
  const strokeKeyframes = keyframes`
    100% {
      stroke-dashoffset: 0;
    }
  `
  const scaleKeyframes = keyframes`
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  `
  const fillKeyframes = keyframes`
    100% {
      box-shadow: inset 0 0 0 100vh var(--checkmark-fill-color);
    }
  `
  const checkmarkStyle = css`
    width: 16px;
    height: 16px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    stroke: #7ac142;
    stroke-width: 5;
    stroke-miterlimit: 10;
    animation: ${fillKeyframes} 0.4s ease-in-out 0.4s forwards, ${scaleKeyframes} 0.3s ease-in-out 0.9s both;
  `
  const circleStyle = css`
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 5;
    stroke-miterlimit: 10;
    stroke: #7ac142;
    fill: none;
    animation: ${strokeKeyframes} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  `
  const pathStyle = css`
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: ${strokeKeyframes} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  `
  return (
    <svg
      className='checkmark'
      xmlns='http://www.w3.org/2000/svg'
      css={checkmarkStyle}
      viewBox='0 0 52 52'
    >
      <circle cx='26' cy='26' r='25' fill='none' css={circleStyle} />
      <path fill='none' d='M14.1 27.2l7.1 7.2 16.7-16.8' css={pathStyle} />
    </svg>
  );
}
