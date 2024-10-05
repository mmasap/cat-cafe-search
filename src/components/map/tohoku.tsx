'use client'

import type { MouseEvent } from 'react'

type JapanMapProps = Omit<React.ComponentProps<'path'>, 'onClick' | 'onMouseEnter'> & {
  onClick?: (prefCode: number) => void
  onMouseEnter?: (prefCode: number) => void
}

const TohokuMap = ({ onClick, onMouseEnter, ...props }: JapanMapProps) => {
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
        d="M127.93,81.787L127.882,74.378L123.854,70.247L132.925,60.001L143.29,58.203L146.411,43.213L148.74,45.893L150.607,43.326L142.803,36.995L146.338,35.281L147.406,27.749L153.268,33.067L157.488,30.315L161.598,32.393L165.039,54.479L172.318,52.505L174.107,44.292L184.989,53.23L188.601,50.736L193.128,34.92L189.61,27.815L182.386,33.12L168.102,35.59L175.324,9.432L193.04,22.058L202.216,17.315L198.647,34.552L200.227,62.71L203.574,73.237L212.827,80.392L206.58,86.285L194.331,86.528L180.204,95.644L175.944,93.667L177.588,82.974L173.138,77.463L162.34,82.91L150.668,78.476Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#d3f6fe"
        cursor="pointer"
        data-pref-code="2"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>青森</title>
      </path>
      <path
        d="M212.827,80.392L220.694,94.833L220.718,104.767L225.952,109.479L228.847,125.004L226.485,133.965L230.183,132.23L231.854,137.861L226.119,143.525L231.273,143.175L225.423,148.313L223.788,151.765L227.618,151.975L223.486,156.939L225.936,158.233L220.782,163.005L224.182,166.445L219.481,166.875L220.961,171.213L215.11,170.312L215.234,175.665L213.444,172.89L210.839,174.637L203.956,173.426L201.211,184.563L190.19,188.05L185.846,181.16L167.792,175.629L169.583,161.594L162.84,147.858L170.28,132.712L168.951,119.445L173.222,117.015L172.482,97.723L175.944,93.667L180.204,95.644L194.331,86.528L206.58,86.285Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#d3f6fe"
        cursor="pointer"
        data-pref-code="3"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>岩手</title>
      </path>
      <path
        d="M210.839,174.637L212.466,181.894L208.31,179.994L205.041,187.151L207.228,191.197L202.177,193.838L205.701,195.674L202.372,199.582L206.309,202.763L202.539,208.325L206.381,211.091L204.042,211.941L205.224,218.401L195.83,209.604L189.439,211.051L187.84,214.976L183.43,212.603L175.921,231.977L176.283,241.869L168.019,249.269L162.522,242.296L143.852,237.257L144.475,232.241L152.708,225.595L159.269,206.866L156.794,195.727L160.89,187.939L156.721,180.027L167.792,175.629L185.846,181.16L190.19,188.05L201.211,184.563L203.956,173.426Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#d3f6fe"
        cursor="pointer"
        data-pref-code="4"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>宮城</title>
      </path>
      <path
        d="M124.856,165.35L131.668,146.89L133.576,126.61L129.04,116.904L118.955,118.305L115.907,109.989L121.985,111.741L129.605,101.248L131.864,86.552L127.93,81.787L150.668,78.476L162.34,82.91L173.138,77.463L177.588,82.974L175.944,93.667L172.482,97.723L173.222,117.015L168.951,119.445L170.28,132.712L162.84,147.858L169.583,161.594L167.792,175.629L156.721,180.027L147.43,172.353Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#d3f6fe"
        cursor="pointer"
        data-pref-code="5"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>秋田</title>
      </path>
      <path
        d="M108.625,201.115L119.626,184.08L124.856,165.35L147.43,172.353L156.721,180.027L160.89,187.939L156.794,195.727L159.269,206.866L152.708,225.595L144.475,232.241L143.852,237.257L143.836,248.63L141.159,251.099L135.775,252.207L127.373,246.709L117.221,246.166L111.981,240.645L114.999,223.393L121.3,221.468L124.287,216.353L116.476,210.934L116.105,204.276Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#d3f6fe"
        cursor="pointer"
        data-pref-code="6"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>山形</title>
      </path>
      <path
        d="M176.283,241.869L180.634,251.942L181.592,273.505L177.607,298.707L169.641,306.024L158.534,301.162L158.274,305.005L152.663,309.193L142.276,301.238L139.293,293.033L126.616,287.847L99.382,302.631L92.296,299.965L93.303,288.072L89.412,282.797L91.023,270.984L108.862,265.543L108.059,258.276L117.221,246.166L127.373,246.709L135.775,252.207L141.159,251.099L143.836,248.63L143.852,237.257L162.522,242.296L168.019,249.269Z"
        stroke="#666"
        strokeWidth="0.25"
        fill="#d3f6fe"
        cursor="pointer"
        data-pref-code="7"
        onClick={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        {...props}
      >
        <title>福島</title>
      </path>
    </svg>
  )
}

export default TohokuMap
