import React from 'react';

// define and export our Layout component
export const Layout = ({content}) => (
    <div>
    	<div className="container">
	        <div className="row">
				<nav className='navbar navbar-default'>
					<div className='container-fluid'>
					  <div className='navbar-header'>
					    <a className="navbar-brand" href="/"><i className="fa fa-bomb"></i> 2R1B</a>
					  </div>
					</div>
				</nav>
		    </div>
	    </div>
        <div>{content}</div>
    </div>
);

// define and export our Welcome component
export const Welcome = ({name}) => (
    <div>
        Hello, {name}.
    </div>
);