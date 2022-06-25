import React from 'react';
import { createRoot } from 'react-dom/client';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

/**
 * @example
 *  update().then(thenAlert('保存成功'))
 */
export function thenAlert<T>(text: React.ReactNode): (v: T) => Promise<T> {
  return (v: T) => asyncAlert(text).then(() => v);
}

/**
 * @example
 * const cb = React.useCallback(async ()=> {
 *    await asyncAlert('some message');
 * }, [])
 * const c2 = React.useCallback(()=> {
 *    asyncAlert('some message')
 *      .then(()=> doSomething());
 * }, [])
 */
export async function asyncAlert(content: React.ReactNode): Promise<void> {
  return new Promise((r) => {
    const root = document.body.appendChild(document.createElement('div'));
    const $root = createRoot(root);
    const onResolve = () => {
      $root.unmount();
      root.remove();
      r();
    };
    $root.render(<Message title="通知" content={content} onResolve={onResolve} />);
  });
}
/**
 *
 * @example
 *   post()
 *      .then(thenAlert('OK'))
 *      .catch(asyncError);
 */
export async function asyncError(err: Error | string | unknown): Promise<void> {
  return new Promise((r) => {
    const root = document.body.appendChild(document.createElement('div'));
    const $root = createRoot(root);
    const onResolve = () => {
      $root.unmount();
      root.remove();
      r();
    };
    if (typeof err === 'string') {
      $root.render(<Message title="错误" content={err} onResolve={onResolve} />);
    } else if (err instanceof Error) {
      $root.render(<Message title="错误" content={err.message} onResolve={onResolve} />);
    } else {
      $root.render(<Message title="错误" content={JSON.stringify(err)} onResolve={onResolve} />);
    }
  });
}

/**
 * const cb = async ()=> {
 *    const ok = await asyncConfirm('是否确认要删除?');
 *    if (ok) then() else then()
 * }
 */
export function asyncConfirm(message: React.ReactNode): Promise<boolean> {
  return new Promise<boolean>((r) => {
    const root = document.body.appendChild(document.createElement('div'));
    const $root = createRoot(root);
    const onResolve = (ok: boolean) => {
      $root.unmount();
      root.remove();
      r(ok);
    };
    $root.render(<Message title="请求确认" confirm content={message} onResolve={onResolve} />);
  });
}

interface MessageProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  confirm?: boolean;
  onResolve: (confirm: boolean) => void;
}

function Message({ title, content, confirm, onResolve }: MessageProps): React.ReactElement | null {
  const [state, setState] = React.useState<'active' | 'done' | undefined>(undefined);
  React.useEffect(() => {
    setState('active');
  }, []);
  const onClose = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (state !== 'done') {
        setState('done');
        const value = e.currentTarget.value === 'yes';
        e.currentTarget.blur();
        setTimeout(() => onResolve(value), 500);
      }
    },
    [state, onResolve],
  );
  return (
    <>
      <MemoFreeze />
      <Modal className={state}>
        <Section>
          <Header>{title}</Header>
          <Main>{content}</Main>
          <Footer>
            {confirm && (
              <Button value="no" onClick={onClose} className="no">
                取消
              </Button>
            )}
            <Button value="yes" onClick={onClose} className="yes" autoFocus>
              确认
            </Button>
          </Footer>
        </Section>
      </Modal>
    </>
  );
}

const Button = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  text-decoration: none;
  border: 0;

  &.yes {
    color: white;
    background-color: #2a2a2a;
    border: 1px solid #2a2a2a;

    &:hover {
      background-color: #444;
    }
  }

  &.no {
    color: #696969;
    background-color: #fff;
    border: 1px solid #d8d8d8;

    &:hover {
      background-color: #f3f3f3;
    }
  }
`;
const Modal = styled.article`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 30%);
  opacity: 0;
  transition: all 0.5s;

  &.active {
    opacity: 1;
  }
`;
const Section = styled.section`
  width: 400px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 0 10px rgb(0 0 0 / 70%);
`;
const Header = styled.header`
  padding: 10px 15px;
  font-weight: bold;
  font-size: 1.1em;
  border-bottom: 1px solid #eee;
`;
const Main = styled.main`
  padding: 10px 15px 30px;
`;
const Footer = styled.footer`
  padding: 10px 15px;
  text-align: right;
  border-top: 1px solid #eee;
`;
function Freeze() {
  return (
    <Global
      styles={css`
        body {
          overflow: hidden;
        }
      `}
    />
  );
}
const MemoFreeze = React.memo(Freeze);
