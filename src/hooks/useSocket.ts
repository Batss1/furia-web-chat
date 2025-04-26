import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';


export default function useSocket(url: string) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(url);
        setSocket(newSocket);
        return () => { newSocket.disconnect(); };
    }, [url]);

    return socket;
} 