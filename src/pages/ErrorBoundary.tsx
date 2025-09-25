import React from 'react'

interface ErrorBoundaryProps {
	children: React.ReactNode
	fallback?: React.ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(
		error: Error
	): Partial<ErrorBoundaryState> | null {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.error('ErrorBoundary caught an error', error, errorInfo)
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			return this.props.fallback ?? <h1>Something went wrong.</h1>
		}
		return this.props.children
	}
}

export default ErrorBoundary
