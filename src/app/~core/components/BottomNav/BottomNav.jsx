import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import { Creators as coreActions } from 'app/~core/actions';

const {
  toggleSideMenu
} = coreActions;

const BottomNav = ({ clickHandler }) => (
  <div className="bottomNavWrapper">
    <BottomNavigation onClick={clickHandler} className="custom bottomNav">
      <BottomNavigationButton label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationButton label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationButton label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  </div>
);

// const mapStateToProps = ({ core: { showSideMenu } }) => ({
//   showSideMenu
// });

const mapDispatchToProps = dispatch => bindActionCreators({
  clickHandler: toggleSideMenu
}, dispatch);

export default connect(null, mapDispatchToProps)(BottomNav);
