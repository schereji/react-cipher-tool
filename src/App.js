import React, { Component } from 'react';
import KeywordPanel from './components/KeywordPanel';
import SourceTextPanel from './components/SourceTextPanel';

import './App.css';
import {LETTER_MAPPING} from "./MAPPINGS";

class App extends Component {
    
    state = {
        keywordLetters: [],
	    isValidInput: false,
        currentOffset: 0,
        currentIndex: 0
    };
    
    updateLetterMappings = (event) => {
	    const textInput = event.target.value.toUpperCase();
	    const isValidInput = textInput.length >= 3 &&
		    textInput.length <= 8 &&
		    textInput.indexOf(' ') < 0 &&
		    textInput.match(/^[a-zA-Z]+$/);
	    
	    this.setState({
            keywordLetters: [...textInput],
            isValidInput: isValidInput
	    });
	    
	    if(!isValidInput) {
	    	this.updateIndex(true);
	    }
		 else if(this.state.currentIndex === 0 && isValidInput) {
			const nextLetter = this.state.keywordLetters[this.state.currentIndex];
			this.setState({
				   currentOffset: LETTER_MAPPING[nextLetter],
			       currentIndex: this.state.currentIndex + 1
			   });
		}
    };
	
	
	updateIndex = (shouldReset) => {
		if(this.state.isValidInput) {
			if(shouldReset) {
				this.setState({currentIndex: 1});
				const nextLetter = this.state.keywordLetters[0];
				this.setState({currentOffset: LETTER_MAPPING[nextLetter]});
				return;
			}

			this.setState({currentIndex: (this.state.currentIndex + 1) % this.state.keywordLetters.length});
			const nextLetter = this.state.keywordLetters[this.state.currentIndex];
			this.setState({currentOffset: LETTER_MAPPING[nextLetter]});
		}
	};
	
    render() {
        return (
            <main role="main" className="container">
	            <h1>Cipher Tool</h1>
	            <input className="keyword-input form-control" type='text' required="required" onChange={this.updateLetterMappings} placeholder='Enter Keyword Configuration' aria-required="true"/>
	            <KeywordPanel currentOffset={this.state.currentOffset} keywordLetters={this.state.keywordLetters} isValidInput={this.state.isValidInput}/>
	            <SourceTextPanel updateIndex={this.updateIndex} currentOffset={this.state.currentOffset} isValidInput={this.state.isValidInput}/>
            </main>
        );
    }
}

export default App;
