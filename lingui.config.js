module.exports = {
	locales: ['en', 'fr'],
	sourceLocale: 'en',
	catalogs: [
		{
			path: '<rootDir>/src/locales/{locale}/messages',
			include: ['<rootDir>/'],
			exclude: ['**/node_modules/**']
		}
	]
};
