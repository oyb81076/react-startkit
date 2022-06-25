import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { login } from 'src/apis/loginApi';
import useInput from 'src/hooks/useInput';
import { asyncError, thenAlert } from 'src/modules/messages';

export default function Login(): React.ReactElement | null {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [username, onUsername] = useInput();
  const [password, onPassword] = useInput();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password })
      .then(thenAlert('登陆成功'))
      .then(() => navigate(search.get('url') || '/', { replace: true }))
      .catch(asyncError);
  };
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">
        <div>用户名:</div>
        <input id="username" value={username} onChange={onUsername} />
      </label>
      <label htmlFor="password">
        <div>用户名:</div>
        <input id="password" value={password} onChange={onPassword} type="password" />
      </label>
      <button type="submit">登陆</button>
    </form>
  );
}
