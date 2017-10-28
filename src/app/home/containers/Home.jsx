import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Home = () => (
  <div>Home</div>
);

const mapStateToProps = ({ home: { ads } }) => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
