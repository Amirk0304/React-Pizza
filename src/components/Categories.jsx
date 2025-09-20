import React from 'react'

function Categories({ items, activeIndex, onSelect }) {
	return (
		<div className='categories'>
			<ul>
				<li
					className={activeIndex === null ? 'active' : ''}
					onClick={() => onSelect(null)}
				>
					Все
				</li>
				{items.map((name, index) => (
					<li
						className={activeIndex === index ? 'active' : ''}
						onClick={() => onSelect(index)}
						key={`${name}_${index}`}
					>
						{name}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
