import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { Person, Connection } from '../types';

interface SpiderMapProps {
  people: Person[];
  connections: Connection[];
  onNodeClick: (person: Person) => void;
}

const SpiderMap: React.FC<SpiderMapProps> = ({ people, connections, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.parentElement?.clientWidth || 800;
    const height = svgRef.current.parentElement?.clientHeight || 600;

    d3.select(svgRef.current).selectAll('*').remove();
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    const links = connections.map(d => ({...d}));
    const nodes = people.map(d => ({...d}));

    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(0, 0))
      .force('collide', d3.forceCollide().radius(30));


    // Define image patterns
    const defs = svg.append('defs');
    nodes.forEach(node => {
        if (node.imageUrl) {
            defs.append('pattern')
                .attr('id', `img-${node.id}`)
                .attr('width', 1)
                .attr('height', 1)
                .append('image')
                .attr('xlink:href', node.imageUrl)
                .attr('width', 30)
                .attr('height', 30)
                .attr('x', 0)
                .attr('y', 0);
        }
    });

    const link = svg.append('g')
      .attr('stroke', '#7e22ce')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 1.5);

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        onNodeClick(d as Person);
      })
      .call(drag(simulation) as any);

    node.append('circle')
      .attr('r', 15)
      .attr('fill', d => d.imageUrl ? `url(#img-${d.id})` : '#1e293b')
      .attr('stroke', '#d8b4fe')
      .attr('stroke-width', 2);

    node.append('text')
      .text(d => d.name)
      .attr('x', 20)
      .attr('y', 5)
      .attr('fill', '#d8b4fe')
      .style('font-size', '14px')
      .style('paint-order', 'stroke')
      .style('stroke', '#111827')
      .style('stroke-width', '3px')
      .style('text-shadow', '0 0 4px #9333ea');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function drag(simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>) {
        function dragstarted(event: d3.D3DragEvent<any, any, any>) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event: d3.D3DragEvent<any, any, any>) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event: d3.D3DragEvent<any, any, any>) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people, connections, onNodeClick]);

  return <svg ref={svgRef}></svg>;
};

export default SpiderMap;
