import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import { Creators as coreActions } from 'app/~core/actions';

const {
  toggleSideMenu
} = coreActions;

const MenuItem = ({ clickHandler, value, icon }) => (
  <ListItem onClick={clickHandler} className="userNavigationMenuItem" button>
    <Avatar className="userNavigationMenuItemAvatar">{icon}</Avatar>
    <ListItemText className="userNavigationMenuItemText" primary={value} />
  </ListItem>
);

const UserNavigationMenu = ({ clickHandler }) => (
  <List className="userNavigationMenu">
    <MenuItem clickHandler={clickHandler} value="My Account" icon={<AccountBoxIcon />} />
    <MenuItem clickHandler={clickHandler} value="My Account" icon={<FolderIcon />} />
    <MenuItem clickHandler={clickHandler} value="My Account" icon={<FolderIcon />} />
    <MenuItem clickHandler={clickHandler} value="My Account" icon={<FolderIcon />} />
  </List>
);

// const mapStateToProps = ({ core: { showSideMenu } }) => ({
//   showSideMenu
// });

const mapDispatchToProps = dispatch => bindActionCreators({
  clickHandler: toggleSideMenu
}, dispatch);

export default connect(null, mapDispatchToProps)(UserNavigationMenu);
