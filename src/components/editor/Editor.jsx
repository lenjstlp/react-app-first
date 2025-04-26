import { useEffect, useRef } from 'react'
import tinymce from 'tinymce'

function Editor({ value, onChange, id}) {
    const editorRef = useRef(null)
    const editorId = useRef(`editor-${Math.random().toString(36).substr(2, 9)}`)
    useEffect(() => {
        console.log(editorRef.current, editorRef.current.id, value, editorId, '---');
        tinymce.init({
            // selector: '#textarea',
            license_key: '',
            target: editorRef.current,
            plugins: "wordcount",
            toolbar: false,
            menubar: false,
            width: 317,
            height: 150,
            resize: false,
            statusbar: false,
            elementpath: false,
            branding: false,
            placeholder: '请输入文章内容',
            language: 'zh_CN',
            language_url: 'tinymceLangs/zh_CN.js',
            init_instance_callback : function(editor) {
                console.log("ID为: " + editor.id + " 的编辑器已初始化完成.", editor);
                editor.on('Change', (val) => {
                    onChange === null || onChange === void 0
                    ? void 0
                    : onChange(val.level.content)
                })
                editor.on('WordCountUpdate', function(editor) {
                    console.log('字数', editor.wordCount.words);
                })
                editor.on('RemoveEditor', (e) => {
                    console.log('Removed editor with id: ' + e.editor.id);
                  });editor.on('BeforeUnload', (e) => {
                    console.log('Removed editor with id: ' + e.editor.id);
                  });
            },
        })

        return () => {
            console.log(editorId.current, tinymce.remove, '-------');
            tinymce.remove(editorId.current);
        }
    }, [])
    
    // function getContent() {
    //     return tinymce.get("textarea").getContent()
    // }

    return (
        <div id={id}>
            <textarea ref={editorRef} id={editorId.current}></textarea>
        </div>
    )
}

export default Editor