import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"
// import SpotifyWebApi from "spotify-web-api-node"
import spotifyApi from '../lib/spotify'

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//   clientSecret: process.env.NEXT_PUBLIC_CLIENT_SCRECT,
// })

function useSpotify () {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        signIn()
      }
      spotifyApi.setAccessToken(session.user.accessToken)

    }
  }, [session])
  return spotifyApi
}
export default useSpotify