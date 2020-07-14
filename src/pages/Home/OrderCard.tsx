import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Paper, Typography, Slider } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import SlideConfirm from '../../components/SlideConfirm'
import RestaurantService from '../../services/restaurant'

interface OrderCardProps {
  order: OrderData
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
  statusInput: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
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
  const classes = useStyles({ preparing: order.status === 'preparing' })
  console.log(order)

  // TODO: add table number, name
  // TODO: add order number
  return (
    <Paper elevation={4} className={classes.root}>
      <div className={classes.cardHeading}>
        <Typography variant="h6">{order.fromTable || 'Mesa xx'}</Typography>
        {order.status === 'preparing' ? (
          <div className={classes.preparingBadge}>Em preparo</div>
        ) : null}
      </div>

      <div className={classes.cardBody}>
        {order.items.map((itemOrder, i) => (
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

        <SlideConfirm onChange={console.log} className={classes.statusInput} />
      </div>
    </Paper>
  )
}
export default OrderCard
