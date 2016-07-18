import React from 'react';
import {mount} from 'react-mounter';
// load Layout and Welcome React components
import {Layout, Welcome} from './app.jsx';
import Home from './components/Home.jsx';
import Instructions from './components/Instructions.jsx';
import CardListContainer from './containers/CardListContainer.jsx';
import CardContainer from './containers/CardContainer.jsx';
import GamePageContainer from './containers/GamePageContainer.jsx';

FlowRouter.route("/", {
  action() {
    mount(Layout, {
        content: (<Home />)
    });
  }
});

FlowRouter.route("/instructions", {
  action() {
    mount(Layout, {
        content: (<Instructions />)
    });
  }
});

FlowRouter.route("/game/:_id", {
  action({_id}) {
    mount(Layout, {
        content: (<GamePageContainer _id={_id} />)
    });
  }
});

FlowRouter.route("/cards", {
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