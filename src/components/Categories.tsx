import React, { FC } from 'react'

type CategoriesProps = {
	items: string[]
	activeIndex: number | null
	onSelect: (index: number | null) => void
}

const Categories: FC<CategoriesProps> = ({ items, activeIndex, onSelect }) => {
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
