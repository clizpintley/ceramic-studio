export const useProducts = () => {
  const products = [
    {
      id: 'ceramic-friends-mug',
      slug: 'friends-mug',
      title: 'F.R.I.E.N.D.S Mug',
      short: 'Handpainted mug of the iconic F.R.I.E.N.D.S TV show.',
      description: 'Handpainted mug of the iconic F.R.I.E.N.D.S TV show. Not dishwasher safe.',
      price: 28.00,
      image: '/images/friends_mug.png'
    },
    {
      id: 'ceramic-rose-bowl',
      slug: 'rose-bowl',
      title: 'Hand-painted Rose Bowl',
      short: 'A delicate bowl hand-painted with roses.',
      description: 'This bowl is thrown and hand-painted with underglaze roses and finished with a glossy clear glaze. Dishwasher safe.',
      price: 45.00,
      image: '/images/rose-bowl.svg'
    }
  ]

  return { products }
}
