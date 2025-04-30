"use client"
import 'swiper/css';

import { useTranslations, useLocale } from "next-intl";
import { useMemo, useState, useEffect } from 'react';
import Loader from '@/components/Loader/Loader';
import Videos from '../Videos/Videos';
import Screens from '../Screens/Screens';

const ReviewsWrapper = () => {
	const tRP = useTranslations("reviewsPage");
	const currentLocale = useLocale();
	const reviewsLink = useMemo(() => tRP.raw("contentLink"), [tRP]);

	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [videoList, setVideoList] = useState(null);
	const [screenList, setScreenList] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		setHasError(false);

		fetch(reviewsLink)
			.then((res) => res.json())
			.then((res) => {
				setVideoList(res.videoList || null);
				setScreenList(res.screenList || null);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Помилка завантаження:", error);
				setHasError(true);
				setIsLoading(false);
			});
	}, [reviewsLink, currentLocale]);

	if (isLoading) {
		return <Loader position="center" />;
	}

	const isEmpty = !videoList && !screenList;

	return (
		<div className="reviews-wrapper">
			{hasError || isEmpty ? (
				<div className="error-message">Нічого не знайдено або сталася помилка.</div>
			) : (
				<>
					{videoList && <Videos videoList={videoList} tRP={tRP} />}
					{screenList && <Screens screenList={screenList} tRP={tRP} />}
				</>
			)}
		</div>
	);
};

export default ReviewsWrapper;
