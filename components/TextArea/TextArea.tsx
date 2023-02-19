import { TextAreaProps } from './TextArea.props';
import styles from './TextArea.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const TextArea = forwardRef(({ className, error, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	
	TextArea.displayName = "TextArea";

	return (
		<div className={cn(className, styles.textareaWrapper)}>
			<textarea
				className={cn(styles.textarea, {
					[styles.error]: error
				})}
				ref={ref}
				{...props}
			/>
			{error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
});

