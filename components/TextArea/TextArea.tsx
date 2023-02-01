import { TextAreaProps } from './TextArea.props';
import styles from './TextArea.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const TextArea = forwardRef(({ className, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	
	TextArea.displayName = "TextArea";

	return (
		<textarea className={cn(className, styles.textarea)} ref={ref} {...props} />
	);
});

