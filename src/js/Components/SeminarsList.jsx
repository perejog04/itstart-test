import React, { useEffect, useState } from 'react';
import SeminarCard from './SeminarCard';
import EditSeminarModal from './EditSeminarModal';

const SeminarsList = () => {
	const [seminars, setSeminars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentSeminar, setCurrentSeminar] = useState(null);

	// Обращаемся к json-server,
	// чтобы получить данные о занятиях
	useEffect(() => {
		fetch('http://localhost:5000/seminars')
			.then(res => res.json())
			.then(data => {
				setSeminars(data);
				setLoading(false);
			})
			.catch(err => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	// Обращаемся к json-server,
	// чтобы удалить выбранное занятие
	const deleteSeminar = id => {
		if (window.confirm('Вы уверены, что хотите удалить этот семинар?')) {
			fetch(`http://localhost:5000/seminars/${id}`, { method: 'DELETE' })
				.then(() => setSeminars(prev => prev.filter(s => s.id !== id)))
				.catch(err => setError(err.message));
		}
	};

	const openEditModal = seminar => {
		setCurrentSeminar(seminar);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setCurrentSeminar(null);
	};

	// Обращаемся к json-server,
	// чтобы отредактировать выбранное занятие
	const updateSeminar = updatedSeminar => {
		fetch(`http://localhost:5000/seminars/${updatedSeminar.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedSeminar),
		})
			.then(() =>
				setSeminars(prev =>
					prev.map(s => (s.id === updatedSeminar.id ? updatedSeminar : s))
				)
			)
			.catch(err => setError(err.message))
			.finally(closeModal);
	};

	// Обработка загрузки и ошибки получения данных с сервера
	if (loading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка: {error}</div>;

	return (
		<div className='seminars-list'>
			<div className='seminars'>
				{/* Перебираем массив занятий 
                    и рендерим через отедельный компонент*/}
				{seminars.map(seminar => (
					<SeminarCard
						key={seminar.id}
						seminar={seminar}
						onEdit={openEditModal}
						onDelete={deleteSeminar}
					/>
				))}
			</div>
			{/* При вызове редактирования,
                если есть данные для модалки (currentSeminar != null), 
                тогда рендерим модальное окно */}
			{isModalOpen && currentSeminar && (
				<EditSeminarModal
					seminar={currentSeminar}
					onSave={updateSeminar}
					onClose={closeModal}
				/>
			)}
		</div>
	);
};

export default SeminarsList;
