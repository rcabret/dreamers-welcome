import Document, { DocumentContext, Head, Html, Main, NextScript} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }



    render() {
        return (
            <Html>
                <Head>
                    <script
                        defer
                        src="https://connect.podium.com/widget.js#ORG_TOKEN=645e6556-2a95-4ca0-b4a9-4ada9de5ddf7"
                        id="podium-widget"
                        data-organization-api-token="645e6556-2a95-4ca0-b4a9-4ada9de5ddf7"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
