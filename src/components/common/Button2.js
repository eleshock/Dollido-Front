import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const colorStyles = css`
    ${({ theme, color }) => {
        const selected = theme.palette[color];
        
        return css`
            background: ${selected}; 
            
            &:hover {
                transform: scale(1.2);
                background: ${lighten(0.1, selected)};
            }
        
            &:active {
                background: ${darken(0.1, selected)};
            }
            
            ${props => props.outline && css`
                color: ${selected};
                background: none;
                border: 1px solid ${selected};
                
                &:hover {
                    background: ${selected};
                    color: white;
                }
            `}
        `;
    }}
`;

const sizes = {
    large: {
        height: '5rem',
        fontSize: '3rem',
        width: '180px',
    },
    medium: {
        height: '2.25rem',
        fontSize: '1rem'
    },
    small: {
        height: '32px',
        fontSize: '0.875rem'
    }
};

const sizeStyles = css`
    ${({ size }) => css`
        height: ${sizes[size].height};
        font-size: ${sizes[size].fontSize};
        line-height: ${sizes[size].height};
    `}
`;

const StyledButton = styled.button`
    white-space: nowrap;
    display: inline-flex;
    outline: none;
    border: none;
    color: white;
    font-weight: bold;
    font-family: koverwatch;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;

    ${sizeStyles}
    ${colorStyles}
    
    & + & {
        margin-left: 1rem;
    }
`;

function Button({ children, color, size, outline, fullWidth, ...rest }) {
    return ( 
        <StyledButton 
            color = {color}
            size = {size}
            outline = {outline}
            fullWidth = {fullWidth} 
            {...rest} 
        >
            {children} 
        </StyledButton>
    );
};

Button.defaultProps = {
    color: 'blue',
    size: 'medium'
};

export default Button;