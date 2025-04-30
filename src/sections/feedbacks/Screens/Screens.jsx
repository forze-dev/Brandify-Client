"use client"
import { useState, useRef, useEffect } from "react";
import "./Screens.scss"
import { useTranslations } from "next-intl";

const Screens = ({ screenList }) => {
	const tRP = useTranslations("reviewsPage")
	const [activeScreen, setActiveScreen] = useState(null)
	const [animationStyle, setAnimationStyle] = useState({})
	const overlayRef = useRef(null)
	const activeImgRef = useRef(null)
	const imageRefs = useRef([])

	const handleImageClick = (index, e) => {
		if (activeScreen === index) {
			setActiveScreen(null);
		} else {
			const clickedImg = imageRefs.current[index];
			if (clickedImg) {
				const rect = clickedImg.getBoundingClientRect();
				const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

				// Calculate the position relative to viewport
				const startPosition = {
					top: rect.top,
					left: rect.left,
					width: rect.width,
					height: rect.height,
					centerX: rect.left + rect.width / 2,
					centerY: rect.top + rect.height / 2 + scrollTop,
				};

				setAnimationStyle({
					top: `${startPosition.top}px`,
					left: `${startPosition.left}px`,
					width: `${startPosition.width}px`,
					height: `${startPosition.height}px`,
					transform: 'none'
				});

				// Set active screen after setting initial position
				setTimeout(() => {
					setActiveScreen(index);
					// Apply transition after a small delay to ensure the initial position is set
					setTimeout(() => {
						setAnimationStyle({
							top: '50%',
							left: '50%',
							width: '100%',
							maxWidth: '80%',
							maxHeight: '90vh',
							transform: 'translate(-50%, -50%)'
						});
					}, 10);
				}, 0);
			}
		}
	};

	const closeOverlay = () => {
		if (activeScreen !== null) {
			const activeImg = imageRefs.current[activeScreen];
			if (activeImg) {
				const rect = activeImg.getBoundingClientRect();
				const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

				// Animate back to original position
				setAnimationStyle({
					top: `${rect.top}px`,
					left: `${rect.left}px`,
					width: `${rect.width}px`,
					height: `${rect.height}px`,
					transform: 'none'
				});

				// Complete the animation before hiding
				setTimeout(() => {
					setActiveScreen(null);
				}, 300);
			} else {
				setActiveScreen(null);
			}
		}
	};

	// Handle click outside and other interactions
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (activeScreen !== null && overlayRef.current && !activeImgRef.current?.contains(e.target)) {
				closeOverlay();
			}
		};

		const handleKeyDown = (e) => {
			if (e.key === 'Escape' && activeScreen !== null) {
				closeOverlay();
			}
		};

		let touchStartX = 0;
		let touchEndX = 0;

		const handleTouchStart = (e) => {
			touchStartX = e.changedTouches[0].screenX;
		};

		const handleTouchEnd = (e) => {
			touchEndX = e.changedTouches[0].screenX;
			if (Math.abs(touchEndX - touchStartX) > 50) {
				closeOverlay();
			}
		};

		if (activeScreen !== null) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleKeyDown);
			document.addEventListener('touchstart', handleTouchStart);
			document.addEventListener('touchend', handleTouchEnd);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchend', handleTouchEnd);
			document.body.style.overflow = '';
		};
	}, [activeScreen]);

	return (
		<section className="feeScreens">
			<div className="container">
				<h2>{tRP("screenTitle")}</h2>
				<div className="feeScreens__list">
					{screenList && screenList.map((img, index) => {
						return (
							<div key={index + "-rev-screen"} className="feeScreens-item">
								<div className={`feeScreens-item__wrapper ${activeScreen === index ? "active-placeholder" : ""}`}>
									<img
										src={img}
										alt="reviews"
										loading="lazy"
										width={300}
										height={300}
										onClick={(e) => handleImageClick(index, e)}
										ref={el => imageRefs.current[index] = el}
									/>
								</div>
							</div>
						)
					})}
				</div>
			</div>

			{activeScreen !== null && (
				<div className="feeScreens-overlay" ref={overlayRef}>
					<div
						className="feeScreens-overlay__content"
						ref={activeImgRef}
						onClick={() => closeOverlay()}
						style={{
							...animationStyle,
							position: 'absolute',
							transition: 'all 0.3s ease'
						}}
					>
						<img
							src={screenList[activeScreen]}
							alt="reviews enlarged"
							className="feeScreens-overlay__image"
							style={{ width: '100%', height: '100%', objectFit: 'contain' }}
						/>
					</div>
				</div>
			)}
		</section>
	)
}

export default Screens