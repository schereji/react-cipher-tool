import React, { Component } from 'react';
import {POSITION_MAPPING} from "../MAPPINGS";

class SourceTextPanel extends Component {
	getCipherLetter = (num) => {
		return POSITION_MAPPING[(Number(num) + this.props.currentOffset) % 26];
	};
	
	modifySourceAndCipherText = (source, cipher) => {
		if(source.length && cipher.length) {
			document.querySelector('.source-text').value += source;
			document.querySelector('.cipher-text').value += cipher;
			document.querySelector('.clear-text').disabled = false;
		} else {
			document.querySelector('.source-text').value = '';
			document.querySelector('.cipher-text').value = '';
			document.querySelector('.clear-text').disabled = true;
		}
	};
	
	handleClick = (event) => {
		const button = event.target;
		if(!button.classList.contains('keyboard')) return;
		const position = button.value;
		const cipherLetter = this.getCipherLetter(position);
		this.modifySourceAndCipherText(POSITION_MAPPING[position], cipherLetter);
		this.props.updateIndex(false);
	};
	
	handleClearText = () => {
		this.props.updateIndex(true);
		this.modifySourceAndCipherText('','');
	};
	

	
	render() {
		if(this.props.isValidInput) {
			return (
				<React.Fragment>
					<h2>Encoding Dashboard</h2>
					<section className="row encoding-dashboard">
						{Object.keys(POSITION_MAPPING).map((item) => (
							<section className="encoding-mappings" key={item}>
								<div className="col-12 source">
									<button className="keyboard" type="button" value={item} onClick={this.handleClick}>{POSITION_MAPPING[item]}</button>
								</div>
								<div className="col-12 cipher">
									<button type="button" value={item} readOnly>{this.getCipherLetter(item)}</button>
								</div>
							</section>
						))}
						<section className="texts col-12">
							<h2>Source Text</h2>
							<input type='text' name='source' className='source-text form-control' aria-label="source" readOnly/>
							<h2>Cipher Text</h2>
							<input type='text' name='cipher' className='cipher-text form-control' aria-label="cipher" readOnly/>
							<button onClick={this.handleClearText} className="clear-text btn btn-primary">Clear</button>
						</section>
					</section>
				</React.Fragment>
			)
		}
		return false;
	};
}

export default SourceTextPanel;
