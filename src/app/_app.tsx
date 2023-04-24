import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import Store from './statemanagement/store'



export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={Store}>
      <Component {...pageProps} />
    </Provider>
  )
}