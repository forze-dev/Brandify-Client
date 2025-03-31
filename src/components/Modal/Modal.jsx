'use client';
import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import './Modal.scss'; // Подключаем SCSS файл
import Image from 'next/image';

const ModalContext = createContext();

export function ModalProvider({ children }) {
	const [modalContent, setModalContent] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("fixed-body")
		} else {
			document.body.classList.remove("fixed-body")
		}

		return () => {
			document.body.classList.remove("fixed-body")
		};
	}, [isOpen]);

	const openModal = (content) => {
		setModalContent(content);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setTimeout(() => {
			setModalContent(null);
		}, 300);
	};

	return (
		<ModalContext.Provider value={{ openModal, closeModal }}>
			{children}
			{isOpen && (
				<div
					className="modal-overlay"
					onClick={closeModal}
				>
					<div
						className="modal-content"
						onClick={(e) => e.stopPropagation()}
						aria-labelledby="modal-title"
						aria-describedby="modal-description"
					>
						{modalContent}
						<button className="modal-close-btn" onClick={closeModal}>
							<Image src={"/icons/cross.svg"} width={20} height={20} alt='x' />
						</button>
					</div>
				</div>
			)}
		</ModalContext.Provider>
	);
}

export function useModal() {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
}