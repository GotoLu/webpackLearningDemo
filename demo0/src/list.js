import React, { Component } from 'react';
import ReactDom from 'react-dom';

class List extends Component {
	render() {
		return (
			<div>webpack demo -- List</div>
		)
	}
}

ReactDom.render(<List />, document.getElementById('root'));
