import React from 'react';
import {LETTER_MAPPING, POSITION_MAPPING} from '../MAPPINGS';

const ErrorMessage = () => (
	<section className="error">
		<p>Input must be between 3-8 non-numeric characters and should contain no spaces.</p>
	</section>
);

const KeywordPanel = ({isValidInput, keywordLetters, currentOffset}) => {
	if(!isValidInput && keywordLetters.length > 0) return <ErrorMessage/>
	return (
		<React.Fragment>
			<section className='letter-mappings row'>
				{keywordLetters.map( (item,index) => (
					<section className={'mapping-item ' + (POSITION_MAPPING[currentOffset] === item ? 'active-offset' : '')} key={index}>
						<div className="col-12 item">{item}</div>
						<div className="col-12 number">{LETTER_MAPPING[item]}</div>
					</section>
				))}
			</section>
		</React.Fragment>
	)
};

export default KeywordPanel;
