"use client"
import { PersonInfo } from '@/components/personInfo/PersonInfo';


import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import GeoLocateButton from '@/components/geoLocateButton/GeoLocateButton';


const markdown = `A paragraph with *emphasis* and **strong importance**.
* # hello world
> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

const markdown_1 = `

A paragraph with *emphasis* and **strong importance**.
* # hello world
> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
Here is some JavaScript code:

~~~python
print("hello")
~~~
`
const ContactPage = () => {
    return (
        <div className='min-h-max'>
            {/* <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown> */}
            <GeoLocateButton />
            <Markdown
                children={markdown_1}
                remarkPlugins={[remarkGfm]}
                components={{
                    code(props) {
                        const { children, className, node, ...rest } = props
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                            <SyntaxHighlighter
                                {...rest}
                                PreTag="div"
                                children={String(children).replace(/\n$/, '')}
                                language={match[1]}
                            // style={dark}
                            />
                        ) : (
                            <code {...rest} className={className}>
                                {children}
                            </code>
                        )
                    }
                }}
            />
            <PersonInfo />
        </div>
    )
}
export default ContactPage;
