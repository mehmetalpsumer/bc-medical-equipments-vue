export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/ministry/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: '!'
        }
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Hastaneler',
        to: '/ministry/hospitals',
        icon: 'cil-hospital'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Siparişler',
        to: '/ministry/orders',
        icon: 'cil-barcode'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Üreticiler',
        to: '/ministry/producers',
        icon: 'cil-factory'
      },
    ]
  }
]
