import { styled } from '@nextui-org/react';

export const StyledNavBar = styled('nav', {
  display: 'flex',
  top: 0,
  alignItems: 'center',
  position: 'sticky',
  height: '76px',
  zIndex: '$max',
  variants: {
    showBlur: {
      true: {
        background: '$headerBackground',
        backdropFilter: 'saturate(180%) blur(10px)',
      },
    },
    detached: {
      true: {
        boxShadow: '0px 5px 20px -5px rgba(2, 1, 1, 0.1)',
      },
    },
  },
});
