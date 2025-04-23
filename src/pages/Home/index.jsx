import { useEffect } from 'react'
import { log401 } from '@/apis/common'

function Home() {

    useEffect(() => {
        async function getLogout401() {
            const res = await log401('/logout401')
            console.log(res, '===---');
        }
        // getLogout401()
    }, [])

    return (
        <div>Home</div>
    )
}

export default Home
