import React from 'react';
import {setDefaultLoadingComponent} from 'react-komposer';

const LoadingBomb = () => (
	<div className="spinner-holder">
	    <div className="spinner">
	        <i className="fa fa-bomb spinner"></i>
	    </div>
	</div>
);

setDefaultLoadingComponent(LoadingBomb);