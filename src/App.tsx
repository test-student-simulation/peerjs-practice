import { useEffect, useState } from 'react'
import Peer from 'peerjs'
import { QRCodeSVG } from 'qrcode.react'

function Smartphone({ hostId }: { hostId: string }) {
  return <div>接続先PC：{hostId}</div>
}

function App() {
  const [peerId, setPeerId] = useState('')
  const smartphoneUrl = `${window.location.origin}${import.meta.env.BASE_URL}?host=${peerId}`
  useEffect(() => {
    const peer = new Peer()

    peer.on('open', (id) => {
      setPeerId(id)
    })

    return () => {
      peer.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-4 text-2xl font-bold">
        スマホ映像モニター
      </h1>

      <p>PCのPeer ID：<span className="mt-2 break-all rounded bg-white p-4">
        {peerId || '接続待機中...'}
      </span></p>
      {peerId && (
        <div className="flex flex-row items-center gap-4">
          <div className="mt-6 inline-block rounded bg-white p-4">
            <a
              href={smartphoneUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <QRCodeSVG
                value={smartphoneUrl}
                size={200}
              />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

function Main() {
  const hostId = new URLSearchParams(window.location.search).get('host')
  return hostId ? <Smartphone hostId={hostId} /> : <App />
}

export default Main
