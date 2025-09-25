import React, { FC } from 'react'
import ContentLoader from 'react-content-loader'
type CartSkeletonProps = {
	id?: number
}

const CartSkeleton: FC<CartSkeletonProps> = ({ id, ...rest }) => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={454}
		viewBox='0 0 280 454'
		backgroundColor='#e8e8e8'
		foregroundColor='#969696'
		{...rest}
	>
		<circle cx='135' cy='125' r='120' />
		<rect x='0' y='310' rx='6' ry='6' width='280' height='85' />
		<rect x='0' y='405' rx='6' ry='6' width='120' height='30' />
		<rect x='155' y='405' rx='6' ry='6' width='125' height='30' />
		<rect x='0' y='270' rx='6' ry='6' width='280' height='24' />
	</ContentLoader>
)

export default CartSkeleton
