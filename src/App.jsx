import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, waitForCurrentUser, signOut } from './lib/firebase'

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const u = await waitForCurrentUser()
      setUser(u)
    })()
  }, [])

  async function handleLogout() {
    await signOut(auth)
    setUser(null)
    navigate('/')
  }
  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      </div>
      <header className="h-16 flex items-center justify-between px-4">
        <div className="font-semibold tracking-tight">Huffadz</div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/chat" className="inline-flex items-center rounded-full px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 shadow">Chat</Link>
              <button onClick={handleLogout} className="inline-flex items-center rounded-full px-4 py-2 text-sm border border-white/60 hover:bg-white shadow">Logout</button>
            </>
          ) : (
            <Link to="/login" className="inline-flex items-center rounded-full px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 shadow">
              Login
            </Link>
          )}
        </div>
      </header>
      <main className="px-4 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">Belajar dan Murajaah jadi lebih mudah</h1>
          <p className="mt-4 text-slate-600">Chatbot Huffadz membantu hafalan dan tanya jawab materi secara cepat dan modern.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/chat" className="inline-flex items-center rounded-full px-5 py-3 bg-blue-600 text-white hover:bg-blue-700 shadow">Mulai Chat</Link>
            <Link to="/register" className="inline-flex items-center rounded-full px-5 py-3 bg-white/80 backdrop-blur border border-white/60 hover:bg-white shadow">Daftar</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
