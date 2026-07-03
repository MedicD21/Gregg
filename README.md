# Dustin Schaaf Portfolio

A modern starter programmer portfolio for displaying school projects, personal builds, notes, skills, and contact information.

## Add A Project

Edit `src/projects.ts` and add a new object to the `projects` array:

```ts
{
  title: 'My New Project',
  description: 'What it does and what I learned.',
  stack: ['React', 'TypeScript'],
  repo: 'my-new-project',
  status: 'In progress',
}
```

The GitHub link is generated from `githubUsername` and the `repo` value.
