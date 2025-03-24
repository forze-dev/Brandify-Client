'use client';
import { Modal as MuiModal, Box } from '@mui/material';
import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
	const [modalContent, setModalContent] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const openModal = (content) => {
		setModalContent(content);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		// Після закриття анімації очищаємо вміст
		setTimeout(() => {
			setModalContent(null);
		}, 300);
	};

	return (
		<ModalContext.Provider value={{ openModal, closeModal }}>
			{children}
			<MuiModal
				open={isOpen}
				onClose={closeModal}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<Box sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
					maxHeight: '80vh',
					overflowY: 'auto',
					maxWidth: '90vw',
					width: 'auto',
				}}>
					{modalContent}
				</Box>
			</MuiModal>
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