import React, {Component} from 'react';
import PropTypes from 'prop-types';
//components
import Popular from './Popular';
//ui
import * as Colors from 'material-ui/styles/colors';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

//if class has only render method, then make it a STATELESS FUNCTIONAL component (has no state ie., no 'this' & is a function)
function SelectTab (props) {
    //No 'this' (ie, state) anywhere
    let tabs = ['Home','Battle','Popular'];
    console.log(props.selectedTabIndex);
    
    return(
        <div>
        <Tabs value={props.selectedOption} onChange={props.onSelect.bind(null)} className="appbar-tabs">
                    {
                        tabs.map(function(tab,index) {
                            return(
                                <Tab key={index} 
                                label={tab} 
                                value={tab} 
                                style={tab === props.selectedOption ? {color: Colors.darkBlack} : {color: Colors.grey600}}>
                                 
                                </Tab>
                            )
                        })//NO 'this' as second param
                    } 
            </Tabs>
            <SwipeableViews index={props.selectedTabIndex} onChangeIndex={props.onSelectTabIndex.bind(null)}>
                <div style={{height: '100px',backgroundColor: Colors.grey200}}>Home</div>
                <div style={{height: '100px',backgroundColor: Colors.grey100}}>Battle</div>
                <Popular />
            </SwipeableViews> 
            </div>   
    )
}

/*class SelectLanguageTab extends Component {
    render() {
        let languages = ['All','JavaScript','Ruby','Java','CSS','Python'];
        //.bind(<context>) here passing 'null' as context is already defined in parent component
         
        // 0. 'this' -> SelectedLanguageTab class
        // 1. onChange passes 'value' of childern Tab to 'updateLanguage' function
        // 2. we are not using this.updateLanguage.bind(null, param) here, as params are not passed in onChange of Tabs (Material-ui)
        // 3. pass language as value in children Tab
        
        //languages.map returns a new function, pass 'this' as second parameter --> bounds to 'this' class

        return(
             <Tabs value={this.props.selectedLanguage} onChange={this.props.onSelect.bind(null)} className="appbar-tabs">
                    {
                        languages.map(function(lang,index) {
                            return(
                                <Tab key={index} 
                                label={lang} 
                                value={lang} 
                                style={lang === this.props.selectedLanguage ? {color: Colors.darkBlack} : {color: Colors.grey600}}>
                                 
                                </Tab>
                            )
                        },this)
                    } 
            </Tabs>  
        )
    }
}*/

// SelectedLanguage.propTypes = {
//     selectedLanguage: PropTypes.string.isRequired,
//     onSelect: PropTypes.func.isRequired
// }

class TabsNavigation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'Popular',
            selectedTabIndex: 2
        }

        //functions are bound to 'this' of current class
        this.updateOption = this.updateOption.bind(this);
        this.updateTabIndex = this.updateTabIndex.bind(this);
    }

    updateOption(option) {
        let index = 0;

        switch(option) {
            case 'Home': index = 0; break;
            case 'Battle': index = 1; break;
            case 'Popular': index = 2; break;
        }
        this.setState({selectedOption: option, selectedTabIndex: index});
    }

    updateTabIndex(index) {
        let selectedOption = '';

        switch(index) {
            case 0: selectedOption = 'Home'; break;
            case 1: selectedOption = 'Battle'; break;
            case 2: selectedOption = 'Popular'; break;
        }
        this.setState({selectedTabIndex: index, selectedOption: selectedOption});
    }

    handleTabChange(value) {
        this.setState({
            selectedOption: value
        });
    };

    render() {
        return(
           <div>
                <SelectTab selectedOption={this.state.selectedOption} selectedTabIndex={this.state.selectedTabIndex} 
                onSelect={this.updateOption} onSelectTabIndex={this.updateTabIndex} />
           </div>      
        )
    }
}
export default TabsNavigation;