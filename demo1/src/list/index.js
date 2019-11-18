import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { a } from './treeShaking';
import './index.less';
import img1 from './image/img1.jpg';

// 无法被执行的代码
if (false) {
	a();
}

class Index extends Component {
	render() {
		// 变量的结果不会被用到
		// funcA没有被调用时，变量会被tree shaking，但是a()的内容会被保留
		const funcA = a();

		let a = 0;

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
