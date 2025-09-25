import React, { FC, useEffect, useMemo } from 'react'
import Categories from '../components/Categories.js'
import Sort from '../components/Sort.js'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock.js'
import CartSkeleton from '../components/PizzaBlock/CartSkeleton.js'
import {
	fetchProducts,
	setCategoryId,
	setSortIndex,
} from '../redux/actions/productsSlice.js'
import { useAppDispatch, useAppSelector } from '../redux/hooks/Hooks.ts'
import { Product } from '../redux/actions/Types.ts'

const Home: FC = () => {
	const dispatch = useAppDispatch()
	const { items, status, categoryId, sortIndex } = useAppSelector(
		state => state.products
	)
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchProducts())
		}
	}, [dispatch, status])

	type CategoriesType = string[]
	type SortItemsType = string[]

	const categories: CategoriesType = [
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]
	const sortItems: SortItemsType = ['Популярности', 'Цене', 'Алфавиту']

	const filteredItems = useMemo<Product[]>(() => {
		const byCategory: Product[] =
			categoryId === null
				? items
				: items.filter((p: Product) => p.category === categoryId)

		const sorted = [...byCategory]

		if (sortIndex === 0) {
			sorted.sort((a, b) => b.rating - a.rating)
		} else if (sortIndex === 1) {
			sorted.sort((a, b) => a.price - b.price)
		} else if (sortIndex === 2) {
			sorted.sort((a, b) => a.name.localeCompare(b.name))
		}

		return sorted
	}, [items, categoryId, sortIndex])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					items={categories}
					activeIndex={categoryId}
					onSelect={idx => dispatch(setCategoryId(idx))}
				/>
				<Sort
					items={sortItems}
					activeIndex={sortIndex}
					onSelect={idx => dispatch(setSortIndex(idx))}
				/>
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{status === 'loading' || status === 'idle'
					? [...new Array(6)].map((_, index) => <CartSkeleton key={index} />)
					: filteredItems.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
				<svg>
					<circle strokeWidth='2' />
				</svg>
			</div>
		</div>
	)
}

export default Home
