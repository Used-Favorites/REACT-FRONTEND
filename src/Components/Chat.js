import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const Chat = () => {
    const [mensagem, setMensagem] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "mensagens"), (snapshot) => {
            const mensagens = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setChat(mensagens);
        });

        return () => unsubscribe();
    }, []);

    const enviarMensagem = async (e) => {
        e.preventDefault();
        if (mensagem.trim()) {
            await addDoc(collection(db, "mensagens"), {
                texto: mensagem,
                timestamp: new Date()
            });
            setMensagem('');
        }
    };

    return (
        <div>
            <div>
                {chat.map(msg => (
                    <div key={msg.id}>{msg.texto}</div>
                ))}
            </div>
            <form onSubmit={enviarMensagem}>
                <input 
                    type="text" 
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)} 
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Chat;