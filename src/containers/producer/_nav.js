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
        name: 'Siparişler',
        to: '/producer/orders',
        icon: 'cil-bell'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Ödemeler',
        to: '/producer/payments',
        icon: 'cil-pencil'
      },
    ]
  }
]
