import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../lib/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { api } from '../lib/api'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      // Save display name
      if (name) {
        await updateProfile(cred.user, { displayName: name })
      }
      await api.registerUserProfile({ username: name || email.split('@')[0], photo_url: null })
      navigate('/chat')
    } catch (err) {
      alert(err.message || 'Gagal mendaftar')
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="w-full max-w-md rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-xl p-6">
        <h1 className="text-xl font-semibold tracking-tight mb-6">Daftar Huffadz</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nama</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm mb-1">Kata Sandi</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-blue-600 text-white py-3 hover:bg-blue-700 active:scale-[.99] transition">Daftar</button>
        </form>
        <div className="mt-4 text-sm text-slate-600">
          Sudah punya akun? <Link to="/login" className="text-blue-600 hover:underline">Masuk</Link>
        </div>
      </div>
    </div>
  )
}


