export interface Product {
	id: number
	name: string
	price: number
	rating: number
	category: number
	imageUrl: string
	types: number[]
	sizes: number[]
}

export interface Category {
	id: number
	name: string
}
