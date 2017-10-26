import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';
import HomeIcon from 'material-ui-icons/Home';
import InfoIcon from 'material-ui-icons/InfoOutline';
import { Creators as coreActions } from 'app/~core/actions';

const {
  toggleSideMenu
} = coreActions;

const style = {
  margin: '6px 16px 0 0'
};

const MainNav = ({ clickHandler }) => (
  <div className="mainNav">
    <Button color="contrast" onClick={clickHandler}>Home</Button>
    <Button color="contrast" onClick={clickHandler}>About</Button>
    <Button color="contrast" onClick={clickHandler}>Contact</Button>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  clickHandler: toggleSideMenu
}, dispatch);

export default connect(null, mapDispatchToProps)(MainNav);
