import '../style/style.scss';
import SeminarsList from './Components/SeminarsList';

function App() {
	return (
		<>
			<div className='page'>
				<div className='main'>
					<div className='container'>
						<h1 className='name'>Расписание</h1>
						<SeminarsList />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
