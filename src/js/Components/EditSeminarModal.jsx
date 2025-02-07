import React, { useState } from 'react';

const EditSeminarModal = ({ seminar, onSave, onClose }) => {
	const [updatedSeminar, setUpdatedSeminar] = useState(seminar);

	// Обработчик ввода с клавиатуры
	const handleChange = e => {
		const { name, value } = e.target;
		setUpdatedSeminar(prev => ({ ...prev, [name]: value }));
	};

	return (
		<div className='modal'>
			<div className='modal-content'>
				<h3>Редактировать семинар</h3>
				<label>
					Название:
					<input
						type='text'
						name='title'
						value={updatedSeminar.title}
						onChange={handleChange}
					/>
				</label>
				<label>
					Описание:
					<textarea
						name='description'
						value={updatedSeminar.description}
						onChange={handleChange}
					/>
				</label>
				<label>
					Дата:
					<input
						type='date'
						name='date'
						value={updatedSeminar.date}
						onChange={handleChange}
					/>
				</label>
				<label>
					Время:
					<input
						type='time'
						name='time'
						value={updatedSeminar.time}
						onChange={handleChange}
					/>
				</label>
				<label>
					Ссылка на фото:
					<input
						type='text'
						name='photo'
						value={updatedSeminar.photo}
						onChange={handleChange}
					/>
				</label>
				<div className='modal-btns'>
					<button className='save-btn' onClick={() => onSave(updatedSeminar)}>
						Сохранить
					</button>
					<button className='close-btn' onClick={onClose}>
						Закрыть
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditSeminarModal;
