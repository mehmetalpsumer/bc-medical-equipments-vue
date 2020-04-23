export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/producer/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Orders',
        to: '/producer/orders',
        icon: 'cil-bell'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Payments',
        to: '/producer/payments',
        icon: 'cil-pencil'
      },
    ]
  }
]
