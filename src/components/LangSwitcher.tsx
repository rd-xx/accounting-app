import { useRouter } from 'next/router';
import { t } from '@lingui/macro';
import Link from 'next/link';

const availableLanguageNames = {
	en: t`English`,
	fr: t`French`
};

export default function LangSwitcher() {
	const { locale, locales, route } = useRouter(),
		otherLocale = locales?.find((cur) => cur !== locale);

	return (
		<Link href={route} locale={otherLocale}>
			<a style={{ display: 'block', marginBottom: '20px' }}>
				{availableLanguageNames[otherLocale]}
			</a>
		</Link>
	);
}
