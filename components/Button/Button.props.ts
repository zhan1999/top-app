import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps extends
	Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
	'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'ref'>
{
	children: ReactNode;
	appearance: 'primary' | 'ghost';
	arrow?: 'right' | 'down' | 'none';
}



// type DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

// type DetailedHTMLProps<A<T>, T>

 