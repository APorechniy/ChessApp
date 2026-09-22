'use client';

import styled from 'styled-components';

export const PortalWrapper = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  left: auto; 
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
`;

export const ItemWrapper = styled.div`
  pointer-events: auto;
`;