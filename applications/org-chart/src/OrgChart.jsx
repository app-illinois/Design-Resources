import React, { useLayoutEffect, useRef, useState } from 'react';
import { OrgChart } from 'd3-org-chart';

export const OrgChartComponent = (props, ref) => {
  const { groups, headerColor, groupNode, rootNode } = props;
  const d3Container = useRef(null);
  let chart = null;

	const expandAll = () => {
		chart.expandAll().fit();
	}

	const collapseAll = () => {
		chart.collapseAll().fit();
	}

  const renderRootNode = () => {
    return rootNode;
  };

  const renderNode = (bg, data) => {
    let nodeStr = groupNode;
    nodeStr = nodeStr.replace('{bg}', bg)

    Object.keys(data).forEach((key) => {
      nodeStr = nodeStr.replace(`{${key}}`, data[key]);
    })

    return nodeStr;
  }

  const nodeContent = (node) => {
		const data = node.data;
    let bg = 'bg-blue-gradient';
    if(headerColor == 'alternating'){
      if(data.depth %2 == 0){
        bg = 'bg-orange-gradient';
      }
    } else if(headerColor == 'orange') {
      bg = 'bg-orange-gradient';
    }

    if(!data.parentId){
      return renderRootNode();
    }

    return renderNode(bg, data);

		// return `
		// 	<div class="card">
		// 		<h5 class="card-header ${bg} text-white">
		// 			${data.display_name}
		// 		</h5>
		// 		<div class="card-body">
		// 			<strong>Manager(s):</strong> ${data.managers}
		// 			<p class="mt-3 text-center">
		// 				<a class="fw-bold" href="${data.link}" target="_blank">View Group Details</a>
		// 			</p>
		// 		</div>
		// 	</div>
		// `;
	}

  useLayoutEffect(() => {
    if (groups && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .data(groups)
        .nodeWidth((d) => 250)
        .nodeHeight((d) => 140)
		    .nodeContent((node) => { return nodeContent(node) })
		    .rootMargin(20)
        .render();
    }
  }, [groups, d3Container.current]);

  return (
	<>
		<div className='row border-bottom pb-1'>
			<div className='col text-center'>
				<button className='btn btn-primary me-2' onClick={expandAll}>Expand All</button>
				<button className='btn btn-info' onClick={collapseAll}>Collapse All</button>
			</div>
		</div>
		<div className='row'>
			<div className='col'>
				<div ref={d3Container} />
			</div>
		</div>
	</>
  );
};
