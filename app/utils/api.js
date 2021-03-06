var axios = require('axios');

module.exports = {
    fetchPopularRepos (language) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language +'&sort=stars&order=desc&type=Repositories');
        
        return axios.get(encodedURI)
                    .then(function(response) { 
                        return response.data.items;
                    });
    },

    fetchUserDetails (user) {
        var encodedURI = window.encodeURI('https://api.github.com/search/users?q='+user);

        return axios.get(encodedURI)
                    .then(function(response) {
                        return response.data.items;
                    });
    }
}