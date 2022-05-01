import Header from '../components/Header';
import Footer from '../components/Footer';
import Table from '../components/Table';

export default function Index() {
	// check if data exists in localStorage

	return (
		<div>
			<Header />
			<Table storedData={[]} />
			<Footer />
		</div>
	);
}
