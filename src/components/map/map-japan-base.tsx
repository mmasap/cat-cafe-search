'use client' //　Next.js App Routerを使う場合はここ追加

import React, { useEffect, memo, useRef } from 'react'
import * as d3 from 'd3'
import geoJson from './japan.json'

const REGION_COLOR_MAP: ReadonlyMap<string, string> = new Map([
  ['Hokkaido', '#d4e8ff'],
  ['Tohoku', '#d3f6fe'],
  ['Kanto', '#ffeac9'],
  ['Chubu', '#ffe4e4'],
  ['Kinki', '#e3e9ca'],
  ['Chugoku', '#ddeee8'],
  ['Shikoku', '#ebe6dd'],
  ['Kyushu', '#e3dcff'],
  ['Okinawa', '#f0d7f1'],
])

const MAP_SIZE = 500
const centerPos: [number, number] = [137.0, 38.2]

const JapanMap = () => {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // 地図設定
    const projection = d3
      .geoMercator()
      .center(centerPos)
      .translate([MAP_SIZE / 2, MAP_SIZE / 2])
      .scale(1400)

    // 地図をpathに投影(変換)
    const path = d3.geoPath().projection(projection)
    d3.select(ref.current)
      .selectAll('path')
      .data(geoJson.features)
      .enter()
      .append('path')
      .attr('d', path as any)
      .attr('stroke', '#666')
      .attr('stroke-width', 0.25)
      .attr('fill', (item) => REGION_COLOR_MAP.get(item.properties.region) ?? null)
      .attr('cursor', 'pointer')
      .on('click', (_, target) => {
        console.log(target.properties.region)
      })
  }, [])

  return (
    <div className="relative aspect-square">
      <svg ref={ref} viewBox={`0 0 ${MAP_SIZE - 20} ${MAP_SIZE}`} className="absolute inset-0" />
    </div>
  )
}

export default JapanMap
