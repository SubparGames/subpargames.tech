import { Outlet, Link } from 'react-router-dom'
import Background from '../background'

export default function Root() {
  return (
    <>
      <Background />
      <header>
        <h1>SubparGames</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Copyright &copy; Noah Perry</p>
      </footer>
    </>
  )
}
