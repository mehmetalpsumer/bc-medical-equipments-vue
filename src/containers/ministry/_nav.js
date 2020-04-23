export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/ministry/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Hospitals',
        to: '/ministry/hospitals',
        icon: 'cil-building'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Payments',
        to: '/ministry/payments',
        icon: 'cil-money'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Orders',
        to: '/ministry/orders',
        icon: 'cil-clipboard'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Producers',
        to: '/ministry/producers',
        icon: 'cil-factory'
      },
    ]
  }
]
