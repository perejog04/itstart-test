import React from 'react';

const SeminarCard = ({ seminar, onEdit, onDelete }) => {
	return (
		<div className='seminar-card'>
			<img src={seminar.photo} alt={seminar.title} className='seminar-photo' />
			<h3 className='seminar-card-name'>{seminar.title}</h3>
			<p>{seminar.description}</p>
			<p>
				<strong>Дата:</strong> {seminar.date}
			</p>
			<p>
				<strong>Время:</strong> {seminar.time}
			</p>
			<div className='seminar-card-btns'>
				<button className='edit-btn' onClick={() => onEdit(seminar)}>
					Редактировать
				</button>
				<button className='delete-btn' onClick={() => onDelete(seminar.id)}>
					Удалить
				</button>
			</div>
		</div>
	);
};

export default SeminarCard;
