import styled, { css } from 'styled-components';
import { Button } from 'antd';

export const StyledUsersPage = styled.div(() => {
  return css`
    max-width: 1024px;
    margin: 0 auto;
  `;
});

export const StyledUserOrders = styled.div(() => {
  return css`
  `;
});

export const StyledUserDetails = styled.div(() => {
  return css`
    margin-bottom: 16px;
  `;
});

export const StyledBackIcon = styled.span(() => {
  return css`
    height: 16px;
    width: 16px;
    cursor: pointer;
    margin-right: 8px;
  `;
});

export const StyledViewOrdersLink = styled(Button)(() => {
  return css`
    padding: 0 4px;
  `;
})