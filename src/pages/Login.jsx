import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, auth } from '../lib/firebase'
import { api } from '../lib/api'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const user = cred.user
      const username = (user.displayName || user.email?.split('@')[0] || 'User')
      const photo_url = user.photoURL || null
      await api.registerUserProfile({ username, photo_url })
      navigate('/chat')
    } catch (err) {
      alert(err.message || 'Gagal masuk')
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="w-full max-w-md rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-xl p-6">
        <h1 className="text-xl font-semibold tracking-tight mb-6">Masuk ke Huffadz</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm mb-1">Kata Sandi</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-blue-600 text-white py-3 hover:bg-blue-700 active:scale-[.99] transition">Masuk</button>
        </form>
        <div className="mt-4 text-sm text-slate-600">
          Belum punya akun? <Link to="/register" className="text-blue-600 hover:underline">Daftar</Link>
        </div>
      </div>
    </div>
  )
}


