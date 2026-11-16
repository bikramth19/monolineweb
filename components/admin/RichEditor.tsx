'use client';
import {useEffect,useRef} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {ClassicEditor,Essentials,Paragraph,Heading,Bold,Italic,Underline,Link,List,BlockQuote,Image,ImageUpload,ImageToolbar,ImageCaption,ImageStyle,ImageResize,Table,TableToolbar,Undo,Alignment,SourceEditing} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import {uploadMedia} from './MediaPicker';

type Props={value:string;onChange:(html:string)=>void};
export default function RichEditor({value,onChange}:Props){
  const editorRef=useRef<any>(null);
  useEffect(()=>{const insert=(event:Event)=>{const url=(event as CustomEvent<string>).detail;if(url&&editorRef.current)editorRef.current.execute('insertImage',{source:url});};window.addEventListener('monoline-insert-image',insert);return()=>window.removeEventListener('monoline-insert-image',insert);},[]);
  return <div className="rich-editor-shell"><CKEditor editor={ClassicEditor} data={value||'<p></p>'} config={{
    licenseKey:process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY||'GPL',
    plugins:[Essentials,Paragraph,Heading,Bold,Italic,Underline,Link,List,BlockQuote,Image,ImageUpload,ImageToolbar,ImageCaption,ImageStyle,ImageResize,Table,TableToolbar,Undo,Alignment,SourceEditing],
    toolbar:['undo','redo','|','heading','|','bold','italic','underline','|','alignment','link','bulletedList','numberedList','blockQuote','|','insertTable','uploadImage','|','sourceEditing'],
    image:{toolbar:['imageTextAlternative','toggleImageCaption','imageStyle:inline','imageStyle:block','imageStyle:side','resizeImage']},
    table:{contentToolbar:['tableColumn','tableRow','mergeTableCells']},
    extraPlugins:[(editor:any)=>{editor.plugins.get('FileRepository').createUploadAdapter=(loader:any)=>({upload:async()=>{const file=await loader.file;if(!file)throw Error('No file selected');const result=await uploadMedia(file);return {default:result.url};},abort:()=>{}});}]
  }} onReady={(editor:any)=>{editorRef.current=editor;}} onChange={(_event:any,editor:any)=>onChange(editor.getData())} onAfterDestroy={()=>{editorRef.current=null;}}/></div>;
}
