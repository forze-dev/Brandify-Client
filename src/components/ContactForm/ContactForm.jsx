"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
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
			<div className="ContactForm__title">
				<h2>Зв’яжіться з нами</h2>
				<p>Будь ласка, заповніть форму нижче, щоб зв’язатися з нами</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="form">
				<div className="form-top__group">
					<div className="form-group">
						<input
							id="lastName"
							type="text"
							placeholder="Прізвище"
							{...register('lastName', { required: 'Прізвище є обов\'язковим полем' })}
							className={errors.lastName ? 'input-error' : ''}
						/>
						{errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
					</div>

					<div className="form-group">
						<input
							id="firstName"
							type="text"
							placeholder="Ім’я"
							{...register('firstName', { required: 'Ім\'я є обов\'язковим полем' })}
							className={errors.firstName ? 'input-error' : ''}
						/>
						{errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
					</div>

					<div className="form-group">
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
							placeholder='Номер телефону'
							className={errors.phone ? 'input-error' : ''}
						/>
						{errors.phone && <span className="error-message">{errors.phone.message}</span>}
					</div>

					<div className="form-group">
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
							placeholder='Електронна пошта'
							className={errors.email ? 'input-error' : ''}
						/>
						{errors.email && <span className="error-message">{errors.email.message}</span>}
					</div>
				</div>

				<div className="form-group form-comment">
					<textarea
						id="comment"
						{...register('comment')}
						rows="1"

						placeholder='Коментар'
					></textarea>
				</div>

				<div className=" form-row form-file">
					<input
						id="file"
						type="file"
						onChange={onFileChange}
						className="file-input"
					/>
					{
						selectedFile ?
							<div className="file-info">
								<span>{selectedFile.name}</span>
							</div> :
							<label htmlFor="file">
								<Image src={"/icons/screpka.svg"} width={18} height={18} alt='@' />
								<span>
									Прикріпити файл (до 5МБ)
								</span>
							</label>
					}
				</div>

				<div className=" form-row form-agree">
					<input type="checkbox" name="agree" id="agree" className="agree-input" />
					<label htmlFor="agree">Я даю згоду на користування власними данними</label>
				</div>

				<button
					type="submit"
					className="btn"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Надсилання...' :
						<><span>Надіслати</span><Image src={"/icons/white-plane.svg"} width={18} height={15} alt='->' /></>
					}
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