/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';
import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import StarIcon from './star.svg';
import cn from 'classnames';


export const Rating = forwardRef(({ isEditable=false, rating, setRating, error, tabIndex, ...props }: RatingProps, ref:ForwardedRef<HTMLDivElement>): JSX.Element => {

	Rating.displayName = "Rating";

	// ratingArray is just a current appearance of rating component, not its value
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);


	useEffect(() => {
		constructRating(rating); 	
	}, [rating, tabIndex]);

	const computeFocus = (r: number, i: number): number => {
		if (!isEditable) {
			return -1;
		}
		if (!rating || i == 0) {
			return tabIndex ?? 0;
		}
		if (r == i + 1) {
			return tabIndex ?? 0;
		}
		return -1;
	};

	// currentRating = 1..5, i = 0..4
	// we don't use rating from props because we want to use this function not only 
	// on props changing but also on hover
	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<span
					key={i}
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable
					}
					)}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => onClick(i + 1)}
					tabIndex={computeFocus(rating, i)}
					onKeyDown={handleKey}
					ref={r => ratingArrayRef.current?.push(r)}
					role={isEditable ? 'slider' : ''}
					aria-invalid={error ? true: false}
					aria-valuenow={rating}
					aria-valuemax={5}
					aria-valuemin={1}
					aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг' + rating)}
				>

				<StarIcon
				/>
				</span>	
			);
		});
		setRatingArray(updatedArray);
	};
	
	const changeDisplay = (i: number) => {
		if (!isEditable) {
			return;
		}
		constructRating(i);
	};

	const onClick = (i: number) => {
		if (!isEditable || !setRating) {
			return;
		}
		setRating(i);
	};
	
	const handleKey = (e: KeyboardEvent) => {
		if (!isEditable || !setRating) {
			return;
		}
		if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
			if (!rating) {
				setRating(1);
			}
			else {
				e.preventDefault();
				setRating(rating < 5 ? rating + 1 : 5);
			}
			ratingArrayRef.current[rating]?.focus();
		}
		if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
			if (!rating) {
				setRating(rating > 1 ? rating - 1 : 1);
			}
			else
			{
				e.preventDefault();
				setRating(rating - 1);
			}
			ratingArrayRef.current[rating-2]?.focus();
		}
	};


	return (
		<div {...props}
			ref={ref}
			className={cn(styles.ratingWrapper, {
				[styles.error]: error
			})}
		>
			{ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
			{error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
});
