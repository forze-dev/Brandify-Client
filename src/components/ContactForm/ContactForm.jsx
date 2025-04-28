"use client"

import { useState, useId } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import './ContactForm.scss';

const ContactForm = ({ alternate = false }) => {
	const t = useTranslations('form');
	const { register, handleSubmit, formState: { errors }, reset } = useForm();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const formId = useId(); // унікальний id для кожної форми

	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

	const onFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > MAX_FILE_SIZE) {
				alert(t('errors.fileSize'));
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
				throw new Error(`${t('errors.serverError')} ${response.status}`);
			}

			await response.json();
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
		<div className={`ContactForm ${alternate ? "alternate" : ""}`}>
			<div className="ContactForm__title">
				<h2>{t('title')}</h2>
				<p>{t('subtitle')}</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="form">
				<div className="form-top__group">
					<div className="form-group">
						<input
							id={`${formId}-lastName`}
							type="text"
							placeholder={t('place.p1')}
							{...register('lastName', { required: t('errors.lastName') })}
							className={errors.lastName ? 'input-error' : ''}
						/>
						{errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
					</div>

					<div className="form-group">
						<input
							id={`${formId}-firstName`}
							type="text"
							placeholder={t('place.p2')}
							{...register('firstName', { required: t('errors.firstName') })}
							className={errors.firstName ? 'input-error' : ''}
						/>
						{errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
					</div>

					<div className="form-group">
						<input
							id={`${formId}-phone`}
							type="tel"
							{...register('phone', {
								required: t('errors.phone'),
								pattern: {
									value: /^\+?[0-9\s\-\(\)]+$/,
									message: t('errors.phoneFormat')
								}
							})}
							placeholder={t('place.p3')}
							className={errors.phone ? 'input-error' : ''}
						/>
						{errors.phone && <span className="error-message">{errors.phone.message}</span>}
					</div>

					<div className="form-group">
						<input
							id={`${formId}-email`}
							type="email"
							{...register('email', {
								required: t('errors.email'),
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: t('errors.emailFormat')
								}
							})}
							placeholder={t('place.p4')}
							className={errors.email ? 'input-error' : ''}
						/>
						{errors.email && <span className="error-message">{errors.email.message}</span>}
					</div>
				</div>

				<div className="form-group form-comment">
					<textarea
						id={`${formId}-comment`}
						{...register('comment')}
						rows="1"
						placeholder={t('place.p5')}
					></textarea>
				</div>

				<div className="form-row form-file">
					<input
						id={`${formId}-file`}
						type="file"
						onChange={onFileChange}
						className="file-input"
					/>
					{
						selectedFile ? (
							<div className="file-info">
								<span>{selectedFile.name}</span>
							</div>
						) : (
							<label htmlFor={`${formId}-file`}>
								<Image src={"/icons/screpka.svg"} width={18} height={18} alt="@" />
								<span>{t('file')}</span>
							</label>
						)
					}
				</div>

				<div className="form-row form-agree">
					<input
						type="checkbox"
						name="agree"
						id={`${formId}-agree`}
						className="agree-input"
					/>
					<label htmlFor={`${formId}-agree`}>{t('confirm')}</label>
				</div>

				<button
					type="submit"
					className="btn"
					disabled={isSubmitting}
				>
					{isSubmitting ? t('button.sending') :
						<>
							<span>{t('button.submit')}</span>
							<Image src={"/icons/white-plane.svg"} width={18} height={15} alt="->" />
						</>
					}
				</button>

				{submitStatus === 'success' && (
					<div className="success-message">
						{t('status.success')}
					</div>
				)}

				{submitStatus === 'error' && (
					<div className="error-message">
						{t('status.error')}
					</div>
				)}
			</form>
		</div>
	);
};

export default ContactForm;
