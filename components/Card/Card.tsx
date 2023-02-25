import { CardProps } from './Card.props';
import styles from './Card.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Card = forwardRef(({ cardColor='white', children, className, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

	Card.displayName = "Card";
	
	return (
		<div className={cn(styles.card, className, {
			[styles.blue]: cardColor == 'blue'
		})} 
		ref={ref}
		{...props}
		>
			{children}
		</div>
	);
});
