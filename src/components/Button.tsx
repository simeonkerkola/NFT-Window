import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  height: 2rem;
  padding: 0.5rem;
  border: 2px solid ${(props) => props.theme.colors.neutral['400']};
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
  color: ${(props) => props.theme.colors.neutral['50']};
  background: ${(props) => props.theme.colors.neutral['400']};
`;
type Ref = HTMLButtonElement;
const Button = React.forwardRef<Ref, React.ComponentPropsWithRef<'button'>>(
  ({ children, ...rest }, ref) => (
    <StyledButton ref={ref} {...rest}>
      {children}
    </StyledButton>
  )
);

export default Button;
