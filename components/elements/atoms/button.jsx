﻿var React = require('react');module.exports = React.createClass({        render: function() {                return <button className={this.props.className} onClick={this.handleClick}>{this.props.btnLable}</button>        },        handleClick: function(){            this.props.whenClicked();        } });