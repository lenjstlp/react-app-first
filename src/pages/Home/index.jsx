import { useEffect } from 'react'
import http from '@/http'

function Home() {

    useEffect(() => {
        async function getLogout401() {
            const res = await http.get('/logout401')
            console.log(res, '===---');
        }
        // getLogout401()
    }, [])

    return (
        <div>Home</div>
    )
}

export default Home
