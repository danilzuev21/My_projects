import React from 'react';

export default class Auth extends React.Component {
	render() {
		return (
			<div>
				<form onSubmit={this.props.login}>
					<label>Enter your name:</label>
					<br></br>
					<input type='name' name='name' placeholder='Name' />
					<button >Login</button>
				</form>
				{this.props.message}
			</div>

		)
	}
}
