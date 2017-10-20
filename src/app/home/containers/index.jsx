import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Home = () => (
  null
);

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
