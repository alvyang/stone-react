import React from "react";
import {Router,Route,Link,hashHistory } from "react-router";
import ReactDom from "react-dom";

var About = React.createClass({
	render:function(){
		return <div>About</div>;
	}
});
var Inbox = React.createClass({
	render(){
		return <div>Inbox</div>;
	}
});
var Home = React.createClass({
	render(){
		return <div>
			<ul >
	          <li><Link to="/about">About</Link></li>
	          <li><Link to="/inbox">Inbox</Link></li>
	        </ul>
		{this.props.children}</div>;
	}
});

/* 
 * <Router path="/" history={hashHistory}>
		<Route path="/" component={Home}/>
		<Route path="/about" handler={About}/>
		<Route path="/inbox" handler={Inbox}/>
	</Router>
 */
ReactDom.render(
	<Router history={hashHistory}>
		<Route path="/" component={Home}>
			<Route path="/about" component={About}/>
			<Route path="/inbox" component={Inbox}/>
		</Route>
	</Router>,
	document.getElementById('app')
);
