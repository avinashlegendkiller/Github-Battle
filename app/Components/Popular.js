import React, {Component} from 'react';
import api from './../utils/api';
//ui
import AutoComplete from 'material-ui/AutoComplete';

const languages = [
    'All',
    'JavaScript',
    'Css',
    'Java',
    'Ruby',
    'Python'
];

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }

        this.updateLanguage = this.updateLanguage.bind(this);
        this.handleNewRequest = this.handleNewRequest.bind(this);
    }

    componentDidMount() {
        //call updateLanguage with selectedLanguage when component is loaded for the 1st time
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
         //make repos 'null' so that it becomes empty before storing data of next language
                this.setState({
                    selectedLanguage: lang,
                    repos: null
                });

        //update selectedLanguage, repos state values, only when searched language (lang) matches one of the languages
        languages.map(function(language) {
            if(language === lang) {
                
                //repos is null, call api
                api.fetchPopularRepos(lang)
                    .then(function(repo) {
                        // this.setState({repos: this.state.repo});
                        console.log(repo[0].name);
                    })
            }
        });
        
    }

    handleNewRequest() {
        
    }

    render() {
        return(
            <div>
                <AutoComplete
                    hintText="Search a language"
                    searchText={this.state.selectedLanguage}
                    onUpdateInput={this.updateLanguage}
                    onNewRequest={this.handleNewRequest}
                    dataSource={languages}
                    filter={AutoComplete.caseInsensitiveFilter}
                    openOnFocus={true}
                    />
                    <br/>
                    {/*{ this.state.repos!== null ? JSON.stringify(this.state.repos) : <p>Loading</p> }*/}
                </div>
        )
    }
}
export default Popular;