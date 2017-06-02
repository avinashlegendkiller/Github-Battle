import React, {Component} from 'react';
import api from './../utils/api';
import PropTypes from 'prop-types';
import lodash from 'lodash';
//ui
import AutoComplete from 'material-ui/AutoComplete';

const languages = [
    'JavaScript',
    'C',
    'Css',
    'Java',
    'R',
    'Ruby',
    'Python',
    'Swift'
];
languages.sort();

function LoadingSearch() {
    return(
        <div className="content-center popular-child-item-padding">
            <div className="search-message-container">
                Loading...
            </div>
        </div>
    )
}

function NoMatchFound() {
    return(
        <div className="content-center popular-child-item-padding">
            <div className="search-message-container">
                No match found
            </div>
         </div>   
    )
}

function RepoGrid(props) {
    return(
        <div className="pure-g popular-list">
            { props.repos.map(function(repo,index) {
                return (
                    <div key={repo.name} className="popular-item pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-3 pure-u-xl-1-4">
                        <div className="popular-rank">#{index+1}</div>
                        <ul className="space-list-items"> 
                            <li>
                                <img src={repo.owner.avatar_url}
                                className="avatar"
                                alt={'Avatar for '+repo.owner.login} />
                            </li>
                            <li className="popular-inner-padding"><a href={repo.owner.html_url} target="_new">{repo.name}</a></li>
                            <li className="popular-inner-padding">@{repo.owner.login}</li>
                            <li className="popular-inner-padding">{repo.stargazers_count} stars</li>
                        </ul>
                    </div>
                )
            }) }
        </div>    
    )
}
RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
    selectedLanguage: PropTypes.string.isRequired
}

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: '',
            repos: null,
            searchQueryResult: ''
        }

        this.updateLanguage = this.updateLanguage.bind(this);
        this.handleNewRequest = this.handleNewRequest.bind(this);
    }

    componentDidMount() {
        // show all repos after component did mount
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
         // search query is null
         if(lang === '') {
             //when lang is '' make searchText (selectedLang) to display empty string
             //make repos 'null', before storing data of next language
            this.setState({
                selectedLanguage: '',
                repos: null,
                searchQueryResult: 'found'
            });

            // 'All' repos
            api.fetchPopularRepos('All')
                .then(function(repo) {
                    this.setState({repos: repo});
                }.bind(this));
         } 
         
         //search query is not null
         else {
             this.setState({
                selectedLanguage: lang,
                repos: null
            });

            let filterResult = languages.some(function(language) { //some(): It will stop looping when condition in function is found to be true
                let language_lowercase = language.toLowerCase();
                let lang_lowercase = lang.toLowerCase();

                // vanilla js -> language_lowercase.includes(lang_lowercase)
                // lodash -> .includes(param1, param2)
                return lodash.includes(language_lowercase,lang_lowercase);
            });

            // based on 'filterResult' set 'searchQueryResult' state
            { filterResult ? this.setState({searchQueryResult: 'found'}) : this.setState({searchQueryResult: 'no-match-found'}) }

            //filter & map
            languages.filter(function(language) {
                return language === lang;
            }).map(function(language) {
                    //repos is null, call api
                    api.fetchPopularRepos(language)
                        .then(function(repo) {
                            console.log('response',repo);
                            this.setState({repos: repo});
                        }.bind(this));
            }.bind(this));

         }//else-ends
        
    }

    handleNewRequest() {
        
    }

    render() {
        return(
            <div className="popular-tab-content-parent">
                <AutoComplete
                    hintText="Search a language"
                    searchText={this.state.selectedLanguage}
                    onUpdateInput={this.updateLanguage}
                    onNewRequest={this.updateLanguage}
                    dataSource={languages}
                    filter={AutoComplete.caseInsensitiveFilter}
                    openOnFocus={true}
                    fullWidth={true}
                    />
                    <br/>
                    
                    {/* show RepoGrid only when data from api is returned; because 'repos' propTypes is required */}
                    
                    { 
                        (!this.state.repos) && (this.state.selectedLanguage === '') ? 
                        <LoadingSearch />
                        : 
                        ( !this.state.repos && this.state.searchQueryResult === 'no-match-found' ? <NoMatchFound /> 
                            : 
                            ( !this.state.repos && this.state.searchQueryResult === 'found' ? <LoadingSearch />
                                :
                                <RepoGrid selectedLanguage={this.state.selectedLanguage} repos={this.state.repos} />
                            )
                        )
                        
                    }
                        
                    
                </div>
        )
    }
}
export default Popular;

//this.setState error:
// https://stackoverflow.com/questions/32317154/uncaught-typeerror-cannot-read-property-setstate-of-undefined