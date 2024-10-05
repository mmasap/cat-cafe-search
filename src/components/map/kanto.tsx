'use client'

import type { MouseEvent } from 'react'

type JapanMapProps = Omit<React.ComponentProps<'path'>, 'onClick' | 'onMouseEnter'> & {
  onClick?: (prefCode: number) => void
  onMouseEnter?: (prefCode: number) => void
}

const KantoMap = ({ onClick, onMouseEnter, ...props }: JapanMapProps) => {
  const handleMouseEvent = ({ target, type }: MouseEvent) => {
    if (!(target instanceof SVGPathElement)) return
    const prefCode = Number(target.getAttribute('data-pref-code'))
    if (onMouseEnter && type === 'mouseenter') {
      onMouseEnter(prefCode)
    } else if (onClick && type === 'click') {
      onClick(prefCode)
    }
  }

  return (
    <svg viewBox="0 0 320 320">
      <path
        d="M272.842,60.85L250.865,126.961L258.586,158.448L278.702,190.776L249.672,172.973L209.701,176.943L174.405,150.727L166.978,142.251L165.064,136.304L193.317,117.717L214.771,111.539L222.841,75.895L220.065,51.619L240.097,66.962L250.919,58.885L251.421,51.473Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#ffeac9"
        cursor="pointer"
        data-pref-code="8"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>茨城</title>
      </path>
      <path
        d="M137.342,54.306L189.864,25.793L214.313,35.796L220.065,51.619L222.841,75.895L214.771,111.539L193.317,117.717L165.064,136.304L158.932,129.648L144.969,128.669L135.345,116.964L145.641,93.037L132.286,84.58Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#ffeac9"
        cursor="pointer"
        data-pref-code="9"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>栃木</title>
      </path>
      <path
        d="M123.675,49.164L137.342,54.306L132.286,84.58L145.641,93.037L135.345,116.964L144.969,128.669L158.932,129.648L165.064,136.304L166.978,142.251L113.993,128.391L106.634,143.831L75.264,163.548L62.951,142.118L67.15,113.249L50.522,113.249L44.717,105.337L56.255,80.196L73.247,74.482L94.336,62.053L100.171,46.598L110.993,38.435Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#ffeac9"
        cursor="pointer"
        data-pref-code="10"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>群馬</title>
      </path>
      <path
        d="M166.978,142.251L174.405,150.727L184.877,185.811L142.231,188.848L104.734,174.284L96.177,179.157L76.657,172.054L75.264,163.548L106.634,143.831L113.993,128.391Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#ffeac9"
        cursor="pointer"
        data-pref-code="11"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>埼玉</title>
      </path>
      <path
        d="M278.702,190.776L278.815,196.3L260.002,196.202L243.265,210.422L234.071,231.831L233.29,255.457L210.385,261.648L192.331,285.125L182.912,287.271L174.367,279.826L185.444,275.847L180.638,257.613L185.101,247.4L177.059,239.104L207.317,210.295L196.155,198.521L184.904,202.764L184.877,185.811L174.405,150.727L209.701,176.943L249.672,172.973Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#ffeac9"
        cursor="pointer"
        data-pref-code="12"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>千葉</title>
      </path>

      <path
        d="M184.904,202.764L177.827,206.105L175.577,200.277L177.589,216.73L153.156,204.855L146.284,206.793L147.102,219.243L114.928,200.22L96.177,179.157L104.734,174.284L142.231,188.848L184.877,185.811ZM178.004,487.94L182.222,498.687L173.517,489.822ZM149.357,383.222L152.785,377.35L157.648,379.893L153.828,385.865ZM142.868,300.953L145.177,312.894L136.551,307.927L137.047,299.071Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#ffeac9"
        cursor="pointer"
        data-pref-code="13"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>東京</title>
      </path>
      <path
        d="M177.589,216.73L163.987,223.359L168.237,225.914L163.373,229.446L164.558,241.433L173.709,247.081L166.263,253.435L168.018,259.597L161.535,260.34L154.739,240.278L142.551,239.017L120.749,245.431L118.347,260.056L112.351,262.244L100.96,252.159L102.187,231.814L94.058,231.838L112.03,216.443L114.928,200.22L147.102,219.243L146.284,206.793L153.156,204.855Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#ffeac9"
        cursor="pointer"
        data-pref-code="14"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>神奈川</title>
      </path>
    </svg>
  )
}

export default KantoMap
