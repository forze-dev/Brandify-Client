"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './ContactForm.scss';

const ContactForm = () => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);

	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

	const onFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > MAX_FILE_SIZE) {
				alert('Файл занадто великий. Максимальний розмір файлу: 5MB');
				e.target.value = '';
				setSelectedFile(null);
			} else {
				setSelectedFile(file);
			}
		}
	};

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			const formData = new FormData();
			formData.append('lastName', data.lastName);
			formData.append('firstName', data.firstName);
			formData.append('phone', data.phone);
			formData.append('email', data.email);
			formData.append('comment', data.comment);

			if (selectedFile) {
				formData.append('file', selectedFile);
			}

			const response = await fetch('/api/send-to-telegram', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`Помилка сервера: ${response.status}`);
			}

			const result = await response.json();
			setSubmitStatus('success');
			reset();
			setSelectedFile(null);
		} catch (error) {
			setSubmitStatus('error');
			console.error('Error submitting form:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="ContactForm">
			<form onSubmit={handleSubmit(onSubmit)} className="form">
				<div className="form-group">
					<label htmlFor="lastName">Прізвище</label>
					<input
						id="lastName"
						type="text"
						{...register('lastName', { required: 'Прізвище є обов\'язковим полем' })}
						className={errors.lastName ? 'input-error' : ''}
					/>
					{errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
				</div>

				<div className="form-group">
					<label htmlFor="firstName">Ім'я</label>
					<input
						id="firstName"
						type="text"
						{...register('firstName', { required: 'Ім\'я є обов\'язковим полем' })}
						className={errors.firstName ? 'input-error' : ''}
					/>
					{errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
				</div>

				<div className="form-group">
					<label htmlFor="phone">Номер телефону</label>
					<input
						id="phone"
						type="tel"
						{...register('phone', {
							required: 'Номер телефону є обов\'язковим полем',
							pattern: {
								value: /^\+?[0-9\s\-\(\)]+$/,
								message: 'Будь ласка, введіть правильний номер телефону'
							}
						})}
						className={errors.phone ? 'input-error' : ''}
					/>
					{errors.phone && <span className="error-message">{errors.phone.message}</span>}
				</div>

				<div className="form-group">
					<label htmlFor="email">Електронна пошта</label>
					<input
						id="email"
						type="email"
						{...register('email', {
							required: 'Email є обов\'язковим полем',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Будь ласка, введіть правильну електронну адресу'
							}
						})}
						className={errors.email ? 'input-error' : ''}
					/>
					{errors.email && <span className="error-message">{errors.email.message}</span>}
				</div>

				<div className="form-group">
					<label htmlFor="comment">Коментар</label>
					<textarea
						id="comment"
						{...register('comment')}
						rows="4"
					></textarea>
				</div>

				<div className="form-group">
					<label htmlFor="file">Прикріпити файл (до 5МБ)</label>
					<input
						id="file"
						type="file"
						onChange={onFileChange}
						className="file-input"
					/>
					{selectedFile && (
						<div className="file-info">
							<span>{selectedFile.name}</span>
							<span className="file-size">
								{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
							</span>
						</div>
					)}
				</div>

				<button
					type="submit"
					className="submit-button"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Надсилання...' : 'Надіслати'}
				</button>

				{submitStatus === 'success' && (
					<div className="success-message">
						Дякуємо! Ваша форма успішно надіслана.
					</div>
				)}

				{submitStatus === 'error' && (
					<div className="error-message">
						Під час надсилання форми сталася помилка. Будь ласка, спробуйте ще раз.
					</div>
				)}
			</form>
		</div>
	);
};

export default ContactForm;