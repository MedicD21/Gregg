export type Project = {
  title: string
  description: string
  stack: string[]
  repo: string
  status: 'Live' | 'In progress' | 'Planned'
}

export const githubUsername = 'MedicD21'

export const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description:
      'A personal site for collecting school projects, personal builds, notes, and GitHub work as I grow as a programmer.',
    stack: ['React', 'TypeScript', 'Vite'],
    repo: 'Gregg',
    status: 'Live',
  },
  {
    title: 'Recipe Search App',
    description:
      'A practice project focused on API data, search, filters, saved results, and readable UI states.',
    stack: ['React', 'API', 'State'],
    repo: 'recipe-search-app',
    status: 'Planned',
  },
  {
    title: 'Checkout Flow Prototype',
    description:
      'A form-driven prototype for validation, confirmation screens, and accessible input feedback.',
    stack: ['React', 'Forms', 'A11y'],
    repo: 'checkout-flow-prototype',
    status: 'Planned',
  },
]

export const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Vite',
  'Git',
  'REST APIs',
  'Responsive UI',
  'Accessibility',
]
