import React, { useState, useEffect } from 'react'
import { CircularProgress, Paper, Typography, Slider } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import SlideConfirm from '../../components/SlideConfirm'
import OrderService from '../../services/order'

interface OrderCardProps {
  order: Order
}

const useStyles = makeStyles(theme => ({
  root: {},
  cardHeading: {
    ...theme.flex.center,
    borderBottom: '1px solid #ccc',
    justifyContent: 'space-between',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  cardBody: {
    padding: theme.spacing(1),
  },
  itemOrder: {
    padding: theme.spacing(1),
    '&:not(:last-child)': {
      borderBottom: theme.border.light,
    },
  },
  selectedOptionals: {
    marginLeft: theme.spacing(1),
  },
  optional: {
    marginBottom: theme.spacing(1),
  },
  optionalName: {
    color: theme.palette.text.secondary,
    fontSize: '1rem',
  },
  statusSlider: {
    transition: 'filter .15s',
    filter: props => props.loadingStatus && 'blur(4px)',
  },
  statusSliderContainer: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),

    '& .status-loader': {
      position: 'absolute',
      left: '48%',
      display: props => (props.loadingStatus ? 'block' : 'none'),
    },
  },
  preparingBadge: {
    ...theme.typography.button,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '.75rem',
    color: 'white',
    padding: '2px 8px',
    backgroundColor: '#7FB069',
    borderRadius: 10,
  },
}))

function OrderCard({ order }: OrderCardProps) {
  const [loadingStatus, setLoadingStatus] = useState(false)
  const classes = useStyles({ loadingStatus })

  const handleStatusSlider = async confirmed => {
    if (!confirmed) return

    setLoadingStatus(true)

    const orderService = new OrderService(order.ref)
    await orderService.advanceStatus(order.data.status)
    setLoadingStatus(false)
  }

  // TODO: add table number, name
  // TODO: add order number
  return (
    <Paper elevation={4} className={classes.root}>
      <div className={classes.cardHeading}>
        <div>
          <Typography variant="h6">
            {order.data.fromTable || 'Mesa xx'}
          </Typography>
          <Typography variant="caption">
            Feito em{' '}
            {order.data.orderedAt?.toDate().toLocaleTimeString('pt-BR', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </Typography>
        </div>
        {order.data.status === 'preparing' ? (
          <div className={classes.preparingBadge}>Em preparo</div>
        ) : null}
      </div>

      <div className={classes.cardBody}>
        {order.data.items.map((itemOrder, i) => (
          <div className={classes.itemOrder} key={i + itemOrder.item.id}>
            <Typography variant="body1" gutterBottom>
              {itemOrder.amount}x {itemOrder.item.name}
            </Typography>

            <div className={classes.selectedOptionals}>
              {Object.entries(itemOrder.selectedOptionals).map(
                ([optional, option]) => (
                  <div key={optional} className={classes.optional}>
                    <Typography
                      className={classes.optionalName}
                      variant="body2"
                    >
                      {optional}
                    </Typography>

                    {(Array.isArray(option) ? option : [option]).map(option => (
                      <Typography variant="body2" key={option.name}>
                        - {option.name}
                      </Typography>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        ))}

        <div className={classes.statusSliderContainer}>
          <CircularProgress size={20} className="status-loader" />
          <SlideConfirm
            onChange={handleStatusSlider}
            className={classes.statusSlider}
          />
        </div>
      </div>
    </Paper>
  )
}
export default OrderCard
