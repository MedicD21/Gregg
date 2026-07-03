import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Github, Mail } from 'lucide-react'
import { githubUsername, projects, skills } from './projects'

type Repo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  updated_at: string
}

function repoUrl(repo: string) {
  return `https://github.com/${githubUsername}/${repo}`
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top">Dustin Schaaf</a>
      <nav aria-label="Primary navigation">
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#github">GitHub</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <p className="intro-line">Programmer in progress</p>
      <h1>Simple, useful web projects built with care.</h1>
      <p className="hero-copy">
        I am Dustin Schaaf. I am building a clean portfolio of school work,
        personal projects, and the programming skills I am learning along the way.
      </p>
      <div className="hero-actions">
        <a className="button primary" href="#projects">View projects</a>
        <a className="button" href={repoUrl('Gregg')} target="_blank" rel="noreferrer">
          <Github size={18} /> GitHub
        </a>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="section-heading">
        <p>Selected work</p>
        <h2>Projects</h2>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div>
              <div className="project-meta">
                <span>{project.status}</span>
                <span>{project.stack.join(' / ')}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <a href={repoUrl(project.repo)} target="_blank" rel="noreferrer">
              Repo <ArrowUpRight size={17} />
            </a>
          </article>
        ))}
      </div>
      <p className="helper-text">
        To add a project, add one object to the `projects` array in `src/projects.ts`.
        If the repo is public on GitHub, the link is generated automatically.
      </p>
    </section>
  )
}

function About() {
  return (
    <section className="section split" id="about">
      <div className="section-heading">
        <p>About</p>
        <h2>Learning by building.</h2>
      </div>
      <div className="about-copy">
        <p>
          I am focused on building a strong programming foundation: clean markup,
          readable components, practical state management, and projects that are
          easy to understand when I come back to them later.
        </p>
        <p>
          This portfolio is meant to grow with me. As I move through school and
          create more on my own, each project can be added here with its repo,
          stack, status, and short writeup.
        </p>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-heading">
        <p>Current toolkit</p>
        <h2>Skills I am practicing</h2>
      </div>
      <ul className="skill-list">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  )
}

function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('GitHub repos unavailable')
        }
        return response.json() as Promise<Repo[]>
      })
      .then((data) => {
        if (!ignore) {
          setRepos(data)
        }
      })
      .catch(() => {
        if (!ignore) {
          setError('GitHub repos could not be loaded right now.')
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  const visibleRepos = useMemo(
    () => repos.filter((repo) => !repo.name.startsWith('.')).slice(0, 6),
    [repos],
  )

  return (
    <section className="section" id="github">
      <div className="section-heading">
        <p>GitHub integration</p>
        <h2>Latest public repos</h2>
      </div>
      {error ? <p className="helper-text">{error}</p> : null}
      {!error && visibleRepos.length === 0 ? (
        <p className="helper-text">Loading GitHub repositories...</p>
      ) : null}
      <div className="repo-list">
        {visibleRepos.map((repo) => (
          <a className="repo-row" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}>
            <span>
              <strong>{repo.name}</strong>
              <small>{repo.description || 'Public GitHub repository'}</small>
            </span>
            <em>{repo.language || 'Repo'}</em>
            <ArrowUpRight size={17} />
          </a>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div>
        <p className="intro-line">Contact</p>
        <h2>Open to feedback, ideas, and opportunities.</h2>
      </div>
      <div className="contact-actions">
        <a className="button primary" href="mailto:hello@dustinschaaf.dev">
          <Mail size={18} /> Email me
        </a>
        <a className="button" href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">
          <Github size={18} /> GitHub profile
        </a>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#projects">Skip to projects</a>
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <GitHubRepos />
        <Contact />
      </main>
      <footer className="footer">
        <span>Dustin Schaaf</span>
        <span>GitHub: {githubUsername}</span>
      </footer>
    </>
  )
}
