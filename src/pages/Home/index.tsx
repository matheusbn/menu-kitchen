import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import OrderCard from './OrderCard'
import RestaurantService from '../../services/restaurant'

interface HomeProps {}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
  },
  title: {
    width: '100%',
    textAlign: 'center',
  },
  orderList: {
    padding: theme.spacing(2),
    display: 'grid',
    gridGap: theme.spacing(2),
  },
}))

function Home({}: HomeProps) {
  const classes = useStyles()
  const restaurant = useSelector(state => state.restaurant)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (restaurant) {
      const restaurantService = new RestaurantService(restaurant.ref)
      restaurantService.onUnfinishedOrders(orders => {
        setOrders(
          orders
            .slice()
            .sort((o1, o2) => (o1.data.status === 'preparing' ? -1 : 1))
        )
      })
    }
  }, [restaurant])

  return (
    <section className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Cozinha
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.orderList}>
        {orders.map(order => (
          <OrderCard key={order.ref.id} order={order.data} />
        ))}
      </div>
    </section>
  )
}

export default Home
