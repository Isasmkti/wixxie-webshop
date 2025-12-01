const express = require('express')
const app = express()
const adminRoutes = require('./routes/admin')
const authRoutes = require('./routes/auth')
const buyerRoutes = require('./routes/buyer')
const paymentsRoutes = require('./routes/payments')

app.use('/admin', adminRoutes)
app.use('/auth', authRoutes)
app.use('/buyer', buyerRoutes)
app.use('/payments', paymentsRoutes)

// Backend Application Entry Point
app.listen(3000, () => {
  console.log("Backend running on port 3000")
})
