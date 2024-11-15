import React from 'react';

interface TextProps {
    size: 'small' | 'medium' | 'large';
    children: React.ReactNode;
}

const sizes = {
    small: '14px',
    medium: '20px',
    large: '24px',
};

const colors = {
    small: '14px',
    medium: '20px',
    large: '24px',
};

const Typography = ({ size, children }: TextProps) => {
    const style = {
        fontSize: sizes[size],
    };

    return <span style={style}>{children}</span>;
};

export default Typography