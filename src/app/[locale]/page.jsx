import { routing } from '@/i18n/routing';
import Hero from "@/sections/home/Hero/Hero";
import HowWeWork from '@/sections/home/HowWeWork/HowWeWork';
import OurWorks from '@/sections/home/OurWorks/OurWorks';
import WorkProccess from '@/sections/common/WorkProccess/WorkProccess';
import QuestionsAnswers from '@/sections/common/QuestionsAnswers/QuestionsAnswers';

// Генерація статичних параметрів для локалей
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

// Метадані для SEO
export async function generateMetadata({ params }) {
	const paramsData = await params;
	const locale = paramsData.locale;

	return {
		title: locale === 'ua' ? 'Головна сторінка' : 'Home Page',
		description: locale === 'ua'
			? 'Ласкаво просимо на наш багатомовний сайт'
			: 'Welcome to our multilingual website'
	};
}

export default function HomePage() {
	return (
		<main>
			<Hero />
			<HowWeWork />
			<OurWorks />
			<WorkProccess />
			<QuestionsAnswers />
		</main>
	);
}