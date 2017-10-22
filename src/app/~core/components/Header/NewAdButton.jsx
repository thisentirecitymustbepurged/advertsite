import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { Creators as coreActions } from 'app/~core/actions';

const {
  toggleSideMenu
} = coreActions;

const style = {
  margin: '6px 16px 0 20px'
};

const NewAdButton = ({ clickHandler }) => (
  <Button
    style={style}
    label="Create New Ad"
    onClick={clickHandler}
    raised
    color="secondary"
  />
);

const mapDispatchToProps = dispatch => bindActionCreators({
  clickHandler: toggleSideMenu
}, dispatch);

export default connect(null, mapDispatchToProps)(NewAdButton);