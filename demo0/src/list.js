import React, { Component, useState, useCallback, useEffect, useMemo } from 'react';
import ReactDom from 'react-dom';
import './list.less';
import img1 from './image/img1.jpg';

function Item() {
	const [inputVal, setInputVal] = useState('');
	const handleClick = useCallback(function() {
		console.log('click: ', inputVal);
	}, [inputVal]);
	useEffect(function() {
		console.log('effect side');
	});
	const computedVal = useMemo(() => 
		inputVal,
        [inputVal]
    );
	return (
		<div>
			<input value={inputVal} onChange={e => {
				setInputVal(e.target.value);
				console.log(inputVal)
			}}
			></input>
			<button onClick={handleClick}>{computedVal}</button>
		</div>
	)
}

class List extends Component {
	render() {
		return (
			<div className="list-wrap">
				webpack demo -- List 
				<img src={img1} />
				<ul className="list-content">
					<li className="item">1</li>
					<li className="item">1</li>
					<li className="item">1</li>
				</ul>
				<Item></Item>
			</div>
		)
	}
}

ReactDom.render(<List />, document.getElementById('root'));
