export function formatAmount(nb: number): string {
	return new Intl.NumberFormat('fr-FR', {
		style: 'currency',
		currency: 'EUR'
	}).format(nb);
}

export function formatDate(date: Date | number): string {
	return new Intl.DateTimeFormat('fr-FR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZone: 'Europe/Paris',
		timeZoneName: 'short'
	}).format(date instanceof Date ? date : new Date(date));
}
