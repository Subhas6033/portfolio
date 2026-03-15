import React from 'react'
import useInView from '../../hooks/useInView'

const Reveal = ({ children, className = '', delay = 0, dir = 'up' }) => {
  const [ref, inView] = useInView()
  const cls =
    dir === 'left'  ? 'anim-fadeLeft'  :
    dir === 'right' ? 'anim-fadeRight' :
    dir === 'scale' ? 'anim-scaleIn'   : 'anim-fadeUp'

  return (
    <div ref={ref} className={className} style={{ opacity: inView ? undefined : 0 }}>
      {inView && (
        <div className={cls} style={{ animationDelay: `${delay}s` }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Reveal
