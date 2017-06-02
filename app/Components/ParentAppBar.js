import React, {Component} from 'react';
//ui
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import GithubIcon from 'material-ui/svg-icons/action/code';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const Menu = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Settings" />
  </IconMenu>
);

class ParentAppBar extends Component {
    render() {
        return(
            <AppBar
            id="app-bar"
            className="parent-appbar"
            title="Github Battle"
            iconElementLeft={<IconButton><GithubIcon /></IconButton>}
            iconElementRight={<Menu />} />
        )
    }
}
export default ParentAppBar;