import React, { Component } from 'react';

//components
import ParentAppBar from './ParentAppBar';
import TabsNavigation from './TabsNavigation';

class Home extends Component {
    render() {
        return(
            <div>
                <ParentAppBar />
                <TabsNavigation />
                
            </div>
        )
    }
}

export default Home;