import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review, ReviewForm } from '..';
import { motion } from 'framer-motion';

// In Next13, Image component has size and fill properties instead of layout
// sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
// https://nextjs.org/docs/api-reference/next/image

//sending named function to forwardRef instead of an anonymous one to avoid setting displayName for the component

export const Product = motion(forwardRef(function ProductFunction({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element  {
	
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);

	const scrollToReview = () => {
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		reviewRef.current?.focus();
	};

	const variants = {
		visible: {
			opacity: 1,
			height: 'auto',
			transition: {
				duration: 1,
				ease: 'easeOut'
				}
			},
		hidden: {
			opacity: 0,
			height: 0,
			overflow: 'hidden'
		}
	};
	
	const src = process.env.NEXT_PUBLIC_DOMAIN + product.image;
	//const src = product.image;

	return (
		<div className={className} {...props} ref={ref}>
			<Card className={styles.product} cardColor='white' {...props}>
				<div className={styles.logo}>
					<Image
						unoptimized
						src={src}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					{priceRu(product.price)}
					{product.oldPrice && <Tag className={styles.oldPrice} color='green'>{priceRu(product.price - product.oldPrice)}</Tag>}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit)}/
					<span className={styles.month}>мес</span>
				</div>
				<div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
				<div className={styles.tags}>{product.categories.map(c => <Tag className={styles.category} color='ghost' key={c}>{c}</Tag>)}</div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>кредит</div>
				<div className={styles.rateTitle}><a href="#ref" onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
				<Divider className={styles.hr} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div className={styles.characteristics} key={c.name}>
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && <div className={styles.advantages}>
						<div className={styles.advTitle}>Преимущества</div>
						<div>{product.advantages}</div>
					</div>}
					{product.disadvantages && <div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						<div>{product.disadvantages}</div>
					</div>}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						appearance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
						className={styles.reviewButton}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>Читать отзывы</Button>
				</div>
			</Card>
			
			<motion.div variants={variants} initial='hidden' animate={isReviewOpened ? 'visible' : 'hidden'}>
			<Card
				cardColor='blue'
				className={cn(styles.reviews)}
				ref={reviewRef}
				tabIndex={isReviewOpened ? 0 : -1}
			>
				{product.reviews.map(r =>
					<div key={r._id}>
						<Review review={r} />
						<Divider />
					</div>
				)}
				<ReviewForm productId={product._id} isOpened = {isReviewOpened} />
			</Card>
			</motion.div>
		</div>
	);
}));