import React from 'react';
import { OrgChartComponent } from './OrgChart';
import "./styles/app.scss";

const App = (props) => {
  return (
      <div className='container'>
          <OrgChartComponent
            groups={props.groups}
            rootNode={props.rootNode}
            groupNode={props.groupNode}
            headerColor={props.headerColor}
          />
      </div>
  );
};

export default App;