import Quill, { Delta } from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import '../App.css';
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

const TextEditor = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [quill, setQuill] = useState<Quill | null>(null);
    const params = useParams();
     
    const documentId = params.id;


    useEffect(() => {
        const socket = io("http://localhost:7890");
        setSocket(socket);

        return () => {
            socket.disconnect();
        }
    }, []);

    // room logic for users
    useEffect(() => {
        if(!socket || !quill || !documentId) return;

        socket.once("load-document", (document: Delta) => {
            quill.setContents(document);
            quill.enable();
        })

        socket.emit('get-document', documentId);
    }, [socket, quill, documentId]);


    // sending the changed event
    useEffect(() => {
        if(!socket || !quill) return;

        const textChangeHandler = (delta: Delta, oldDelta: Delta, source: "user" | "api") => {
            console.log("delta", delta);
            console.log("oldDelta", oldDelta);

            if (source === 'user' && socket) {
                console.log("change from user");
                socket.emit('send-changes', delta);
            } else if(source === 'api') {
                console.log("change from api");
            }
        };

        quill.on('text-change', textChangeHandler);

        return () => {
            quill.off('text-change', textChangeHandler);
        }
    }, [socket, quill]);

    // receiving the changed event

    useEffect(() => {
        if(!socket || !quill) return;

        const handler = (delta: Delta) => {
            quill.updateContents(delta);
        }

        socket.on('receive-changes', handler);

        return () => {
            socket.off('receive-changes', handler);
        }
    }, [socket, quill]);
    
    const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
        if (!wrapper) return;

        console.log("wrapper", wrapper);

        wrapper.innerHTML = "";

        const editor = document.createElement('div');
        wrapper.append(editor);
        const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } });
        q.disable();
        q.setText("Loading..");
        setQuill(q);

    }, []);

    return <div className="container" ref={wrapperRef}></div>;
};

export default TextEditor;
