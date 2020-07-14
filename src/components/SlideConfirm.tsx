import React, { useRef } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  const HEIGHT = 20

  const styles = {
    thumb: {
      position: 'relative',
      zIndex: 10,
      color: theme.palette.primary.main,
      '-webkit-appearance': 'none',
      display: 'block',
      // border: '1px solid currentColor',
      backgroundColor: 'currentColor',
      boxShadow: theme.shadows[4],
      height: HEIGHT,
      width: 34,
      borderRadius: 14,
      cursor: 'pointer',
      '&:active': {
        boxShadow: theme.shadows[8],
      },
    },
    track: {
      height: 0,
    },
  }

  return {
    root: {
      color: '#ccc',
      '&:hover': {
        color: theme.palette.primary.main,
      },
      transition: 'all .2s',
      '& label': {
        fontSize: '.9rem',
        color: '#bbb',
      },
    },
    track: {
      height: HEIGHT,

      display: 'block',
      width: '100%',
      border: '1px solid currentColor',
      boxShadow: 'inset 0 0 1.4px .1px currentColor',
      backgroundColor: 'transparent',
      borderRadius: 30,
      ...theme.flex.center,

      // firefox only
      '@supports (-moz-appearance:none)': {
        marginTop: -HEIGHT,
      },
    },
    input: {
      all: 'unset',
      background: 'transparent',
      '-webkit-appearance': 'none',
      display: 'block',
      width: '100%',

      color: theme.palette.primary.main,
      outline: 'none',
      '&:focus': {
        outline: 'none',
      },

      '&::-webkit-slider-thumb': styles.thumb,
      '&::-webkit-slider-runnable-track': styles.track,
      '&::-moz-focus-outer': {
        border: 0,
      },
      '&::-moz-range-thumb': {
        ...styles.thumb,
        boxShadow: 'none',
        borderRadius: 12,
      },
      '&::-moz-range-track': styles.track,
    },
  }
})

interface SlideConfirmProps {
  onChange: (confirmed: boolean) => void
  style?: object
  className?: string
}

export default function SlideConfirm({
  onChange,
  style,
  className,
}: SlideConfirmProps) {
  const ref = useRef<HTMLInputElement>(null)
  const classes = useStyles()
  const maxValue = '100'

  const handleMouseUp = () => {
    if (!ref) return

    onChange(ref!.current!.value === maxValue)
    ref!.current!.value = '0'
  }

  return (
    <div className={clsx(classes.root, className)} style={style}>
      <input
        id="range-slider-input"
        type="range"
        min="0"
        defaultValue="0"
        ref={ref}
        max={maxValue}
        onMouseUp={handleMouseUp}
        className={classes.input}
      />
      <div className={classes.track}>
        <label htmlFor="range-slider-input">
          Arraste para avançar o pedido
        </label>
      </div>
    </div>
  )
}
