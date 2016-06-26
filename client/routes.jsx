import React from 'react';
import {mount} from 'react-mounter';
// load Layout and Welcome React components
import {Layout, Welcome} from './app.jsx';
import CardListContainer from './containers/CardListContainer.jsx';
import CardContainer from './containers/CardContainer.jsx';

FlowRouter.route("/", {
  action() {
    mount(Layout, {
        content: (<CardListContainer />)
    });
  }
});

FlowRouter.route("/cards/:_id", {
  action({_id}) {
    mount(Layout, {
        content: (<CardContainer _id={_id} />)
    });
  }
});