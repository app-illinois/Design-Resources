import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/app.scss";
import * as bootstrap from 'bootstrap';
const renderOrgChart = ({ groups, rootNode, groupNode, headerColor }) => {
  const container = document.getElementById('orgchart');

  if(container){
      if(groups.length == 0) {
        groups = [
          {
            id: "root",
            parentId: null
          },
          {
            id: 1,
            parentId: "root",
            display_name: "A Group",
            managers: "Alex Adams, Sam Smith",
            link: "link/to/details"
          },
          {
            id: 2,
            parentId: 1,
            display_name: "A Subgroup",
            managers: "A. Person, B. Someone",
            link: "link/to/details"
          }
        ]

        headerColor = "alternating";
        rootNode = `
          <div class="card text-center">
            <h5 class="card-header bg-orange-gradient text-white">
              Your Org
            </h5>
            <div class="card-body">
              <p class="text-center">
                <span class="fw-bold">Director:</span>
                Sam Smith
              </p>
            </div>
          </div>
        `;

        groupNode = `
          <div class="card">
            <h5 class="card-header {bg} text-white">
              {display_name}
            </h5>
            <div class="card-body">
              <strong>Manager(s):</strong> {managers}
              <p class="mt-3 text-center">
                <a class="fw-bold" href="{link}" target="_blank">View Group Details</a>
              </p>
            </div>
          </div>
        `;
      }
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
