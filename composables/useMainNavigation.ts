export type MainNavigationLink = {
  to: string
  label: string
}

const mainNavigationLinks: MainNavigationLink[] = [
  { to: '/gallery', label: 'My Products' },
  { to: '/behind-the-scenes', label: 'Behind the Scenes' },
  { to: '/about', label: 'About Me' },
  { to: '/contact#contact-section', label: 'Contact' }
]

export const useMainNavigation = () => {
  return mainNavigationLinks
}
