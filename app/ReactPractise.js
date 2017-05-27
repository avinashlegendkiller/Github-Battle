import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
//css
import './index.css';

class Letters extends Component {
    render() {
        const alphabet = this.props.list.filter(function(data){
            return data.alphabet === true;
        });

        const numbers = this.props.list.filter(function(data){
            return data.alphabet !== true;
        });

        return(
            <div>
                <h2>alphabet</h2>
                <ul> 
                    {
                        alphabet.map(function(data,index){
                            return(
                                <li key={index}><pre>{data.character}</pre></li>
                            )
                        })
                    }
                </ul>

                <h2>numbers</h2>
                <ul> 
                    {
                        numbers.map(function(data,index){
                            return(
                                <li key={index}><pre>{data.character}</pre></li>
                            )
                        })
                    }
                </ul>
                
            </div>
        )
    }
}

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All'
        }

         //functions are bound to 'this' of current class
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang) {
        this.setState({selectedLanguage: lang});
    }

    render() {
        let languages = ['All','JavaScript','Ruby','Java','CSS','Python']
        return(
            <div>
                <ul className="languages">
                    {
                        languages.map(function(lang,index) {
                            //this.updateLanguage.bind() --> It is going to return new function && binds params to function; 
                            //.bind() expects 'this' but in constructor, 'this' is already mentioned, so pass 'null';
                            return(
                                <li key={index} style={lang === this.state.selectedLanguage ? {color: Colors.red700} : null} onClick={this.updateLanguage.bind(null,lang)}>
                                    {lang}
                                </li>
                            )
                        },this)//this is second parameter --> bounds to 'this' class
                    }
                    {/*{
                        //ES6
                        languages.map((lang,index) => {

                            return(
                                <li key={index} style={lang === this.state.selectedLanguage ? {color: Colors.red700} : null} onClick={this.updateLanguage.bind(null,lang)}>
                                    {lang}
                                </li>
                            )
                        })
                    }*/}
                </ul>    
            </div>    
        )
    }
}

Letters.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape(
        {
            alphabet: PropTypes.bool.isRequired
        }
    )),
}

/*ReactDOM.render(
    <Letters list={
        [
            {character: 'a', alphabet: true},
            {character: 1, alphabet: false},
            {character: 'z', alphabet: true},
            {character: 'b', alphabet: true},
            {character: 3, alphabet: false},
            {character: 'x', alphabet: true}
        ]
    }/>,
    document.getElementById('root')
);*/