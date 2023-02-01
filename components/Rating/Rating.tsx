import React, { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from 'react';
import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import StarIcon from './star.svg';
import cn from 'classnames';


export const Rating = forwardRef(({ isEditable=false, rating, setRating, error, ...props }: RatingProps, ref:ForwardedRef<HTMLDivElement>): JSX.Element => {

	Rating.displayName = "Rating";

	// ratingArray is just a current appearance of rating component, not its value
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating); 	
	}, [rating]);

	// currentRating = 1..5, i = 0..4
	// we don't use rating from props because we want to use this function not only 
	// on props changing but also on hover
	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<span
				key = {i}
				className={cn(styles.star, {
					[styles.filled]: i < currentRating,
					[styles.editable]: isEditable
					}
				)}	
				onMouseEnter={() => changeDisplay(i + 1)}
				onMouseLeave={() => changeDisplay(rating)}
				onClick={() => onClick(i + 1)}
				>

				<StarIcon
					tabIndex={isEditable ? 0 : -1}
					onKeyDown={(e: KeyboardEvent<SVGElement>)=> isEditable && handleSpace(i+1, e) }
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
	
	const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
		if (e.code != 'Space' || !setRating) {
			return;
		}
		setRating(i);
	};


	return (
		<div {...props}
			ref={ref}
			className={cn(styles.ratingWrapper, {
				[styles.error]: error
			})}
		>
			{ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
			{error && <span className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
});
