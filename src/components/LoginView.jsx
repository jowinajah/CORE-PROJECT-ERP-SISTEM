import React, { useState } from 'react';
import { Lock, User, ArrowRight } from 'lucide-react';

export default function LoginView({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanInput = email.trim().toLowerCase();
    const cleanPass = String(password).trim();

    // 1. MASTER OVERRIDE UNTUK BOS JOW (DIJAMIN LANGSUNG MASUK)
    if ((cleanInput === 'fahmi@coreproject.com' || cleanInput === 'kang fahmi' || cleanInput === 'fahmi') && cleanPass === '123') {
      const ownerUser = {
        id: 'USR-01',
        name: 'Kang Fahmi',
        email: 'fahmi@coreproject.com',
        role: 'Owner / BOS JOW',
        division: 'Executive',
        status: 'Aktif'
      };
      onLogin(ownerUser);
      return;
    }

    // 2. CEK DATABASE KARYAWAN DARI LOCALSTORAGE
    const savedUsers = JSON.parse(localStorage.getItem('core
