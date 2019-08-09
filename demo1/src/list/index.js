import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './index.less';
import img1 from './image/img1.jpg';

class Index extends Component {
	render() {
		return (
			<div className="list-wrap">
				webpack demo -- Index
				<img src={img1} />
				<ul className="list-content">
					<li className="item">1</li>
					<li className="item">1</li>
					<li className="item">1</li>
				</ul>
			</div>
		)
	}
}

ReactDom.render(<Index />, document.getElementById('root'));
