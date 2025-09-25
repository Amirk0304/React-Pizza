import { RootState } from '../Store'

function totalPrice(state: RootState): number {
	return state.cart.totalPrice
}

export default totalPrice
