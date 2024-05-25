// src/pages/HomePage.tsx
import { useEffect, useState } from 'react'

export default function Admin() {
  document.title = 'Admin'
  const [partners, setPartners] = useState([])

  useEffect(() => {
    fetch('api/SecureLoginWebsite/admin', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setPartners(data.trustPartners)
        console.log('trustPartners: ', data.trustPartners)
      })
      .catch((error) => {
        console.log('Error home page: ', error)
      })
  })
  return (
    <div>
      <header>
        <h1>Admin page</h1>
      </header>
      <div>
        {partners ? (
          <div>
            <div>Our trusted partners are:</div>
            <ol>
              {partners.map((partners, i) => (
                <li key={i}>{partners}</li>
              ))}
            </ol>
          </div>
        ) : (
          <div>
            <div>Wating....</div>
          </div>
        )}
      </div>
    </div>
  )
}
