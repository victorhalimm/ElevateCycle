import ToggleButton from "@/components/toggle-button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import IChildren from "@/lib/types/children";
import Underline from "@tiptap/extension-underline";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createContext, useContext } from "react";
import { MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdFormatUnderlined } from "react-icons/md";
import { TbHeading } from "react-icons/tb";

type TiptapEditorContextType = {
    editor : Editor | null;
    toolBar : JSX.Element[] | JSX.Element;
}

export const TiptapEditorContext = createContext<TiptapEditorContextType>({editor: null, toolBar: <></>});

export default function TiptapEditorContextProvider({children} : IChildren) {

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                bulletList: {                
                   keepMarks: true,
                   keepAttributes: true
                }
            }),
            Underline
        ],
        content: '',
    })

    const toolBar = (
        <>
        <div className="flex items-center">
            <ToggleButton
                isToggled={editor?.isActive('bold') || false}
                onToggle={() => editor?.chain().focus().toggleBold().run()}
                icon={<MdFormatBold />}
            />
            <ToggleButton
                isToggled={editor?.isActive('italic') || false}
                onToggle={() => editor?.chain().focus().toggleItalic().run()}
                icon={<MdFormatItalic />}
            />
            <ToggleButton
                isToggled={editor?.isActive('underline') || false}
                onToggle={() => editor?.chain().focus().toggleUnderline().run()}
                icon={<MdFormatUnderlined />}
            />
            <div className="h-5 w-[1.5px] bg-pageCream mx-4 opacity-20"></div>
            
            <ToggleButton
                isToggled={editor?.isActive('heading') || false}
                onToggle={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                icon={<TbHeading />}
            />
            <ToggleButton
                isToggled={editor?.isActive('bulletList') || false}
                onToggle={() => editor?.chain().focus().toggleBulletList().run()}
                icon={<MdFormatListBulleted />}
            />
            <ToggleButton
                isToggled={editor?.isActive('orderedList') || false}
                onToggle={() => editor?.chain().focus().toggleOrderedList().run()}
                icon={<MdFormatListNumbered />}
            />
        </div>
        </>
    )

    return (
        <TiptapEditorContext.Provider value={{editor: editor, toolBar: toolBar}}>
            {children}
        </TiptapEditorContext.Provider>
    )
}

export const useTiptapEditor = () => useContext(TiptapEditorContext)