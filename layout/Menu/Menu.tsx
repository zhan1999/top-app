import React, { useContext, KeyboardEvent, useState } from 'react';
import styles from './Menu.module.css';
import cn from 'classnames';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion';
import { Key } from 'readline';

export const Menu = (): JSX.Element => {

	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const [announce, setAnnounce] = useState< 'closed' | 'opened'| undefined>();
	const router = useRouter();

	const openSecondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if (m._id.secondCategory == secondCategory) {
				setAnnounce(m.isOpened ? 'closed' : 'opened');
				m.isOpened = !m.isOpened;
			}
			return m;
		}));
	};

	const openSecondLevelKey = (key: KeyboardEvent,secondCategory: string) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const variants = {
		visible: {
			marginBottom: 20,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.05
			}
		},
		hidden: {
			marginBottom: 0
		}
	};

	// if menu item is long and takes up two lines, its height is more than 19+10=29px !!
	// use 'max-height' instead of 'height'

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 'auto',
			transition: {
				height: { duration: 0.4 },
				opacity: { duration: 0.25, delay: 0.15 }
			}
		},
		hidden: {
			opacity: 0,
			height: 0
		}
	};

	const buildFirstLevel = () => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(m => (
					<li key={m.route} aria-expanded={m.id == firstCategory}>
						<Link href={`/${m.route}`}>
							<div className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: m.id == firstCategory
							})}>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</Link>
						{m.id == firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<li
							key={m._id.secondCategory}
						>
							<button
								tabIndex={0}
								onKeyDown={(key:KeyboardEvent)=>openSecondLevelKey(key, m._id.secondCategory)}
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}
								aria-expanded={m.isOpened}
							>
								{m._id.secondCategory}
							</button>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={styles.secondLevelBlock}
							>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(p => (
				<motion.li key={p._id} variants={variantsChildren}>
				<Link legacyBehavior href={`/${route}/${p.alias}`}>
				<a 
					tabIndex={isOpened ? 0 : -1}
					className={cn(styles.thirdLevel, {
					[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
					})}
					aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}
				>
					{p.category}
				</a>
				</Link>
				</motion.li>
			))
		);
	};

	return (
		<nav className={styles.menu} role='navigation'>
			{announce && <span role='log' className='visuallyHidden'>{announce == 'opened' ? 'развернуто' : 'свернуто' }</span> }
				{buildFirstLevel()}
		</nav>
	);
};
