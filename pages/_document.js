import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head >
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'/>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
                      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
                      crossOrigin="anonymous"/>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}