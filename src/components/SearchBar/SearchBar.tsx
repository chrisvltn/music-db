import React, { Component, ChangeEvent, FormEvent } from 'react'
import withStyles from 'react-jss'

class SearchBar extends Component<Props, State> {
	state = {
		value: '',
	}

	onFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		this.props.onSubmit(this.state.value)
	}

	onInputChange(event: ChangeEvent<HTMLInputElement>) {
		this.setState({ value: event.target.value })
	}

	render() {
		const { classes } = this.props

		return (
			<div>
				<form onSubmit={this.onFormSubmit.bind(this)} className={classes.form}>
					<label className={classes.label}>
						<i className={"fa fa-search " + classes.icon} />
						<input className={classes.input} type="text" placeholder="Search" value={this.state.value} onChange={this.onInputChange.bind(this)} />
					</label>
					{/* The "enter" key will be recognized as "submit" if there is a submit button inside the form */}
					<button hidden type="submit"></button>
				</form>
			</div>
		)
	}
}

const styles = {
	form: {
		display: 'block',
	},
	input: {
		display: 'block',
		lineHeight: '40px',
		height: 40,
		width: '100%',
		fontSize: 16,
		borderRadius: 10,
		backgroundColor: 'rgba(255, 255, 255, .3)',
		border: 0,
		color: '#ecf0f1',
		outline: 'none',
		padding: {
			top: 0,
			right: 10,
			bottom: 0,
			left: 35,
		},
		'&::placeholder': {
			color: '#ecf0f1',
		},
	},
	label: {
		display: 'block',
		position: 'relative',
	},
	icon: {
		position: 'absolute',
		fontSize: 14,
		display: 'block',
		top: 13,
		left: 10,
		color: '#ecf0f1',
	},
}

type Props = StyledComponentProps<typeof styles> & {
	onSubmit: (value: string) => void
}

type State = {
	value: string
}

export default withStyles(styles)(SearchBar)
