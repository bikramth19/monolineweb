'use client';
import {useEffect,useRef,useState} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {ClassicEditor,Essentials,Paragraph,Heading,Bold,Italic,Underline,Link,List,BlockQuote,Image,ImageUpload,ImageToolbar,ImageCaption,ImageStyle,ImageResize,Table,TableToolbar,Undo,Alignment,SourceEditing,FileRepository} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import {uploadMedia} from './MediaPicker';

type Props={value:string;onChange:(html:string)=>void};
export default function RichEditor({value,onChange}:Props){
  const editorRef=useRef<ClassicEditor|null>(null);
  const [error,setError]=useState('');
  useEffect(()=>{const insert=(event:Event)=>{const url=(event as CustomEvent<string>).detail;if(!url)return;if(!editorRef.current){setError('The editor is not ready. Please wait and select the image again.');return;}editorRef.current.execute('insertImage',{source:url});editorRef.current.editing.view.focus();setError('');};window.addEventListener('monoline-insert-image',insert);return()=>window.removeEventListener('monoline-insert-image',insert);},[]);
  return <div className="rich-editor-shell">{error&&<div className="admin-alert" role="alert">{error}</div>}<CKEditor editor={ClassicEditor} data={value||'<p></p>'} config={{
    licenseKey:process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY||'GPL',
    plugins:[Essentials,Paragraph,Heading,Bold,Italic,Underline,Link,List,BlockQuote,Image,ImageUpload,ImageToolbar,ImageCaption,ImageStyle,ImageResize,Table,TableToolbar,Undo,Alignment,SourceEditing],
    toolbar:['undo','redo','|','heading','|','bold','italic','underline','|','alignment','link','bulletedList','numberedList','blockQuote','|','insertTable','uploadImage','|','sourceEditing'],
    image:{toolbar:['imageTextAlternative','toggleImageCaption','imageStyle:inline','imageStyle:block','imageStyle:side','resizeImage']},
    table:{contentToolbar:['tableColumn','tableRow','mergeTableCells']},
    extraPlugins:[function uploadAdapter(editor){editor.plugins.get(FileRepository).createUploadAdapter=loader=>({upload:async()=>{const file=await loader.file;if(!file)throw Error('No file selected');const result=await uploadMedia(file);return {default:result.url};},abort:()=>{}});}]
  }} onReady={editor=>{editorRef.current=editor;setError('');}} onChange={(_event,editor)=>onChange(editor.getData())} onAfterDestroy={()=>{editorRef.current=null;}} onError={error=>{console.error('CKEditor failed:',error);setError('The editor could not start or stopped unexpectedly. Reload the page and try again.');}}/></div>;
}
