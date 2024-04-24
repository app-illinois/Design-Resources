import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/app.scss";
import * as bootstrap from 'bootstrap';
const renderOrgChart = ({ groups, rootNode, groupNode, headerColor }) => {
  const container = document.getElementById('orgchart');

  if(container){
      if(!groups) groups = JSON.parse(container.dataset.groups);
      const root = ReactDOM.createRoot(container);
      root.render(
        <App
          groups={groups}
          rootNode={rootNode}
          groupNode={groupNode}
          headerColor={headerColor}
        />
    );
  }
}

export {
  renderOrgChart
}
