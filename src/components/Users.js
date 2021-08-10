import React, {useState} from 'react'
import axios from 'axios'


export default function Users() {
    const [localUsers, setLocalUsers] = useState([])
    
    

    return (
        <div>
            {localUsers.map()}
        </div>
    )
}
